import React from 'react'
import Navbar from '@/components/layout/global/navbar'
import Footer from '@/components/layout/global/footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-transparent">
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout