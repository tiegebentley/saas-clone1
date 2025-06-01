"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

// Basic pricing configuration
const PLANS = {
    STARTER: {
        name: "Starter",
        monthly: {
            price: 29,
            priceId: "price_1RUwbHGwUnBOuV2zz2vsmQle"
        },
        yearly: {
            price: 290,
            priceId: "price_1RUwc6GwUnBOuV2zPxlrt8mH"
        },
        features: [
            "Up to 5 projects",
            "Basic analytics",
            "24/7 support",
            "1GB storage"
        ]
    },
    PRO: {
        name: "Pro",
        monthly: {
            price: 99,
            priceId: "price_1RUwc6GwUnBOuV2z3q4YEHeT"
        },
        yearly: {
            price: 990,
            priceId: "price_1RUwc6GwUnBOuV2zOd9tXPnw"
        },
        features: [
            "Unlimited projects",
            "Advanced analytics",
            "Priority support",
            "10GB storage",
            "Team collaboration"
        ]
    }
} as const;

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [activePlan, setActivePlan] = useState<{
        planType: string;
        interval: string;
    } | null>(null);

    // Check for active subscription
    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const response = await fetch('/api/stripe/check-subscription');
                const data = await response.json();

                if (data.subscription) {
                    const planType = data.subscription.planType?.toUpperCase();
                    const interval = data.subscription.interval?.toUpperCase();

                    setActivePlan({
                        planType,
                        interval
                    });
                } else {
                    setActivePlan(null);
                }
            } catch (error) {
                console.error('Error checking subscription:', error);
                setActivePlan(null);
            }
        };
        checkSubscription();
    }, []);

    // Basic checkout handler
    const handleCheckout = async (priceId: string) => {
        // If user has an active subscription, redirect to dashboard
        if (activePlan) {
            window.location.href = '/dashboard';
            return;
        }

        try {
            setIsLoading(priceId);
            const response = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId }),
            });

            const data = await response.json();

            if (response.status === 401 && data.redirect) {
                window.location.href = data.redirect;
                return;
            }

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <div className="relative z-20 py-12 lg:py-24">
            <div className="max-w-4xl mx-auto px-6">
                <motion.h4
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl leading-tight drop-shadow-lg px-6 text-center"
                >
                    Pricing
                </motion.h4>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-4 text-sm sm:text-base leading-7 max-w-2xl mx-auto px-6 text-center"
                >
                    Choose the plan that's right for you
                </motion.p>

                {/* Billing Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center justify-center space-x-4 mt-9"
                >
                    <span className={cn(
                        "text-sm font-medium transition-colors duration-300",
                        !isYearly ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
                    )}>Monthly</span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className="relative inline-flex h-9 w-18 items-center rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                    >
                        <motion.span
                            className="absolute left-1.5 h-6 w-6 rounded-full bg-white shadow-lg"
                            animate={{
                                x: isYearly ? 36 : 0,
                                boxShadow: isYearly ? "0 0 20px rgba(244,244,245,0.3)" : "0 0 0px rgba(244,244,245,0)"
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 25,
                                mass: 1.2,
                                boxShadow: { duration: 0.2 }
                            }}
                        />
                    </button>
                    <span className={cn(
                        "text-sm font-medium transition-colors duration-300",
                        isYearly ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
                    )}>Yearly</span>
                </motion.div>

                {/* Pricing Cards */}
                <div className="mt-12 grid grid-cols-1 gap-9 sm:grid-cols-2">
                    {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((plan, index) => {
                        const planData = PLANS[plan];
                        const price = isYearly ? planData.yearly.price : planData.monthly.price;
                        const priceId = isYearly ? planData.yearly.priceId : planData.monthly.priceId;
                        const currentInterval = isYearly ? 'YEAR' : 'MONTH';
                        const isActivePlan = activePlan?.planType === plan &&
                            activePlan?.interval === currentInterval;

                        return (
                            <motion.div
                                key={plan}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                className={cn(
                                    "relative flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-6",
                                    (plan === 'PRO' && !activePlan) && "border-primary dark:border-primary",
                                    isActivePlan && "border-primary dark:border-primary"
                                )}
                            >
                                {plan === 'PRO' && !activePlan && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white dark:text-black">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                {isActivePlan && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white dark:text-black">
                                            Active Plan
                                        </span>
                                    </div>
                                )}
                                <div className="flex flex-col flex-grow">
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{planData.name}</h3>
                                    <div className="mt-6 flex items-baseline">
                                        <span className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">${price}</span>
                                        <span className="ml-1.5 text-sm text-zinc-500 dark:text-zinc-400">/month</span>
                                    </div>
                                    <ul className="space-y-3 mt-6">
                                        {planData.features.map((feature, i) => (
                                            <li key={i} className="flex items-center text-zinc-600 dark:text-zinc-300">
                                                <Check className="h-4 w-4 text-zinc-500 dark:text-zinc-400 mr-3 flex-shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button
                                    variant={plan === 'PRO' ? "default" : "outline"}
                                    size="sm"
                                    className="w-full rounded-full mt-6 text-sm h-12"
                                    onClick={() => handleCheckout(priceId)}
                                    disabled={isLoading === priceId}
                                >
                                    {isLoading === priceId
                                        ? "Loading..."
                                        : activePlan
                                            ? "You Have an Active Plan"
                                            : "Get Started"}
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Pricing;