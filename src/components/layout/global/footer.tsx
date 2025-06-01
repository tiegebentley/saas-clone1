"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
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
                { name: "Documentation", href: "#" },
                { name: "Changelog", href: "#" }
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About", href: "#" },
                { name: "Blog", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Contact", href: "#" }
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Community", href: "#" },
                { name: "Support", href: "#" },
                { name: "API", href: "#" },
                { name: "Status", href: "#" }
            ]
        }
    ];

    return (
        <footer className="relative z-20 border-t border-zinc-100 dark:border-zinc-800">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white/50 dark:from-zinc-900 dark:via-zinc-900/80 dark:to-zinc-900/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent dark:from-zinc-900/50" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <div className="flex items-center space-x-2">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
                                Dorian AI
                            </h2>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                            Building the future of AI-powered applications with cutting-edge technology and innovative solutions.
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
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="p-2.5 rounded-full bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-800/50 transition-all duration-300"
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
                            className="space-y-6"
                        >
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
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
                                            className="group flex items-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 text-sm transition-colors"
                                        >
                                            <span className="relative">
                                                {link.name}
                                                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-zinc-900 dark:bg-zinc-100 group-hover:w-full transition-all duration-300" />
                                            </span>
                                            <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
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
                    className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            © {currentYear} Dorian AI. All rights reserved.
                        </p>
                        <div className="flex space-x-8">
                            <Link
                                href="#"
                                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative group"
                            >
                                <span className="relative">
                                    Privacy Policy
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-zinc-900 dark:bg-zinc-100 group-hover:w-full transition-all duration-300" />
                                </span>
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative group"
                            >
                                <span className="relative">
                                    Terms of Service
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-zinc-900 dark:bg-zinc-100 group-hover:w-full transition-all duration-300" />
                                </span>
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative group"
                            >
                                <span className="relative">
                                    Cookie Policy
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-zinc-900 dark:bg-zinc-100 group-hover:w-full transition-all duration-300" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;