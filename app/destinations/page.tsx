"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { DESTINATIONS } from "@/lib/constants";

export default function DestinationsPage() {
    return (
        <main className="min-h-screen bg-background selection:bg-accent-luxury selection:text-white">
            <Navigation />

            {/* Editorial Header */}
            <section className="pt-48 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-gray-100">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8"
                >
                    The World, Curated
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="font-hero text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tighter text-primary-dark max-w-5xl text-balance"
                >
                    Where do you need to <span className="italic text-gray-400 font-light">disappear?</span>
                </motion.h1>
            </section>

            {/* Destination Grid — Asymmetric Bento-style Layout */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">

                {/* Row 1 — Large + Small */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                    {DESTINATIONS.slice(0, 3).map((dest, i) => (
                        <Link
                            key={dest.id}
                            href={`/trips?destination=${dest.id}`}
                            className={`group relative overflow-hidden bg-primary-dark ${i === 0 ? "md:col-span-7 aspect-[16/9]" : "md:col-span-5 aspect-square"}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 1.05 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 1.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={dest.image}
                                    alt={dest.name}
                                    fill
                                    className="object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    sizes="(max-width:768px) 100vw, 60vw"
                                />
                                <div className="noise" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 z-10">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-accent-luxury mb-3">{dest.region} · {dest.tripCount} Journeys</p>
                                    <h2 className="font-hero text-4xl md:text-5xl text-white tracking-tighter leading-none mb-2">{dest.name}</h2>
                                    <p className="text-white/60 font-light italic text-lg translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">{dest.tagline}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Row 2 — Small + Large */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {DESTINATIONS.slice(3, 6).map((dest, i) => (
                        <Link
                            key={dest.id}
                            href={`/trips?destination=${dest.id}`}
                            className={`group relative overflow-hidden bg-primary-dark ${i === 2 ? "md:col-span-7 aspect-[16/9]" : "md:col-span-5 aspect-square"}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 1.05 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 1.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={dest.image}
                                    alt={dest.name}
                                    fill
                                    className="object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    sizes="(max-width:768px) 100vw, 60vw"
                                />
                                <div className="noise" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 z-10">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-accent-luxury mb-3">{dest.region} · {dest.tripCount} Journeys</p>
                                    <h2 className="font-hero text-4xl md:text-5xl text-white tracking-tighter leading-none mb-2">{dest.name}</h2>
                                    <p className="text-white/60 font-light italic text-lg translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">{dest.tagline}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </section>

            {/* Custom Journey CTA */}
            <section className="bg-primary-dark py-32 text-center relative overflow-hidden">
                <div className="noise" />
                <div className="relative z-10 px-6 max-w-2xl mx-auto">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-8">Beyond the List</p>
                    <h2 className="font-hero text-[clamp(2.5rem,6vw,5rem)] text-white leading-tight mb-8 text-balance">
                        Don't see your dream destination?
                    </h2>
                    <p className="text-gray-400 font-light text-xl mb-12">We go everywhere. Simply tell us where you feel called to go.</p>
                    <Link
                        href="/contact"
                        className="inline-block border border-white/30 text-white text-[10px] uppercase tracking-[0.3em] px-10 py-4 hover:bg-white hover:text-primary-dark transition-all duration-500"
                    >
                        Request a Custom Journey
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
