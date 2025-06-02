// import { currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";

// export type SubscriptionStatus = {
//     isActive: boolean;
//     plan?: string;
//     expiresAt?: Date;
// };

// export async function getUserSubscription(userId: string): Promise<SubscriptionStatus> {
//     // Get the most recent active subscription from the database
//     const subscription = await prisma.subscription.findFirst({
//         where: {
//             userId,
//             isActive: true
//         },
//         orderBy: {
//             createdAt: 'desc'
//         }
//     });

//     if (!subscription) {
//         return {
//             isActive: false
//         };
//     }

//     return {
//         isActive: true,
//         plan: subscription.planType,
//         expiresAt: subscription.updatedAt // Using updatedAt as a proxy for expiration
//     };
// }

// export async function requireSubscription() {
//     const user = await currentUser();

//     if (!user) {
//         redirect("/sign-in");
//     }

//     const subscription = await getUserSubscription(user.id);

//     if (!subscription.isActive) {
//         redirect("/#pricing");
//     }

//     return subscription;
// }
