import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req)

        // Handle different webhook events
        switch (evt.type) {
            case 'user.created':
            case 'user.updated':
                const { id, email_addresses, first_name, last_name, image_url } = evt.data
                const primaryEmail = email_addresses?.[0]?.email_address

                if (!primaryEmail) {
                    throw new Error('No primary email found')
                }

                await prisma.user.upsert({
                    where: { id },
                    create: {
                        id,
                        email: primaryEmail,
                        firstName: first_name,
                        lastName: last_name,
                        imageUrl: image_url,
                        credits: 0,
                    },
                    update: {
                        email: primaryEmail,
                        firstName: first_name,
                        lastName: last_name,
                        imageUrl: image_url,
                    },
                })
                break

            case 'user.deleted':
                const userId = evt.data.id
                await prisma.user.delete({
                    where: { id: userId },
                })
                break
        }

        return new Response('Webhook processed successfully', { status: 200 })
    } catch (err) {
        console.error('Error processing webhook:', err)
        return new Response('Error processing webhook', { status: 400 })
    }
}