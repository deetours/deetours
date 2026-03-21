"use client";

import { motion } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function BookingsManager() {
    const bookings = useQuery(api.bookings.getBookings);
    const updateStatus = useMutation(api.bookings.updateBookingStatus);

    const handleStatusChange = async (id: Id<"bookings">, status: "pending" | "confirmed" | "completed" | "cancelled") => {
        await updateStatus({ id, status });
    };

    return (
        <div className="p-8 md:p-12 max-w-[1400px] mx-auto min-h-screen">
            <header className="mb-12">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-hero text-4xl md:text-5xl tracking-tighter"
                >
                    Bookings
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-muted mt-2"
                >
                    Orchestrate confirmed travel arrangements.
                </motion.p>
            </header>

            <div className="bg-surface-1 border border-border-subtle rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border-subtle bg-background/50">
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal">Journey ID</th>
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal">Group Size</th>
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal">Travel Date</th>
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal text-right">Investment</th>
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!bookings ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted font-light">Loading bookings...</td>
                                </tr>
                            ) : bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted font-light">No bookings found.</td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="border-b border-border-subtle/50 hover:bg-white/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-foreground text-xs">{booking.tripId}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-light text-muted">
                                            {booking.groupSize || 1} travelers
                                        </td>
                                        <td className="px-6 py-4 text-sm text-foreground">
                                            {booking.travelDate || "TBD"}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-right text-foreground">
                                            ${booking.totalInvestment.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <select 
                                                value={booking.status}
                                                onChange={(e) => handleStatusChange(booking._id, e.target.value as "pending" | "confirmed" | "completed" | "cancelled")}
                                                className="bg-background border border-border-subtle text-[0.65rem] uppercase tracking-[0.1em] rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-foreground"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
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
