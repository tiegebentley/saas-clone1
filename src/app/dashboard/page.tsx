import React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, PlusCircle, BarChart2, Users, Bell } from 'lucide-react'

const quickActions = [
    { label: 'New Project', icon: <PlusCircle className="h-5 w-5" />, color: 'bg-primary/90 text-white' },
    { label: 'Calendar', icon: <Calendar className="h-5 w-5" />, color: 'bg-blue-600 text-white' },
    { label: 'Reports', icon: <BarChart2 className="h-5 w-5" />, color: 'bg-green-600 text-white' },
    { label: 'Team', icon: <Users className="h-5 w-5" />, color: 'bg-purple-600 text-white' },
]

const recent = [
    { title: 'Project Alpha created', time: '2 hours ago' },
    { title: 'Report generated', time: 'Yesterday' },
    { title: 'Team member added', time: '2 days ago' },
]

const DashboardPage = () => {
    const now = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
    return (
        <div className="max-w-6xl mx-auto w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">Welcome back 👋</h1>
                    <div className="text-muted-foreground text-sm">{now}</div>
                </div>
                <Button className="flex items-center gap-2 rounded-full"><Bell className="h-5 w-5" />Notifications</Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {quickActions.map((action) => (
                    <Button key={action.label} className={`flex flex-col items-center py-8 gap-2 rounded-xl shadow-md ${action.color}`}
                        variant="ghost">
                        {action.icon}
                        <span className="font-medium text-base">{action.label}</span>
                    </Button>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <ul className="divide-y divide-border">
                    {recent.map((item, idx) => (
                        <li key={idx} className="py-3 flex items-center justify-between">
                            <span className="text-foreground">{item.title}</span>
                            <span className="text-xs text-muted-foreground">{item.time}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DashboardPage