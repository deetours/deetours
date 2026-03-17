"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { FEATURED_TRIPS, OWNER } from "@/lib/constants";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";

export default function DashboardPage() {
    const upcomingJourney = FEATURED_TRIPS[4]; // Atlas Traverse

    const daysUntil = 42;

    return (
        <main className="min-h-screen bg-background relative selection:bg-accent-luxury selection:text-white">
            <Navigation />

            <section className="pt-48 pb-32 px-6 md:px-12 max-w-[1200px] mx-auto">

                {/* Greeting Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-100 pb-12 mb-20 gap-8">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-6"
                        >
                            The Sanctuary
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="font-hero text-5xl md:text-7xl text-primary-dark tracking-tighter"
                        >
                            Welcome back, <br /><span className="italic text-gray-400 font-light">Priya.</span>
                        </motion.h1>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-start md:items-end gap-2"
                    >
                        <p className="text-sm text-gray-400 font-light">Your concierge</p>
                        <p className="font-medium text-primary-dark">{OWNER.name}</p>
                        <a href={`tel:${OWNER.phone}`} className="flex items-center gap-2 text-sm text-accent-luxury hover:text-primary-dark transition-colors">
                            <Phone className="w-3 h-3" />
                            {OWNER.phone}
                        </a>
                    </motion.div>
                </div>

                {/* The Next Journey — Primary Focus Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-primary-dark overflow-hidden group mb-32"
                >
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={upcomingJourney.imageUrl}
                            alt={upcomingJourney.title}
                            fill
                            className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-90 z-10" />
                    <div className="noise z-20" />

                    <div className="absolute inset-0 z-30 p-8 md:p-16 flex flex-col justify-between text-white">
                        <div className="flex justify-between items-start">
                            <div className="bg-white/10 backdrop-blur-md px-6 py-3 border border-white/20 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-[10px] uppercase tracking-[0.2em]">Curating Final Details</span>
                            </div>
                            <div className="text-right">
                                <p className="font-hero text-6xl md:text-8xl leading-none">{daysUntil}</p>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">Days Until Departure</p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="w-3 h-3 text-accent-luxury" />
                                <p className="text-[10px] uppercase tracking-[0.3em] text-accent-luxury">{upcomingJourney.destination}</p>
                                <span className="text-white/30">·</span>
                                <Clock className="w-3 h-3 text-white/50" />
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{upcomingJourney.duration}</p>
                            </div>
                            <h2 className="font-hero text-5xl md:text-7xl tracking-tighter mb-8">{upcomingJourney.title}</h2>
                            <Link href={`/trips/${upcomingJourney.id}`}>
                                <button className="border border-white/40 text-[10px] uppercase tracking-[0.2em] px-8 py-4 text-white hover:bg-white hover:text-primary-dark transition-all duration-500 flex items-center gap-3">
                                    View Complete Itinerary <ArrowRight className="w-3 h-3" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Journey Checklist */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {[
                        { emoji: "✓", title: "Flights Confirmed", detail: "BLR → CMN · Nov 14, 2026", done: true },
                        { emoji: "✓", title: "Accommodation Secured", detail: "5 Properties pre-selected", done: true },
                        { emoji: "⋯", title: "Visa Processing", detail: "Expected by Oct 28, 2026", done: false },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className={`p-8 border ${item.done ? "border-primary-dark bg-primary-dark text-white" : "border-gray-200"}`}
                        >
                            <span className="text-2xl mb-4 block">{item.emoji}</span>
                            <h4 className={`font-hero text-xl mb-2 ${item.done ? "text-white" : "text-primary-dark"}`}>{item.title}</h4>
                            <p className={`text-sm font-light ${item.done ? "text-gray-400" : "text-gray-500"}`}>{item.detail}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Journey Archives */}
                <div>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-6 mb-16">The Archives</h3>
                    <div className="space-y-0">
                        {[
                            { year: "2025", title: "Kyoto Serenity Retreat", type: "Spiritual", destination: "Japan", id: "trip-6" },
                            { year: "2024", title: "Amalfi Coast Indulgence", type: "Luxury", destination: "Italy", id: "trip-3" },
                            { year: "2023", title: "Awakening in Bhutan", type: "Spiritual", destination: "Bhutan", id: "trip-1" },
                        ].map((archived, i) => (
                            <Link key={archived.title} href={`/trips/${archived.id}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex flex-col md:flex-row md:items-center justify-between group cursor-pointer border-b border-gray-100 py-8 hover:border-gray-400 transition-colors duration-500"
                                >
                                    <div className="flex items-center gap-8 md:gap-16 mb-4 md:mb-0">
                                        <span className="font-hero text-3xl text-gray-200 italic">{archived.year}</span>
                                        <div>
                                            <h4 className="text-2xl lg:text-3xl font-hero text-primary-dark group-hover:text-accent-luxury transition-colors duration-500">{archived.title}</h4>
                                            <p className="text-sm text-gray-400 font-light mt-1">{archived.destination}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-300 group-hover:text-gray-600 transition-colors">{archived.type}</span>
                                        <ArrowRight className="w-4 h-4 text-gray-200 group-hover:text-primary-dark transition-all duration-500 group-hover:translate-x-1" />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Contact concierge */}
                <div className="mt-24 p-12 bg-gray-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3">Need something?</p>
                        <h3 className="font-hero text-3xl text-primary-dark">{OWNER.name} is always reachable.</h3>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <a href={`tel:${OWNER.phone}`}>
                            <Button variant="outline" size="sm">
                                <Phone className="w-4 h-4 mr-2" /> Call Directly
                            </Button>
                        </a>
                        <Link href="/contact">
                            <Button size="sm" magnetic={false}>
                                Send a Message
                            </Button>
                        </Link>
                    </div>
                </div>

            </section>

            <Footer />
        </main>
    );
}
