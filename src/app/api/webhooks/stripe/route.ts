import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { PlanType, BillingInterval } from "@/generated/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

type PlanMapping = {
    [key: string]: {
        planType: PlanType;
        interval: BillingInterval;
    }
}

const PLAN_MAPPING: PlanMapping = {
    price_1RUwbHGwUnBOuV2zz2vsmQle: { planType: 'STARTER', interval: 'MONTH' },
    price_1RUwc6GwUnBOuV2z3q4YEHeT: { planType: 'STARTER', interval: 'YEAR' },
    price_1RUwc6GwUnBOuV2zPxlrt8mH: { planType: 'PRO', interval: 'MONTH' },
    price_1RUwc6GwUnBOuV2zOd9tXPnw: { planType: 'PRO', interval: 'YEAR' },
};

export async function POST(req: Request) {
    try {
        console.log("🔔 Webhook received")
        const body = await req.text()
        const headersList = await headers()
        const signature = headersList.get("stripe-signature")!

        let event: Stripe.Event

        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
            console.log("✅ Webhook signature verified")
        } catch (err) {
            console.error("❌ Webhook signature verification failed:", err)
            return new NextResponse("Webhook signature verification failed", { status: 400 })
        }

        // Handle checkout.session.completed event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const stripeCustomerId = session.customer as string;

            // Get subscription details if available
            let priceId: string | undefined;
            if (session.subscription) {
                const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
                priceId = subscription.items.data[0].price.id;
            }

            if (!priceId) {
                console.error("❌ No price ID found in session or subscription");
                return new NextResponse("No price ID found", { status: 400 });
            }

            // Get the user ID from the session metadata
            const userId = session.metadata?.userId;
            if (!userId) {
                console.error("❌ No user ID found in session metadata");
                return new NextResponse("No user ID found", { status: 400 });
            }

            // Map the price ID to plan details
            const planDetails = PLAN_MAPPING[priceId];
            if (!planDetails) {
                console.error("❌ Unknown price ID:", priceId);
                return new NextResponse("Unknown price ID", { status: 400 });
            }

            try {
                await prisma.subscription.create({
                    data: {
                        userId,
                        stripeCustomerId,
                        priceId,
                        planType: planDetails.planType,
                        interval: planDetails.interval,
                        isActive: true
                    }
                });
                console.log("✅ Subscription created successfully");
            } catch (error) {
                console.error("❌ Error creating subscription:", error);
                throw error;
            }
        }

        // Handle invoice.paid event
        if (event.type === "invoice.paid") {
            const invoice = event.data.object as Stripe.Invoice & { subscription: string };
            const stripeCustomerId = invoice.customer as string;
            const subscriptionId = invoice.subscription;

            if (subscriptionId) {
                await prisma.subscription.updateMany({
                    where: {
                        stripeCustomerId,
                        isActive: true
                    },
                    data: {
                        isActive: true
                    }
                });
                console.log("✅ Invoice paid, subscription updated");
            }
        }

        // Handle invoice.payment_succeeded event
        if (event.type === "invoice.payment_succeeded") {
            console.log("✅ Payment succeeded");
        }

        // Handle invoice.finalized event
        if (event.type === "invoice.finalized") {
            console.log("✅ Invoice finalized");
        }

        // Handle invoice.payment_failed event
        if (event.type === "invoice.payment_failed") {
            const invoice = event.data.object as Stripe.Invoice & { subscription: string };
            const stripeCustomerId = invoice.customer as string;
            const subscriptionId = invoice.subscription;

            if (subscriptionId) {
                await prisma.subscription.updateMany({
                    where: {
                        stripeCustomerId,
                        isActive: true
                    },
                    data: {
                        isActive: false
                    }
                });
                console.log("❌ Payment failed, subscription deactivated");
            }
        }

        // Handle customer.subscription.updated event
        if (event.type === "customer.subscription.updated") {
            const subscription = event.data.object as Stripe.Subscription;
            const stripeCustomerId = subscription.customer as string;
            const priceId = subscription.items.data[0].price.id;

            const planDetails = PLAN_MAPPING[priceId];
            if (planDetails) {
                await prisma.subscription.updateMany({
                    where: {
                        stripeCustomerId,
                        isActive: true
                    },
                    data: {
                        planType: planDetails.planType,
                        interval: planDetails.interval,
                        priceId
                    }
                });
                console.log("✅ Subscription updated successfully");
            }
        }

        // Handle customer.subscription.deleted event
        if (event.type === "customer.subscription.deleted") {
            const subscription = event.data.object as Stripe.Subscription;
            const stripeCustomerId = subscription.customer as string;

            await prisma.subscription.updateMany({
                where: {
                    stripeCustomerId,
                    isActive: true
                },
                data: {
                    isActive: false
                }
            });
            console.log("✅ Subscription cancelled successfully");
        }

        return new NextResponse(null, { status: 200 })
    } catch (error) {
        console.error("❌ Webhook error:", error)
        return new NextResponse("Webhook error", { status: 400 })
    }
}