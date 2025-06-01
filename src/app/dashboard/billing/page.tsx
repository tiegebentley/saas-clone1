'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Package, Receipt } from "lucide-react"
import { toast } from "sonner"

export default function BillingPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleBillingPortal = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/stripe/billing-portal', {
                method: 'POST',
            })

            if (!response.ok) {
                const error = await response.text()
                if (response.status === 400) {
                    toast.error('No active subscription found. Please subscribe to a plan first.')
                    return
                }
                throw new Error(error || 'Failed to create billing portal session')
            }

            const { url } = await response.json()
            router.push(url)
        } catch (error) {
            console.error('Error:', error)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Billing Information</h1>
                <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={handleBillingPortal}
                    disabled={isLoading}
                >
                    <CreditCard className="w-4 h-4 mr-2" />
                    {isLoading ? 'Loading...' : 'Manage Billing'}
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Current Plan</h3>
                            <p className="text-sm text-muted-foreground">Pro Plan</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <CreditCard className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Payment Method</h3>
                            <p className="text-sm text-muted-foreground">Manage in Stripe Portal</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Receipt className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Billing Cycle</h3>
                            <p className="text-sm text-muted-foreground">Monthly</p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Billing History</h2>
                <p className="text-sm text-muted-foreground">
                    View your complete billing history and download invoices in the Stripe Portal.
                </p>
            </Card>
        </div>
    )
}
