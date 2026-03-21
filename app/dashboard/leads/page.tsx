"use client";

import { motion } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessageCircle, CheckCircle, Clock } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

export default function LeadsManager() {
    const leads = useQuery(api.leads.getLeads);
    const updateStatus = useMutation(api.leads.updateLeadStatus);

    const handleStatusChange = async (id: Id<"leads">, status: "new" | "contacted" | "closed") => {
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
                    Enquiries
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-muted mt-2"
                >
                    Manage traveler requests and conversational leads.
                </motion.p>
            </header>

            <div className="bg-surface-1 border border-border-subtle rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border-subtle bg-background/50">
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal">Traveler</th>
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal">Contact</th>
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal">Journey Interest</th>
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal">Status</th>
                                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted font-normal text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!leads ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted font-light">Loading enquiries...</td>
                                </tr>
                            ) : leads.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted font-light">No enquiries found.</td>
                                </tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr key={lead._id} className="border-b border-border-subtle/50 hover:bg-white/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-foreground">{lead.name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-light text-muted">
                                            <div>{lead.email}</div>
                                            <div className="opacity-70 mt-1">{lead.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-foreground">
                                            {lead.tripInterest}
                                        </td>
                                        <td className="px-6 py-4">
                                            <select 
                                                value={lead.status}
                                                onChange={(e) => handleStatusChange(lead._id, e.target.value as "new" | "contacted" | "closed")}
                                                className="bg-background border border-border-subtle text-[0.65rem] uppercase tracking-[0.1em] rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-foreground"
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <a 
                                                    href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="p-2 text-green-500 hover:text-green-400 bg-green-500/10 hover:bg-green-500/20 transition-colors rounded"
                                                    aria-label="WhatsApp"
                                                >
                                                    <MessageCircle className="w-4 h-4" />
                                                </a>
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
