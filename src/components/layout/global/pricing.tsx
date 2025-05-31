"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

const pricingPlans = {
    monthly: [
        {
            name: "Starter",
            price: 29,
            description: "For individuals",
            features: [
                "Up to 5 projects",
                "Basic analytics",
                "24/7 support",
                "1GB storage"
            ],
            cta: "Start Free Trial",
            popular: false
        },
        {
            name: "Pro",
            price: 99,
            description: "For teams",
            features: [
                "Unlimited projects",
                "Advanced analytics",
                "Priority support",
                "10GB storage",
                "Team collaboration"
            ],
            cta: "Get Started",
            popular: true
        }
    ],
    yearly: [
        {
            name: "Starter",
            price: 290,
            description: "For individuals",
            features: [
                "Up to 5 projects",
                "Basic analytics",
                "24/7 support",
                "1GB storage"
            ],
            cta: "Start Free Trial",
            popular: false
        },
        {
            name: "Pro",
            price: 990,
            description: "For teams",
            features: [
                "Unlimited projects",
                "Advanced analytics",
                "Priority support",
                "10GB storage",
                "Team collaboration"
            ],
            cta: "Get Started",
            popular: true
        }
    ]
};

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);
    const plans = isYearly ? pricingPlans.yearly : pricingPlans.monthly;
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const y = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);

    return (
        <motion.div
            style={{ opacity, y }}
            className="relative z-20 py-8 lg:py-16 max-w-3xl mx-auto"
        >
            <div className="px-4">
                <motion.h4
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-7xl leading-tight drop-shadow-lg px-4 text-center"
                >
                    Pricing
                </motion.h4>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-4 text-sm sm:text-base leading-7 max-w-2xl mx-auto px-4 text-center"
                >
                    Choose the perfect plan for your needs
                </motion.p>

                {/* Toggle Switch */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center justify-center mt-6 space-x-4"
                >
                    <span className={cn(
                        "text-sm transition-colors duration-300",
                        !isYearly ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"
                    )}>Monthly</span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className="relative inline-flex h-7 w-14 items-center rounded-full bg-zinc-800/50 backdrop-blur-sm transition-colors duration-300 hover:bg-zinc-800"
                    >
                        <motion.span
                            className="absolute left-1 h-5 w-5 rounded-full bg-zinc-100 shadow-lg"
                            animate={{
                                x: isYearly ? 28 : 0,
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
                        "text-sm transition-colors duration-300",
                        isYearly ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"
                    )}>Yearly</span>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-2xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            className={cn(
                                "relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-5 flex flex-col",
                                plan.popular && "border-zinc-300 dark:border-zinc-700/50"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="px-2 py-0.5 text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100/50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-full">
                                        Popular
                                    </span>
                                </div>
                            )}
                            <div className="space-y-3 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{plan.name}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm">{plan.description}</p>
                                <div className="flex items-baseline h-[40px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isYearly ? 'yearly' : 'monthly'}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex items-baseline"
                                        >
                                            <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">${plan.price}</span>
                                            <span className="text-zinc-600 dark:text-zinc-400 ml-1 text-sm">/{isYearly ? 'year' : 'month'}</span>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <ul className="space-y-2 mt-auto">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-zinc-600 dark:text-zinc-300">
                                            <Check className="h-4 w-4 text-zinc-500 mr-2" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Button
                                variant={plan.popular ? "default" : "outline"}
                                size="lg"
                                className="w-full rounded-full mt-6"
                            >
                                {plan.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Pricing;