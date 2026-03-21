"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { DESTINATIONS } from "@/lib/constants";

export default function DestinationsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background relative">
            <Navigation />

            <div className="noise mix-blend-overlay opacity-20 pointer-events-none fixed inset-0 z-0" />

            {/* Editorial Header */}
            <section className="pt-48 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-border-subtle relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[0.65rem] uppercase tracking-[0.4em] text-muted mb-12"
                >
                    The World, Curated
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-hero text-[clamp(4rem,9vw,9rem)] leading-[0.85] tracking-tighter text-foreground max-w-5xl text-balance"
                >
                    Where do you need to <span className="italic text-muted font-light">disappear?</span>
                </motion.h1>
            </section>

            {/* Destination Grid — Asymmetric Bento-style Layout */}
            <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 relative z-10">

                {/* Row 1 — Large + Small */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                    {DESTINATIONS.slice(0, 3).map((dest, i) => (
                        <Link
                            key={dest.id}
                            href={`/trips?destination=${dest.id}`}
                            className={`group relative overflow-hidden bg-surface-1 ${i === 0 ? "md:col-span-8 aspect-[16/9]" : "md:col-span-4 aspect-square"}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 1.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full h-full relative"
                            >
                                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/40 transition-colors duration-[2s] ease-[0.16,1,0.3,1]" />
                                <Image
                                    src={dest.image}
                                    alt={dest.name}
                                    fill
                                    className="object-cover contrast-[1.1] grayscale-[10%] group-hover:scale-105 transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    sizes="(max-width:768px) 100vw, 60vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

                                <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20">
                                    <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/70 mb-4">{dest.region} · {dest.tripCount} Journeys</p>
                                    <h2 className="font-hero text-[clamp(2.5rem,4vw,4rem)] text-white tracking-tighter leading-[0.9] mb-4">{dest.name}</h2>
                                    <p className="text-white/60 font-light italic text-xl translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1]">{dest.tagline}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Row 2 — Small + Large */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {DESTINATIONS.slice(3, 6).map((dest, i) => (
                        <Link
                            key={dest.id}
                            href={`/trips?destination=${dest.id}`}
                            className={`group relative overflow-hidden bg-surface-1 ${i === 2 ? "md:col-span-8 aspect-[16/9]" : "md:col-span-4 aspect-square"}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 1.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full h-full relative"
                            >
                                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/40 transition-colors duration-[2s] ease-[0.16,1,0.3,1]" />
                                <Image
                                    src={dest.image}
                                    alt={dest.name}
                                    fill
                                    className="object-cover contrast-[1.1] grayscale-[10%] group-hover:scale-105 transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    sizes="(max-width:768px) 100vw, 60vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

                                <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20">
                                    <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/70 mb-4">{dest.region} · {dest.tripCount} Journeys</p>
                                    <h2 className="font-hero text-[clamp(2.5rem,4vw,4rem)] text-white tracking-tighter leading-[0.9] mb-4">{dest.name}</h2>
                                    <p className="text-white/60 font-light italic text-xl translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1]">{dest.tagline}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </section>

            {/* Custom Journey CTA */}
            <section className="bg-surface-1 py-48 text-center relative overflow-hidden border-t border-border-subtle z-10">
                <div className="relative z-10 px-6 max-w-4xl mx-auto">
                    <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted mb-12">Beyond the Archive</p>
                    <h2 className="font-hero text-[clamp(3.5rem,8vw,6rem)] text-foreground leading-[0.85] tracking-tighter mb-12 text-balance">
                        Don't see your destination?
                    </h2>
                    <p className="text-border-strong font-light text-2xl mb-16">We go everywhere. Tell us where you feel called to go.</p>
                    <Link
                        href="/contact"
                        className="inline-block border border-foreground/30 text-foreground text-[0.6rem] uppercase tracking-[0.4em] px-12 py-6 hover:bg-foreground hover:text-background transition-all duration-700 ease-[0.16,1,0.3,1]"
                    >
                        Request a Custom Journey
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}

