"use client";

import { useState, Suspense, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import { BentoCard } from "@/components/featured-trips";
import { Navigation } from "@/components/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Footer } from "@/components/footer";
import Link from "next/link";

function TripsContent() {
    const searchParams = useSearchParams();
    const destinationQuery = searchParams.get("destination");
    const [activeCategory, setActiveCategory] = useState<string>("all");

    // Reset category when destination changes
    useEffect(() => {
        if (destinationQuery) {
            setActiveCategory("all");
        }
    }, [destinationQuery]);

    const liveTrips = useQuery(api.trips.getTrips);
    const trips = liveTrips || [];

    const filteredTrips = trips.filter((trip: any) => {
        const matchesCategory = activeCategory === "all" || trip.category === activeCategory;
        const matchesDestination = !destinationQuery || trip.destination.toLowerCase().replace(/\s+/g, '-') === destinationQuery.toLowerCase();
        return matchesCategory && matchesDestination;
    });

    return (
        <div className="pt-48 pb-32 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen relative z-10">
            <header className="mb-32">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-hero text-[clamp(4.5rem,10vw,12rem)] leading-[0.85] text-foreground mb-8 tracking-tighter"
                >
                    The <span className="italic font-light text-muted">Vault.</span>
                </motion.h1>

                {destinationQuery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-12 flex items-center gap-4"
                    >
                        <span className="text-sm text-border-strong font-light">Filtered by destination: <span className="text-foreground capitalize">{destinationQuery.replace(/-/g, ' ')}</span></span>
                        <Link href="/trips" className="text-[0.6rem] uppercase tracking-[0.2em] text-muted hover:text-foreground underline underline-offset-4">
                            Clear Filter
                        </Link>
                    </motion.div>
                )}

                {/* Fluid Text Links Filter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1.4 }}
                    className="flex flex-wrap gap-x-12 gap-y-6"
                >
                    <button
                        onClick={() => setActiveCategory("all")}
                        className={`text-[0.65rem] uppercase tracking-[0.3em] transition-colors duration-500 hover:text-foreground ${activeCategory === "all" ? "text-foreground border-b border-foreground pb-1" : "text-muted"}`}
                    >
                        Complete Archive
                    </button>
                    {CATEGORIES.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`text-[0.65rem] uppercase tracking-[0.3em] transition-colors duration-500 hover:text-foreground ${activeCategory === category.id ? "text-foreground border-b border-foreground pb-1" : "text-muted"}`}
                        >
                            {category.title}
                        </button>
                    ))}
                </motion.div>
            </header>

            {/* The Vault Asymmetrical Staggered Gallery */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
                <AnimatePresence mode="popLayout">
                    {filteredTrips.map((trip, index) => {
                        // Create an asymmetrical rhythm based on index
                        const isMassive = index % 5 === 0;
                        const isWide = index % 5 === 3;
                        
                        let colSpan = "md:col-span-4";
                        let layoutType: "hero" | "stack" = "stack";

                        if (isMassive) {
                            colSpan = "md:col-span-8";
                            layoutType = "hero";
                        } else if (isWide) {
                            colSpan = "md:col-span-12 lg:col-span-8 lg:col-start-3";
                            layoutType = "hero";
                        }

                        return (
                            <motion.div
                                key={trip._id}
                                layout
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className={`${colSpan}`}
                            >
                                <BentoCard trip={trip} layoutType={layoutType} />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {filteredTrips.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="py-48 flex flex-col items-center text-center border-t border-border-subtle mt-24"
                >
                    <h3 className="font-hero text-4xl text-muted mb-6 italic">The archive is empty.</h3>
                    <p className="text-border-strong font-light tracking-wide">
                        No journeys currently match this curation.
                    </p>
                </motion.div>
            )}
        </div>
    );
}

export default function TripsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
            <Navigation />
            <div className="noise mix-blend-overlay opacity-20 pointer-events-none fixed inset-0 z-0" />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-muted tracking-[0.4em] uppercase text-xs">Curating...</p></div>}>
                <TripsContent />
            </Suspense>
            <Footer />
        </main>
    );
}

