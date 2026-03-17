"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ProblemStatement() {
    return (
        <section className="py-24 md:py-[120px] bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Left Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative h-[600px] w-full rounded-sm overflow-hidden"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80&w=2716&auto=format&fit=crop"
                            alt="Overwhelmed traveler looking at map"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Right Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <span className="text-accent-adventure uppercase tracking-widest font-semibold text-sm mb-6">
                            The Reality of Travel
                        </span>
                        <h2 className="font-hero text-4xl md:text-5xl text-primary-dark leading-[1.1] mb-8">
                            Travel planning today is broken.
                        </h2>

                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                            <p>
                                The modern traveler faces a sea of information overload, unreliable operators, and stressful logistics.
                                What should be an exciting journey often turns into an overwhelming task of coordination and a fundamental lack of trust.
                            </p>
                            <p>
                                <strong>You spend hours comparing itineraries</strong>, worrying about hidden costs, and hoping the experience matches the glossy brochures.
                            </p>
                            <p className="text-xl font-medium text-primary-dark border-l-2 border-accent-luxury pl-6 italic">
                                "We believe exploration should bring curiosity and excitement, not anxiety."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
