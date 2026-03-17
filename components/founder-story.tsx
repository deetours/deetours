"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function FounderStory() {
    return (
        <section className="py-24 md:py-[120px] bg-background">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    <div className="lg:col-span-5 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className="font-hero text-4xl md:text-5xl text-primary-dark mb-8">
                                Designed with Intention
                            </h2>
                            <div className="space-y-6 text-gray-600">
                                <p>
                                    DeeTours is a women-led travel experience studio born from the desire to travel differently. We wanted journeys that offered profound connection without sacrificing safety and comfort.
                                </p>
                                <p>
                                    As an independent studio, we personally curate every itinerary. From ensuring secure accommodations for solo female travelers to finding off-the-grid spiritual retreats, our approach is deeply empathetic.
                                </p>
                                <p className="font-medium text-primary-dark pt-4">
                                    Sarah Jenkins &middot; Founder
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop"
                                alt="Founder looking at ocean"
                                fill
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                className="object-cover"
                            />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
