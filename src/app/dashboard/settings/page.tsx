"use client";

import React from 'react';
import { useUser } from "@clerk/nextjs";
import { CreditCard, User, Bell, Shield } from 'lucide-react';

interface SettingItem {
    label: string;
    value: string | undefined;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const SettingsPage = () => {
    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    const handleManageSubscription = () => {
        if (userEmail) {
            const billingUrl = `https://billing.stripe.com/p/login/test_14AbJ14Wn0U92ea60le3e00?prefilled_email=${encodeURIComponent(userEmail)}`;
            window.open(billingUrl, '_blank');
        }
    };

    const settingsSections = [
        {
            title: "Account",
            icon: User,
            items: [
                { label: "Email", value: userEmail },
                { label: "Account Type", value: "Premium" }
            ] as SettingItem[]
        },
        {
            title: "Subscription",
            icon: CreditCard,
            items: [
                {
                    label: "Current Plan",
                    value: "Premium Plan",
                    action: {
                        label: "Manage Subscription",
                        onClick: handleManageSubscription
                    }
                },
                { label: "Billing Cycle", value: "Monthly" }
            ] as SettingItem[]
        },
        {
            title: "Notifications",
            icon: Bell,
            items: [
                { label: "Email Notifications", value: "Enabled" },
                { label: "Push Notifications", value: "Enabled" }
            ] as SettingItem[]
        },
        {
            title: "Security",
            icon: Shield,
            items: [
                { label: "Two-Factor Authentication", value: "Enabled" },
                { label: "Last Login", value: "2 hours ago" }
            ] as SettingItem[]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-8">Settings</h1>

            <div className="space-y-6">
                {settingsSections.map((section) => (
                    <div key={section.title} className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800">
                        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                            <div className="flex items-center gap-2">
                                <section.icon className="h-5 w-5 text-blue-500" />
                                <h2 className="text-lg font-semibold">{section.title}</h2>
                            </div>
                        </div>
                        <div className="p-4">
                            {section.items.map((item) => (
                                <div key={item.label} className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-800 last:border-0">
                                    <div>
                                        <p className="font-medium">{item.label}</p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.value}</p>
                                    </div>
                                    {item.action && (
                                        <button
                                            onClick={item.action.onClick}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                                        >
                                            {item.action.label}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SettingsPage;