"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FEATURED_TRIPS, CATEGORIES } from "@/lib/constants";
import { TripCard } from "@/components/trip-card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function TripsPage() {
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const filteredTrips = activeCategory === "all"
        ? FEATURED_TRIPS
        : FEATURED_TRIPS.filter(trip => trip.category === activeCategory);

    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            <div className="pt-40 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
                <header className="mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-hero text-[clamp(4rem,8vw,7rem)] leading-none text-primary-dark mb-12 tracking-tighter"
                    >
                        The Collection
                    </motion.h1>

                    {/* Seamless Typographic Mega-Menu Filter */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="flex flex-wrap gap-x-12 gap-y-4 border-b border-gray-200 pb-4"
                    >
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`text-sm uppercase tracking-[0.2em] transition-colors duration-500 hover:text-primary-dark ${activeCategory === "all" ? "text-primary-dark font-medium" : "text-gray-400"}`}
                        >
                            All Journeys
                        </button>
                        {CATEGORIES.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`text-sm uppercase tracking-[0.2em] transition-colors duration-500 hover:text-primary-dark ${activeCategory === category.id ? "text-primary-dark font-medium" : "text-gray-400"}`}
                            >
                                {category.title}
                            </button>
                        ))}
                    </motion.div>
                </header>

                {/* Dynamic Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                    <AnimatePresence>
                        {filteredTrips.map((trip, index) => (
                            <motion.div
                                key={trip.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <TripCard trip={trip} index={index} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredTrips.length === 0 && (
                    <div className="py-32 flex flex-col items-center text-center">
                        <h3 className="font-hero text-3xl text-gray-400 mb-4">No scattered itineraries here.</h3>
                        <p className="text-gray-500 light">Contact our concierge to design a custom journey for this category.</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
