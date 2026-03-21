"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trip } from "@/lib/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function BentoCard({ trip, layoutType, index = 0 }: { trip: Trip; layoutType: "hero" | "stack"; index?: number }) {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Subtly parallax the image
    const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const isHero = layoutType === "hero";

    return (
        <motion.div 
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative flex flex-col cursor-pointer active-scale shadow-[var(--shadow-harsh)] border border-border-subtle transition-all duration-700 ${isHero ? "h-[600px] lg:h-[800px] md:col-span-8" : "h-[380px] lg:h-[380px] md:col-span-4"}`}
        >
            <Link href={`/trips/${trip.id}`} className="absolute inset-0 z-30">
                <span className="sr-only">View {trip.title} details</span>
            </Link>

            <div className="relative w-full h-full overflow-hidden bg-background">
                {/* Physical Texture */}
                <div className="noise absolute inset-0 z-20 pointer-events-none opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[#0A0A0A]/30 z-10 group-hover:bg-[#0A0A0A]/50 transition-colors duration-1000 ease-[0.16,1,0.3,1]" />

                <motion.div 
                    style={{ y: yImage }}
                    className="absolute inset[-10%] w-full h-[120%] origin-center"
                >
                    <Image
                        src={trip.imageUrl}
                        alt={trip.title}
                        fill
                        className="object-cover contrast-[1.1] grayscale-[10%] scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </motion.div>
            </div>

            {/* Typography layered aggressively over the bottom overlap, strict white for contrast against photo scrim */}
            <div className="absolute bottom-0 left-0 p-6 lg:p-10 z-20 flex flex-col justify-end w-full transform group-hover:-translate-y-2 transition-transform duration-1000 ease-[0.16,1,0.3,1]">
                <div className="flex justify-between items-end w-full mb-4">
                    <p className="text-[0.6rem] uppercase tracking-[0.3em] text-[#FAFAFA] font-medium opacity-80">
                        {trip.duration} Days
                    </p>
                </div>
                
                <h3 className={`font-hero leading-[0.9] text-[#FAFAFA] ${isHero ? "text-[clamp(2.5rem,5vw,5rem)] max-w-2xl" : "text-[clamp(1.8rem,3vw,2.5rem)]"}`}>
                    {trip.title}
                </h3>
            </div>
        </motion.div>
    );
}

export function FeaturedTrips() {
    // Fetch live trips from Convex
    const liveTrips = useQuery(api.trips.getFeaturedTrips, { limit: 3 });
    const trips = liveTrips || [];

    return (
        <section className="bg-background text-foreground w-full py-48 relative overflow-hidden">
            <div className="noise absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
                
                {/* Asymmetrical 12-Column Editorial Headings */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-32 items-end">
                    <div className="md:col-span-8 relative">
                        {/* Offset Typography - bleeds left/right mentally */}
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            className="font-hero text-[clamp(4rem,8vw,8rem)] leading-[0.85] tracking-tighter text-foreground"
                        >
                            The <br />
                            <span className="italic font-light text-muted">Archival</span> <br />
                            Collection.
                        </motion.h2>
                    </div>
                    
                    <div className="md:col-span-4 flex flex-col justify-end">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-muted text-lg font-light leading-relaxed mb-12"
                        >
                            Masterpieces of escapism. These are not itineraries; they are carefully orchestrated emotional arcs. Strictly limited to maintain atmospheric integrity.
                        </motion.p>
                        
                        {/* Tertiary "Cinematic Text Arrow" CTA */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, delay: 0.4 }}
                        >
                            <Link href="/trips" className="group inline-flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.2em] font-medium text-foreground">
                                <span>Examine Full Collection</span>
                                <div className="w-8 h-[1px] bg-background relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#737373] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* The 12-Column Asymmetrical Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-8">
                    {trips[0] && <BentoCard trip={trips[0]} layoutType="hero" index={0} />}
                    
                    <div className="md:col-span-4 grid grid-cols-1 gap-4 lg:gap-8">
                        {trips[1] && <BentoCard trip={trips[1]} layoutType="stack" index={1} />}
                        {trips[2] && <BentoCard trip={trips[2]} layoutType="stack" index={2} />}
                    </div>
                </div>

            </div>
        </section>
    );
}

