import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil",
})

export async function POST() {
    try {
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                subscriptions: {
                    where: {
                        isActive: true,
                    },
                    select: {
                        stripeCustomerId: true,
                    },
                },
            },
        })

        if (!user?.subscriptions[0]?.stripeCustomerId) {
            return new NextResponse("No active subscription found", { status: 400 })
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: user.subscriptions[0].stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error("[BILLING_PORTAL]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
} 