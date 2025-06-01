import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth, currentUser } from '@clerk/nextjs/server';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-05-28.basil',
});

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();
        // console.log('User ID:', userId);
        // console.log('Current User:', user);
        // console.log('Customer Email:', user?.emailAddresses[0]?.emailAddress);

        if (!userId) {
            const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
            return NextResponse.json(
                { redirect: `/sign-in?redirect_url=${encodeURIComponent(`${baseUrl}/#pricing`)}` },
                { status: 401 }
            );
        }

        const body = await req.json();
        // console.log('Request body:', body);

        const { priceId } = body;

        if (!priceId) {
            console.error('No priceId provided');
            return NextResponse.json(
                { error: 'Price ID is required' },
                { status: 400 }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        try {
            const session = await stripe.checkout.sessions.create({
                mode: 'subscription',
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                customer_email: user?.emailAddresses[0]?.emailAddress || undefined,
                client_reference_id: userId,
                metadata: {
                    userId: userId
                },
                success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${baseUrl}/#pricing`,
            });

            if (!session.url) {
                throw new Error('No checkout URL returned from Stripe');
            }

            return NextResponse.json({ url: session.url });
        } catch (stripeError) {
            console.error('Stripe API error:', stripeError);
            return NextResponse.json(
                { error: 'Stripe API error', details: stripeError instanceof Error ? stripeError.message : 'Unknown Stripe error' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json(
            { error: 'Error creating checkout session', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}