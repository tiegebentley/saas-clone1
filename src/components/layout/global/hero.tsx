"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const Hero = () => {
    return (
        <section className="relative w-full text-center">
            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-7xl leading-tight drop-shadow-lg px-4"
                >
                    <span className="block">Dorian AI Community</span>
                    <span className="block mt-2">Make Money With AI</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mt-4 text-sm sm:text-base leading-7 text-gray-200 max-w-2xl mx-auto px-4"
                >
                    Join the Dorian AI Community and stay at the cutting-edge of technology. Building cool things with state-of-the-art tools.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mt-6 flex items-center justify-center gap-x-4"
                >
                    <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform transition-transform">
                        Start Building
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full border-gray-700  transform transition-transform">
                        Learn More
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero