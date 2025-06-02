import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export type SubscriptionStatus = {
    isActive: boolean;
    plan?: string;
    expiresAt?: Date;
};

export async function getUserSubscription(userId: string): Promise<SubscriptionStatus> {
    // TODO: Replace with your real subscription check (e.g., query your DB or Stripe)
    // This is a mock implementation that simulates checking a specific user's subscription
    console.log(`Checking subscription for user: ${userId}`);
    return {
        isActive: true,
        plan: "pro",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    };
}

export async function requireSubscription() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    const subscription = await getUserSubscription(user.id);

    if (!subscription.isActive) {
        redirect("/pricing");
    }

    return subscription;
}
