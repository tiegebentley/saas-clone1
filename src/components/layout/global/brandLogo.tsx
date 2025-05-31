'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Fragment, useRef } from 'react';


const logos = [
    { name: 'Slack', image: '/slack.svg', width: 140, height: 45 },
    { name: 'Microsoft', image: '/microsoft.svg', width: 140, height: 45 },
    { name: 'Canva', image: '/canva.svg', width: 140, height: 45 },
    { name: 'Github', image: '/github.svg', width: 140, height: 45 },
    { name: 'Linear', image: '/linear.svg', width: 140, height: 45 },
    { name: 'Mailchimp', image: '/mailchimp.svg', width: 140, height: 45 },
    { name: 'Grammarly', image: '/grammarly.svg', width: 140, height: 45 },
    { name: 'Notion', image: '/notion.svg', width: 140, height: 45 },
    { name: 'Gitlab', image: '/gitlab.svg', width: 140, height: 45 },
    { name: 'Google', image: '/google.svg', width: 140, height: 45 },
    { name: 'Spotify', image: '/spotify.svg', width: 140, height: 45 },
    { name: 'Asana', image: '/asana.svg', width: 140, height: 45 },
];

export default function BrandLogo() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

    return (
        <motion.section
            ref={ref}
            style={{ opacity, y }}
            className="w-full"
        >
            <div
                className='container mx-auto py-12 lg:py-24 overflow-x-clip'
                id='features'
            >
                <motion.h3
                    className='text-center text-gray-400 text-xl mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Trusted by businesses across the world
                </motion.h3>
                <div className='flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
                    <motion.div
                        animate={{
                            x: '-50%',
                        }}
                        transition={{
                            duration: 50,
                            ease: 'linear',
                            repeat: Infinity,
                        }}
                        className='flex flex-none gap-12 md:gap-24'
                    >
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Fragment key={i}>
                                {logos.map((logo) => (
                                    <Image
                                        src={logo.image}
                                        key={logo.name}
                                        alt={logo.name}
                                        width={logo.width}
                                        height={logo.height}
                                        className="w-[100px] h-[32px] md:w-[120px] md:h-[38px] lg:w-[140px] lg:h-[45px] transition-opacity hover:opacity-80"
                                    />
                                ))}
                            </Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
