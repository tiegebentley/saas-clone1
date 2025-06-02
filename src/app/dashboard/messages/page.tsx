"use client";

import React from 'react';
import { Search, Send } from 'lucide-react';

const mockMessages = [
    {
        id: 1,
        sender: 'Dorian AI',
        message: 'Hello! How can I assist you today?',
        timestamp: '10:30 AM',
        isAI: true
    },
    {
        id: 2,
        sender: 'You',
        message: 'I need help with my project',
        timestamp: '10:31 AM',
        isAI: false
    },
    {
        id: 3,
        sender: 'Dorian AI',
        message: 'Of course! I\'d be happy to help. Could you provide more details about your project?',
        timestamp: '10:31 AM',
        isAI: true
    }
];

const MessagesPage = () => {
    return (
        <div className="h-full flex flex-col max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Messages</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search messages..."
                        className="pl-10 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {mockMessages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'}`}
                    >
                        <div
                            className={`max-w-[70%] rounded-lg p-4 ${msg.isAI
                                ? 'bg-neutral-100 dark:bg-neutral-800'
                                : 'bg-blue-500 text-white'
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">{msg.sender}</span>
                                <span className="text-xs opacity-70">{msg.timestamp}</span>
                            </div>
                            <p>{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default MessagesPage;