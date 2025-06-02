import React from 'react'
import SidebarDashboard from '@/components/layout/private/sidebarDashboard'
import { requireSubscription } from '@/lib/subscription'

const Layout = async ({ children }: { children: React.ReactNode }) => {
    await requireSubscription();

    return (
        <div className="flex h-screen">
            <SidebarDashboard />
            <main className="flex-1 overflow-y-auto py-16">
                {children}
            </main>
        </div>
    )
}

export default Layout