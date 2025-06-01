'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NavigationMenuDemo } from '@/components/layout/global/navigation-menu'
import { ModeToggle } from '@/components/shared/mode-toggle';
import { useScrollDirection } from '@/hooks/useScrollDirection';

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const scrollDirection = useScrollDirection();

    return (
        <motion.section
            className='py-4 px-4 lg:py-4 fixed w-full top-0 z-[150]'
            initial={{ y: 0 }}
            animate={{
                y: scrollDirection === 'down' ? -100 : 0,
                transition: { duration: 0.3 }
            }}
        >
            <div className='container mx-auto lg:max-w-7xl'>
                <div className='border border-border/80 rounded-[27px] md:rounded-full bg-background/70 backdrop-blur'>
                    <div className='grid grid-cols-2 lg:grid-cols-3 sm:px-4 p-2 md:px-2 items-center '>
                        <div className='flex'>
                            <div className='md:pl-2'>
                                <Link href='/'>
                                    <Image
                                        src='/logo.png'
                                        alt='logo'
                                        width={24}
                                        height={24}
                                        className='h-9 w-auto rounded-full'
                                    />
                                </Link>
                            </div>
                            <div className='hidden md:block mx-1 text-2xl font-bold'>
                                <Link href='/'>
                                    <p>Dorian AI</p>
                                </Link>
                            </div>
                        </div>
                        <div className='hidden lg:flex justify-center items-center'>
                            <nav className='flex text-muted-foreground'>
                                <NavigationMenuDemo />
                            </nav>
                        </div>
                        <div className='flex justify-end'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='feather feather-menu md:hidden'
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <line
                                    x1='3'
                                    y1='6'
                                    x2='21'
                                    y2='6'
                                    className={twMerge(
                                        'origin-left transition',
                                        isOpen && 'rotate-45 -translate-y-1',
                                    )}
                                ></line>
                                <line
                                    x1='3'
                                    y1='12'
                                    x2='21'
                                    y2='12'
                                    className={twMerge('transition', isOpen && 'opacity-0')}
                                ></line>
                                <line
                                    x1='3'
                                    y1='18'
                                    x2='21'
                                    y2='18'
                                    className={twMerge(
                                        'origin-left transition',
                                        isOpen && '-rotate-45 translate-y-1',
                                    )}
                                ></line>
                            </svg>
                            <div className='flex items-center gap-2 justify-center'>
                                <SignedOut>
                                    <Button variant='secondary' className='hidden md:block rounded-full' asChild>
                                        <SignInButton />
                                    </Button>

                                    <Button variant='default' className='hidden md:block rounded-full' asChild>
                                        <SignUpButton />
                                    </Button>
                                </SignedOut>
                                <SignedIn>
                                    <Button className='rounded-full' asChild>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </Button>
                                    <UserButton />
                                </SignedIn>
                                <div className='hidden lg:flex'>
                                    <ModeToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className='overflow-hidden'
                            >
                                <div className='flex flex-col items-center gap-2 py-4 overflow-hidden'>
                                    <div className='flex flex-col items-center gap-4 w-full px-4'>
                                        <Button variant='secondary' className='w-full rounded-full' asChild>
                                            <SignInButton />
                                        </Button>
                                        <Button variant='default' className='w-full rounded-full' asChild>
                                            <SignUpButton />
                                        </Button>
                                        <div className='w-full flex justify-center'>
                                            <ModeToggle />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.section>
    );
}
