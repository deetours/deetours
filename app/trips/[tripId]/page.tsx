"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function TripDetailPage() {
    const params = useParams();
    const tripIdStr = typeof params.tripId === "string" ? params.tripId : params.tripId?.[0];
    const liveTrips = useQuery(api.trips.getTrips) || [];
    const trip = liveTrips.find((t: any) => t._id === tripIdStr);

    // Parallax for Hero
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    const [activeImage, setActiveImage] = useState(trip?.imageUrl || "");

    if (!trip) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <h1 className="font-hero text-4xl text-foreground">Dossier not found.</h1>
            </div>
        );
    }

    const itinerary = trip.itinerary || [];
    const included = trip.included || [];
    const faq = trip.faq || [];
    const gallery = trip.gallery || [trip.imageUrl];

    return (
        <main className="min-h-screen bg-background relative selection:bg-foreground selection:text-background pb-32">
            <Navigation />

            {/* █ Cinematic Hero - STRICT DARK PARITY █ */}
            <section className="relative h-[90vh] w-full overflow-hidden bg-[#111111]">
                <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] origin-center">
                    <Image
                        src={trip.imageUrl}
                        alt={trip.title}
                        fill
                        className="object-cover opacity-60 grayscale-[20%] contrast-[1.1]"
                        priority
                        sizes="100vw"
                    />
                </motion.div>
                
                {/* Strict Dark Scrims */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/50 opacity-90" />
                <div className="noise z-20 mix-blend-overlay opacity-30 pointer-events-none absolute inset-0" />

                <div className="absolute bottom-0 left-0 w-full px-6 md:px-16 pb-16 z-30 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-5xl"
                    >
                        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#A3A3A3] mb-8">
                            The Architecture of This Journey
                        </p>
                        <h1 className="font-hero text-[clamp(4rem,10vw,8rem)] leading-[0.85] tracking-tighter text-[#FAFAFA]" style={{ fontWeight: 300 }}>
                            {trip.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* █ The Founder's Cut █ */}
            <section className="py-48 px-6 md:px-12 max-w-[1200px] mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[0.6rem] uppercase tracking-[0.3em] text-border-strong mb-12">The Curator's Note</p>
                    <h2 className="font-hero text-[clamp(2rem,4vw,3rem)] leading-[1.15] text-foreground max-w-4xl mx-auto mb-16 italic font-light">
                        "{trip.description || 'This journey bypasses the standard routes. We designed this to push you into the profound quiet of the landscape, ensuring every transition feels entirely invisible.'}"
                    </h2>
                    <div className="w-[1px] h-16 bg-foreground mx-auto mb-6" />
                    <p className="font-hero text-xl text-foreground">Deepa</p>
                </motion.div>
            </section>

            {/* █ The Scroll-Telling Timeline █ */}
            {itinerary.length > 0 && (
                <section className="w-full relative flex flex-col lg:flex-row bg-background text-foreground border-y border-border-subtle">
                    {/* Fixed Right Side Canvas (60%) visible only on lg screens upwards */}
                    <div className="hidden lg:block lg:w-[60%] sticky top-0 h-screen overflow-hidden border-l border-border-subtle">
                        <div className="absolute inset-0 bg-background/40 z-10" />
                        <div className="noise absolute inset-0 mix-blend-overlay opacity-30 z-20 pointer-events-none" />
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={activeImage}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.8, ease: "easeInOut" }}
                                className="absolute inset-0 origin-center"
                            >
                                <Image
                                    src={activeImage}
                                    alt="Journey visual"
                                    fill
                                    className="object-cover contrast-[1.15] grayscale-[10%]"
                                    sizes="60vw"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Scrolling Left Side Content (40%) */}
                    <div className="w-full lg:w-[40%] flex flex-col py-32 px-6 md:px-16 lg:px-24">
                        <div className="mb-32">
                            <h3 className="text-[0.65rem] uppercase tracking-[0.3em] text-muted mb-4">The Pacing</h3>
                            <p className="text-xl text-border-strong font-light leading-relaxed">
                                A deliberate rhythm. We cycle between high-intensity cultural immersion and profound, mandatory stillness.
                            </p>
                        </div>

                        <div className="relative border-l border-border-subtle pl-8 md:pl-16 space-y-48 pb-32 z-30">
                            {itinerary.map((day, i) => (
                                <motion.div
                                    key={day.day}
                                    onViewportEnter={() => setActiveImage(day.image)}
                                    viewport={{ margin: "-50% 0px -50% 0px" }}
                                    className="relative"
                                >
                                    {/* Static indicator dot */}
                                    <div className="absolute top-2 -left-[33px] md:-left-[65px] w-[2px] h-[2px] rounded-full bg-foreground ring-4 ring-background" />
                                    
                                    <p className="text-[0.6rem] uppercase tracking-[0.3em] text-border-strong mb-4">Day {day.day}</p>
                                    <h4 className="font-hero text-3xl md:text-4xl text-foreground mb-8 leading-[1]">{day.title}</h4>
                                    <p className="text-muted text-lg font-light leading-relaxed">
                                        {day.description}
                                    </p>

                                    {/* Fallback image for mobile/tablet */}
                                    <div className="mt-12 block lg:hidden w-full aspect-[4/3] relative overflow-hidden">
                                        <Image
                                            src={day.image}
                                            alt={`Day ${day.day} highlight`}
                                            fill
                                            className="object-cover grayscale-[10%]"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* █ What's Included & Logistics █ */}
            <section className="py-32 px-6 md:px-12 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
                <div>
                    <h3 className="font-hero text-4xl mb-12">The Provisions</h3>
                    {included.length > 0 ? (
                        <ul className="space-y-6">
                            {included.map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <span className="text-foreground mt-1">✓</span>
                                    <span className="text-border-strong font-light text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted italic">Inclusions are entirely customary.</p>
                    )}
                </div>
                <div>
                    <h3 className="font-hero text-4xl mb-12">The Clarifications</h3>
                    {faq.length > 0 ? (
                        <div className="space-y-12">
                            {faq.map((item, i) => (
                                <div key={i}>
                                    <h4 className="font-hero text-2xl text-foreground mb-4">{item.question}</h4>
                                    <p className="text-border-strong font-light leading-relaxed">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted italic">Ask us anything.</p>
                    )}
                </div>
            </section>

            {/* █ The Gallery █ */}
            <section className="py-24 max-w-[1600px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.map((img, i) => (
                        <div key={i} className="aspect-[4/5] relative overflow-hidden group">
                            <Image
                                src={img}
                                alt={`Gallery image ${i}`}
                                fill
                                className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* █ Global Sticky Bottom Conversion Bar █ */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto min-w-[320px]"
            >
                <div className="flex items-center justify-between bg-foreground/90 backdrop-blur-md rounded-full shadow-[var(--shadow-harsh)] p-2 pl-6 md:pl-8 border border-border-subtle">
                    <div className="flex flex-col mr-8 md:mr-16">
                        <span className="text-[0.55rem] uppercase tracking-[0.2em] text-background opacity-70 mb-1">Investment</span>
                        <span className="text-background font-medium tracking-tight">Starting from ${trip.price.toLocaleString()}</span>
                    </div>

                    <Link href="/booking" className="group active-scale">
                        <div className="bg-background text-foreground rounded-full px-6 md:px-8 py-3 md:py-4 flex items-center justify-center transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-[1.03]">
                            <span className="text-[0.65rem] uppercase tracking-[0.2em] font-medium mr-3">Book Now</span>
                            <div className="w-[1px] h-3 bg-foreground/30 mr-3" />
                            <span className="text-[0.65rem] uppercase tracking-[0.2em] font-medium opacity-50">→</span >
                        </div>
                    </Link>
                </div>
            </motion.div>
            
            <div className="bg-background">
                <Footer />
            </div>
        </main>
    );
}
