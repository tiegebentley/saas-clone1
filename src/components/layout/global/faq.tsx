"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
    {
        question: "What makes your AI models different?",
        answer: "Our AI models are specifically trained on high-quality data and optimized for real-world applications. We focus on accuracy, speed, and reliability while maintaining ethical AI practices. Our models are regularly updated and improved based on user feedback and the latest research."
    },
    {
        question: "How does the pricing work?",
        answer: "We offer flexible pricing plans to suit different needs. Our Starter plan is perfect for individuals and small projects, while our Pro plan includes advanced features for teams and larger applications. All plans include access to our core AI models and basic support. You can upgrade, downgrade, or cancel your subscription at any time."
    },
    {
        question: "Can I integrate your API with my existing system?",
        answer: "Yes! We provide comprehensive API documentation and SDKs for popular programming languages. Our API is RESTful and follows industry best practices, making it easy to integrate with any system. We also offer dedicated support for enterprise customers who need custom integration solutions."
    },
    {
        question: "What kind of support do you offer?",
        answer: "We provide 24/7 technical support through multiple channels including email, chat, and our help center. Pro users get priority support and access to our dedicated support team. We also offer regular webinars, documentation updates, and a community forum where users can share knowledge and best practices."
    },
    {
        question: "Is my data secure?",
        answer: "Security is our top priority. We use industry-standard encryption for data in transit and at rest. Our systems are regularly audited and we comply with major security standards. We never share your data with third parties and you maintain full ownership of your data at all times."
    },
    {
        question: "How do I get started?",
        answer: "Getting started is easy! Sign up for a free trial, choose your plan, and you'll have immediate access to our platform. We provide step-by-step guides, video tutorials, and sample code to help you get up and running quickly. Our support team is always ready to help if you need assistance."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="relative z-20 py-8 lg:py-16 max-w-3xl mx-auto">
            <div className="px-4">
                <motion.h4
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-7xl leading-tight drop-shadow-lg px-4 text-center"
                >
                    Frequently Asked Questions
                </motion.h4>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-4 text-sm sm:text-base leading-7 max-w-2xl mx-auto px-4 text-center"
                >
                    Everything you need to know about our platform
                </motion.p>

                <div className="mt-12 space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm transition-all duration-300",
                                    openIndex === index && "border-zinc-300 dark:border-zinc-700/50"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <HelpCircle className="h-5 w-5 text-zinc-500" />
                                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                            {faq.question}
                                        </span>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown className="h-5 w-5 text-zinc-500" />
                                    </motion.div>
                                </div>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;