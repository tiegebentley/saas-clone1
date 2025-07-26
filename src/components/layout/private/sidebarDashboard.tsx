"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";
import {
    LayoutDashboard,
    Settings,
    BarChart3,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    Home
} from 'lucide-react';
import { ModeToggle } from '@/components/shared/mode-toggle';

const SidebarDashboard = () => {
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState !== null) {
            setCollapsed(JSON.parse(savedState));
        }
    }, []);

    const toggleSidebar = () => {
        const newState = !collapsed;
        setCollapsed(newState);
        localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
    };

    const navItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: BarChart3, label: 'Some AI Agent', href: '/dashboard/agent1' },
        { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
        { icon: Settings, label: 'User Settings', href: '/dashboard/settings' },
    ];

    return (
        <div
            className={`h-screen flex flex-col transition-all duration-300 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border-r border-neutral-200 dark:border-neutral-800 shadow-[4px_0_10px_rgba(0,0,0,0.1)] dark:shadow-[4px_0_10px_rgba(0,0,0,0.3)] ${collapsed ? 'w-16' : 'w-64'
                }`}
        >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
                {!collapsed && <h2 className="text-xl font-bold">Second Brain</h2>}
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 px-2 py-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center p-2 mb-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${collapsed ? 'justify-center' : ''
                            }`}
                    >
                        <item.icon size={20} className="text-neutral-600 dark:text-neutral-400" />
                        {!collapsed && (
                            <span className="ml-3 text-neutral-600 dark:text-neutral-400">
                                {item.label}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-neutral space-y-4">
                <div className={`flex items-center rounded-lg transition-all duration-200 group ${collapsed ? 'justify-center' : ''
                    }`}>
                    <div className="w-8 h-8 flex items-center justify-center">
                        <ModeToggle />
                    </div>
                    {!collapsed && (
                        <span className="ml-3 text-neutral-600 dark:text-neutral-400">
                            Change Theme
                        </span>
                    )}
                </div>
                <div className={`flex items-center rounded-lg transition-all duration-200 group ${collapsed ? 'justify-center' : ''
                    }`}>
                    <div className="w-8 h-8">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8"
                                }
                            }}
                        />
                    </div>
                    {!collapsed && (
                        <span className="ml-3 text-neutral-600 dark:text-neutral-400">
                            Profile Settings
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SidebarDashboard;
