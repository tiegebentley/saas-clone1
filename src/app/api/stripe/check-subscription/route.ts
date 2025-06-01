import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // Get the most recent active subscription
        const subscription = await prisma.subscription.findFirst({
            where: {
                userId,
                isActive: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (subscription) {
            // Ensure consistent casing for plan type and interval
            const formattedSubscription = {
                ...subscription,
                planType: subscription.planType?.toUpperCase() || 'STARTER',
                interval: subscription.interval?.toUpperCase() || 'MONTH'
            };

            return NextResponse.json({
                hasActiveSubscription: true,
                subscription: formattedSubscription
            });
        }

        return NextResponse.json({
            hasActiveSubscription: false,
            subscription: null
        });
    } catch (error) {
        console.error("Error checking subscription:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
} 