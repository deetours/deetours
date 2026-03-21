"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Plane, Users, Calendar, MessageSquare, LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Trips", href: "/dashboard/trips", icon: Plane },
        { name: "Leads", href: "/dashboard/leads", icon: Users },
        { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
        { name: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquare },
    ];

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden selection:bg-foreground selection:text-background">
            {/* Sidebar */}
            <motion.aside 
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-[250px] bg-surface-1 border-r border-border-subtle flex flex-col justify-between hidden md:flex"
            >
                <div>
                    <div className="p-8 border-b border-border-subtle">
                        <Link href="/" className="font-hero text-2xl tracking-tighter hover:opacity-70 transition-opacity">
                            DeeTours
                        </Link>
                        <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted mt-2">Admin Protocol</p>
                    </div>

                    <nav className="p-4 space-y-2 mt-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            
                            return (
                                <Link 
                                    key={item.href} 
                                    href={item.href}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                                        isActive 
                                        ? "bg-foreground text-background" 
                                        : "text-muted hover:bg-border-subtle hover:text-foreground"
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="text-[0.7rem] uppercase tracking-[0.2em]">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-6 border-t border-border-subtle">
                    <SignOutButton>
                        <button className="flex items-center gap-4 px-4 py-3 w-full text-left text-muted hover:bg-border-subtle hover:text-foreground rounded-lg transition-all duration-300">
                            <LogOut className="w-4 h-4" />
                            <span className="text-[0.7rem] uppercase tracking-[0.2em]">Sign Out</span>
                        </button>
                    </SignOutButton>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-background">
                {children}
            </main>
        </div>
    );
}
