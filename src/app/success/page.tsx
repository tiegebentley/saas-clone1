'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function SuccessPageContent() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (!sessionId) {
            router.push('/#pricing');
            return;
        }

        const verifySession = async () => {
            try {
                const response = await fetch(`/api/stripe/verify-session?session_id=${sessionId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to verify session');
                }

                setStatus('success');
            } catch (error) {
                console.error('Error verifying session:', error);
                setStatus('error');
            }
        };

        verifySession();
    }, [sessionId, router]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
                    <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Verifying your payment...</h1>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        There was an error processing your payment. Please try again.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Link href="/#pricing">
                            Return to Pricing
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 bg-cover bg-center p-4 relative" style={{ backgroundImage: 'url("/bg.jpg")' }}>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>

            {/* Content Container with Overlay */}
            <div className="max-w-2xl w-full mx-auto px-8 py-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl text-center border border-gray-200 dark:border-gray-700 relative z-10">

                <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-8 drop-shadow-md" />

                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white drop-shadow-sm">
                    Welcome to Dorian AI! 🎉
                </h1>

                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-8">
                    Your subscription has been successfully activated.
                </p>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-inner">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Next Steps</h2>
                    <ul className="space-y-3 text-left text-gray-700 dark:text-gray-300">
                        <li className="flex items-center">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Complete your profile setup</span>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Explore our features</span>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Join our community</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        asChild
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-shadow"
                    >
                        <Link href="/dashboard" className="flex items-center">
                            Go to Dashboard
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md hover:shadow-lg transition-shadow"
                    >
                        <Link href="/docs" className="flex items-center">
                            View Documentation
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
                    <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Loading...</h1>
                </div>
            </div>
        }>
            <SuccessPageContent />
        </Suspense>
    );
} 