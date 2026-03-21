"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function TripsManager() {
    const trips = useQuery(api.trips.getTrips);

    return (
        <div className="p-8 md:p-12 max-w-[1400px] mx-auto min-h-screen">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="font-hero text-4xl md:text-5xl tracking-tighter"
                    >
                        Journeys
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-muted mt-2"
                    >
                        Manage and curate the collection.
                    </motion.p>
                </div>
                
                <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-[0.65rem] uppercase tracking-[0.2em] font-medium hover:bg-foreground/90 transition-all shadow-lg"
                >
                    <Plus className="w-4 h-4" />
                    Create New Journey
                </motion.button>
            </header>

            {/* Trips Table */}
            <div className="bg-surface-1 border border-border-subtle rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border-subtle bg-background/50">
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal">Journey</th>
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal">Destination</th>
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal">Duration</th>
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal text-right">Investment</th>
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal text-center">Status</th>
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!trips ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted font-light">Loading collection...</td>
                                </tr>
                            ) : trips.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted font-light">The collection is currently empty.</td>
                                </tr>
                            ) : (
                                trips.map((trip) => (
                                    <tr key={trip._id} className="border-b border-border-subtle/50 hover:bg-white/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 rounded bg-background overflow-hidden shrink-0 border border-border-subtle">
                                                    <Image src={trip.imageUrl} alt={trip.title} fill className="object-cover" />
                                                </div>
                                                <span className="font-hero text-lg tracking-tight">{trip.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-light text-muted">{trip.destination}</td>
                                        <td className="px-6 py-4 text-sm font-light text-muted">{trip.duration}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-right">${trip.price.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-center">
                                            {trip.isPublished ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-green-500/10 text-green-500 text-[0.6rem] uppercase tracking-wider">
                                                    <Eye className="w-3 h-3" /> Live
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-border-strong text-muted text-[0.6rem] uppercase tracking-wider">
                                                    <EyeOff className="w-3 h-3" /> Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-muted hover:text-foreground transition-colors rounded hover:bg-border-subtle">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-muted hover:text-red-500 transition-colors rounded hover:bg-border-subtle">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
