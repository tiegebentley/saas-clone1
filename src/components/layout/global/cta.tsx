"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

const CTA = () => {
    return (
        <div className="relative z-20 py-8 lg:py-16">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800"
                >
                    {/* Gradient grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute inset-0 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm" />

                    {/* Content */}
                    <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16">
                        <div className="text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="inline-flex items-center space-x-2 px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800/50 backdrop-blur-sm mb-6 rounded-full"
                            >
                                <Sparkles className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Ready to get started?</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4"
                            >
                                Start building with AI today
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto"
                            >
                                Join thousands of developers and businesses already using our platform to build the next generation of AI-powered applications.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            >
                                <Button
                                    size="lg"
                                    className="rounded-full"
                                >
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full"
                                >
                                    Contact Sales
                                </Button>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="mt-6 text-sm text-zinc-500 dark:text-zinc-400"
                            >
                                No credit card required • 14-day free trial • Cancel anytime
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CTA;