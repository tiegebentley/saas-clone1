import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CreditCard } from 'lucide-react'

const Page = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Link href="/dashboard/billing">
                    <Button>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Billing Information
                    </Button>
                </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Add your dashboard content here */}
            </div>
        </div>
    )
}

export default Page