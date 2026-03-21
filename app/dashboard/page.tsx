"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plane, Users, Calendar, ArrowUpRight } from "lucide-react";

export default function DashboardOverview() {
    // These will return undefined until loaded
    const trips = useQuery(api.trips.getTrips);
    const leads = useQuery(api.leads.getLeads);
    const bookings = useQuery(api.bookings.getBookings);

    const stats = [
        { 
            name: "Active Journeys", 
            value: trips ? trips.length : "...", 
            icon: Plane,
            trend: "+2"
        },
        { 
            name: "New Leads", 
            value: leads ? leads.filter(l => l.status === "new").length : "...", 
            icon: Users,
            trend: "+12"
        },
        { 
            name: "Confirmed Bookings", 
            value: bookings ? bookings.filter(b => b.status === "confirmed").length : "...", 
            icon: Calendar,
            trend: "+4"
        }
    ];

    return (
        <div className="p-8 md:p-12 max-w-[1400px] mx-auto min-h-screen">
            <header className="mb-12">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-hero text-4xl md:text-5xl tracking-tighter"
                >
                    Overview
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-muted mt-2"
                >
                    Monitor your sanctuary's heartbeat.
                </motion.p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-surface-1 border border-border-subtle p-6 rounded-2xl relative overflow-hidden group"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-3 bg-background border border-border-subtle rounded-xl">
                                    <Icon className="w-5 h-5 text-foreground" />
                                </div>
                                <div className="flex items-center gap-1 text-green-500 text-xs font-medium bg-green-500/10 px-2 py-1 rounded">
                                    <ArrowUpRight className="w-3 h-3" />
                                    {stat.trend}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-4xl font-hero tracking-tighter mb-1">{stat.value}</h3>
                                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">{stat.name}</p>
                            </div>

                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-foreground/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    );
                })}
            </div>

            {/* Recent Activity (Placeholder for now) */}
            <div>
                <h2 className="font-hero text-2xl tracking-tighter border-b border-border-subtle pb-4 mb-6">Recent Activity</h2>
                <div className="bg-surface-1 border border-border-subtle rounded-2xl p-8 text-center">
                    <p className="text-muted text-sm font-light">
                        {leads && leads.length === 0 ? "No recent activity yet. Your sanctuary is quiet." : "Activity feed will populate here based on new leads and bookings."}
                    </p>
                </div>
            </div>
        </div>
    );
}
