"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

export function RealTestimonials() {
    return (
        <section className="py-32 md:py-48 bg-surface-1 border-y border-border-subtle relative overflow-hidden z-10">
            {/* Background Noise */}
            <div className="noise mix-blend-overlay opacity-[0.03] pointer-events-none absolute inset-0 z-0" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-24"
                >
                    <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted mb-8">Traveler Records</p>
                    <h2 className="font-hero text-[clamp(3.5rem,7vw,6rem)] leading-[0.9] tracking-tighter text-foreground max-w-4xl text-balance">
                        The artifacts of <br className="hidden md:block"/>
                        <span className="italic font-light text-muted">transformation.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    {TESTIMONIALS.map((testimonial, i) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col h-full border border-border-subtle bg-background p-8 md:p-12 hover:border-foreground transition-colors duration-700 relative group"
                        >
                            {/* Quote mark decorative */}
                            <span className="absolute top-8 right-8 text-6xl text-border-subtle font-hero leading-none opacity-50 group-hover:opacity-100 group-hover:text-border-strong transition-all duration-700">"</span>
                            
                            <div className="flex-1">
                                <p className="text-xl md:text-2xl text-foreground font-light leading-relaxed mb-12">
                                    "{testimonial.content}"
                                </p>
                            </div>
                            <div>
                                <h4 className="font-hero text-2xl text-foreground mb-1">{testimonial.name}</h4>
                                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
