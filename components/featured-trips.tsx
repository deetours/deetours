"use client";

import { motion } from "framer-motion";
import { FEATURED_TRIPS } from "@/lib/constants";
import { TripCard } from "./trip-card";
import { Button } from "./ui/button";

export function FeaturedTrips() {
    return (
        <section className="bg-background w-full py-[clamp(8rem,15vw,12rem)] relative">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-6"
                        >
                            The Masterpieces
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="font-hero text-section leading-[1.1] text-primary-dark"
                        >
                            Our most <span className="italic text-gray-500">transformative</span> itineraries.
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Button variant="outline" size="lg" onClick={() => window.location.href = '/trips'}>
                            View the Collection
                        </Button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                    {FEATURED_TRIPS.slice(0, 3).map((trip, index) => (
                        <TripCard key={trip.id} trip={trip} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}
