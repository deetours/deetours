"use client";

import { motion } from "framer-motion";

export function HowItWorks() {
    const steps = [
        {
            num: "01",
            title: "Provide Your Intent",
            desc: "Tell us where you want to go, or simply how you want to feel. We don't need dates, we need the emotional outcome.",
        },
        {
            num: "02",
            title: "The Architecture",
            desc: "We design a private dossier. No templated itineraries. Every hotel, guide, and transition is hand-picked for your specific psychology.",
        },
        {
            num: "03",
            title: "You Simply Arrive",
            desc: "All friction is eliminated. The logistics become invisible. Your only responsibility is to witness the landscape.",
        }
    ];

    return (
        <section className="py-32 md:py-48 relative overflow-hidden z-10 bg-background border-b border-border-subtle">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-24 md:text-center"
                >
                    <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted mb-8">The Process</p>
                    <h2 className="font-hero text-[clamp(3.5rem,7vw,6rem)] leading-[0.9] tracking-tighter text-foreground text-balance">
                        The invisible <br className="hidden md:block"/>
                        <span className="italic font-light text-muted">machinery.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col"
                        >
                            <span className="font-hero text-[clamp(4rem,8vw,6rem)] text-border-subtle leading-none mb-8 opacity-50 block">{step.num}</span>
                            <h3 className="font-hero text-2xl md:text-3xl text-foreground mb-6 font-light">{step.title}</h3>
                            <p className="text-border-strong text-lg leading-relaxed font-light">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
