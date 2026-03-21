"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Trash2 } from "lucide-react";

export default function TestimonialsManager() {
    const testimonials = useQuery(api.testimonials.getTestimonials);

    return (
        <div className="p-8 md:p-12 max-w-[1400px] mx-auto min-h-screen">
            <header className="mb-12">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-hero text-4xl md:text-5xl tracking-tighter"
                >
                    Testimonials
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-muted mt-2"
                >
                    Manage social proof and traveler stories.
                </motion.p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {!testimonials ? (
                    <div className="col-span-full py-12 text-center text-muted font-light">Loading testimonials...</div>
                ) : testimonials.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-muted font-light">No testimonials available.</div>
                ) : (
                    testimonials.map((testimonial) => (
                        <div key={testimonial._id} className="bg-surface-1 border border-border-subtle p-8 rounded-2xl relative group">
                            <p className="text-foreground italic mb-6 leading-relaxed">"{testimonial.content}"</p>
                            <div>
                                <h4 className="font-medium text-sm text-foreground">{testimonial.name}</h4>
                                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted mt-1">{testimonial.role}</p>
                            </div>

                            <button className="absolute top-6 right-6 p-2 bg-background border border-border-subtle rounded text-muted hover:text-red-500 hover:border-red-500/50 transition-colors opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
