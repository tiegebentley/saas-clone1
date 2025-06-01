"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, Settings, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    return (
        <nav className="flex items-center text-sm text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                </li>
                {segments.slice(1).map((seg, idx) => (
                    <React.Fragment key={idx}>
                        <span className="mx-1">/</span>
                        <li>
                            <span className="capitalize">{seg.replace(/-/g, ' ')}</span>
                        </li>
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: (
                <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Profile",
            href: "/dashboard/profile",
            icon: (
                <UserCog className="h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Settings",
            href: "/dashboard/settings",
            icon: (
                <Settings className="h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Logout",
            href: "/auth/logout",
            icon: (
                <LogOut className="h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    return (
        <div className="flex min-h-screen w-full bg-background">
            {/* Sidebar on the left, full height */}
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10 h-screen border-r border-border/40 bg-card shadow-2xl">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <div className="flex items-center justify-center p-2">
                            {open ? <Logo /> : <LogoIcon />}
                        </div>
                        <div className="mt-8 flex flex-col gap-2 px-2">
                            {links.map((link, idx) => (
                                <SidebarLink
                                    key={idx}
                                    link={link}
                                    className={cn(
                                        open && pathname === link.href
                                            ? "border-l-4 border-primary text-primary"
                                            : !open && pathname === link.href
                                                ? ""
                                                : "hover:bg-muted/40",
                                        open ? "justify-start px-2" : "justify-center px-0",
                                        "flex items-center h-10"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
            {/* Main content area: navbar at the top, then content */}
            <div className="flex flex-col flex-1 min-h-0">
                {/* Top Navbar (only above main content) */}
                <header
                    className="flex items-center h-16 px-6 border-b border-border/40 bg-card shadow-lg mb-4 transition-all duration-200"
                    style={{ minHeight: 64 }}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen((prev) => !prev)}
                        className="mr-4"
                    >
                        {open ? (
                            <PanelLeftClose className="h-5 w-5" />
                        ) : (
                            <PanelLeftOpen className="h-5 w-5" />
                        )}
                        <span className="sr-only">Toggle Sidebar</span>
                    </Button>
                    <div className="flex-1">
                        <Breadcrumbs />
                    </div>
                    {/* Right side: UserButton and ModeToggle */}
                    <div className="flex items-center gap-4">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "h-8 w-8",
                                    userButtonPopoverCard: "shadow-lg border-border/40",
                                    userButtonPopoverActionButton: "hover:bg-accent hover:text-accent-foreground",
                                    userButtonPopoverFooter: "border-t border-border/40"
                                }
                            }}
                        />
                        <ModeToggle />
                    </div>
                </header>
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export const Logo = () => {
    return (
        <Link
            href="/dashboard"
            className="font-normal flex items-center space-x-2 text-sm text-foreground py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0 shadow-lg shadow-primary/20" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-foreground whitespace-pre"
            >
                Dorian AI
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            href="/dashboard"
            className="font-normal flex items-center justify-center text-sm text-foreground py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0 shadow-lg shadow-primary/20" />
        </Link>
    );
};

export default Layout;
