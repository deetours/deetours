"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    return (
        <section className="py-24 md:py-[120px] bg-primary-dark text-white overflow-hidden text-center relative">
            {/* Background subtle visual */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
                <Quote className="w-16 h-16 text-accent-luxury mx-auto mb-10 opacity-50" />

                <div className="relative min-h-[300px] md:min-h-[250px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <p className="font-hero text-2xl md:text-4xl leading-relaxed text-center text-white/90 mb-10 text-balance">
                                "{TESTIMONIALS[currentIndex].content}"
                            </p>

                            <div className="flex items-center gap-4">
                                {TESTIMONIALS[currentIndex].avatarUrl && (
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent-luxury">
                                        <Image
                                            src={TESTIMONIALS[currentIndex].avatarUrl!}
                                            alt={TESTIMONIALS[currentIndex].name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg tracking-wide">{TESTIMONIALS[currentIndex].name}</h4>
                                    <p className="text-gray-400 text-sm">{TESTIMONIALS[currentIndex].role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-6 mt-16">
                    <button
                        onClick={handlePrev}
                        className="p-3 rounded-full border border-gray-700 hover:bg-white hover:text-primary-dark transition-colors"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        {TESTIMONIALS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-accent-luxury w-8" : "bg-gray-600 hover:bg-gray-400"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        className="p-3 rounded-full border border-gray-700 hover:bg-white hover:text-primary-dark transition-colors"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </section>
    );
}
