"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FEATURED_TRIPS } from "@/lib/constants";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { BookingSheet } from "@/components/booking-sheet";

export default function TripDetailPage() {
    const params = useParams();
    const trip = FEATURED_TRIPS.find((t) => t.id === params.tripId);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // Parallax for Hero
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    if (!trip) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <h1 className="font-hero text-4xl">Journey not found.</h1>
            </div>
        );
    }

    // Generate mock itinerary days based on duration
    const daysCount = parseInt(trip.duration) || 7;
    const itinerary = Array.from({ length: daysCount }).map((_, i) => ({
        day: i + 1,
        title: i === 0 ? "Arrival & Immersion" : i === daysCount - 1 ? "Departure" : "Deep Exploration",
        description: "Your day begins with a perfectly curated morning reflecting the rhythm of the destination. From exclusive guided access to hidden sanctuaries in the afternoon, every detail is orchestrated. The evening culminates in a spectacular gastronomic experience designed to ground you in the local culture."
    }));

    return (
        <main className="min-h-screen bg-background relative selection:bg-accent-luxury selection:text-white">
            <Navigation />

            {/* Cinematic Hero - Edge to Edge Parallax */}
            <section className="relative h-[80vh] w-full overflow-hidden bg-primary-dark">
                <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
                    <Image
                        src={trip.imageUrl}
                        alt={trip.title}
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                </motion.div>
                {/* Soft elegant gradient instead of harsh black */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-90" />
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
                <div className="noise z-20" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-4xl">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[11px] uppercase tracking-[0.3em] text-white/70 mb-6"
                        >
                            {trip.category} • {trip.destination}
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="font-hero text-[clamp(3rem,6vw,6rem)] leading-[0.9] tracking-tighter text-white mb-6"
                        >
                            {trip.title}
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Button size="lg" variant="luxury" onClick={() => setIsBookingOpen(true)}>
                            Initialize Journey
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Main Content - No Borders, Spatial Layout */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-32 grid grid-cols-1 lg:grid-cols-12 gap-y-24 lg:gap-x-24">

                {/* Left Column: Overview & Philosophy */}
                <div className="lg:col-span-4 flex flex-col gap-16">
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">The Philosophy</h3>
                        <p className="text-xl leading-relaxed font-light text-primary-dark">
                            {trip.description || "This journey is meticulously designed to push boundaries while ensuring absolute safety and luxury. It is not merely a vacation—it is an immersion into the sublime."}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">At a Glance</h3>
                        <ul className="space-y-6">
                            <li className="flex justify-between border-b border-gray-200 pb-4">
                                <span className="text-gray-500 font-light">Duration</span>
                                <span className="font-medium text-primary-dark">{trip.duration}</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-200 pb-4">
                                <span className="text-gray-500 font-light">Investment</span>
                                <span className="font-medium text-primary-dark">${trip.price.toLocaleString()}</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-200 pb-4">
                                <span className="text-gray-500 font-light">Pacing</span>
                                <span className="font-medium text-primary-dark">Intense yet Restorative</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: The Itinerary (Sticky Scroll) */}
                <div className="lg:col-span-8">
                    <h3 className="font-hero text-4xl text-primary-dark mb-16">The Itinerary</h3>

                    <div className="space-y-32">
                        {itinerary.map((day, i) => (
                            <motion.div
                                key={day.day}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col md:flex-row gap-8 md:gap-16"
                            >
                                <div className="md:w-1/3 shrink-0">
                                    <div className="sticky top-40">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-accent-luxury mb-2">Day {day.day}</p>
                                        <h4 className="font-hero text-2xl text-primary-dark">{day.title}</h4>
                                    </div>
                                </div>
                                <div className="md:w-2/3">
                                    <p className="text-lg leading-relaxed text-gray-600 font-light">
                                        {day.description}
                                    </p>

                                    {/* Abstract placeholder for daily imagery without framing it in a hard box */}
                                    {i % 2 === 0 && (
                                        <div className="mt-8 relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
                                            <Image
                                                src={trip.imageUrl}
                                                alt={`Day ${day.day} highlight`}
                                                fill
                                                className="object-cover opacity-60 scale-105"
                                            />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </section>

            {/* Floating Action / Re-engagement */}
            <section className="bg-primary-dark py-32 text-center relative overflow-hidden text-white">
                <div className="noise" />
                <div className="relative z-10 max-w-2xl mx-auto px-6">
                    <h2 className="font-hero text-[clamp(2rem,5vw,4rem)] mb-8">Ready to step into the unknown?</h2>
                    <Button variant="luxury" size="lg" onClick={() => setIsBookingOpen(true)}>
                        Initialize Journey
                    </Button>
                </div>
            </section>

            <Footer />

            {/* Unified Conversational Overlay */}
            <BookingSheet
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                trip={trip}
            />
        </main>
    );
}
