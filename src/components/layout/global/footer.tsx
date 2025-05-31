"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: "https://github.com", label: "GitHub" },
        { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: Mail, href: "mailto:contact@example.com", label: "Email" }
    ];

    const footerLinks = [
        {
            title: "Product",
            links: [
                { name: "Features", href: "#" },
                { name: "Pricing", href: "#" },
                { name: "Documentation", href: "#" }
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About", href: "#" },
                { name: "Blog", href: "#" },
                { name: "Careers", href: "#" }
            ]
        }
    ];

    return (
        <footer className="relative z-20 border-t border-zinc-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Dorian AI</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                            Building the future of AI-powered applications.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                                    whileHover={{ scale: 1.1 }}
                                    className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors"
                                >
                                    <social.icon className="h-4 w-4" />
                                    <span className="sr-only">{social.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links Sections */}
                    {footerLinks.map((section, sectionIndex) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, delay: sectionIndex * 0.1, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100 uppercase tracking-wider">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <motion.li
                                        key={link.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.5, delay: (sectionIndex * 0.1) + (linkIndex * 0.05), ease: "easeOut" }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 text-sm transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            © {currentYear} DorianAI. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors">
                                Privacy
                            </Link>
                            <Link href="#" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors">
                                Terms
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;