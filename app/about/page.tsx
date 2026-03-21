"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function WhyDeeToursPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <main ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background relative overflow-hidden transition-colors duration-500">
            <Navigation />

            {/* Ambient Background Noise */}
            <div className="absolute inset-0 noise z-0" />

            {/* Core WHY Sequence (Hero) */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16 px-6 md:px-12 z-10 border-b border-border-subtle">
                <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,var(--color-surface-1)_0%,transparent_60%)] opacity-30" />
                
                <div className="max-w-[1200px] w-full mx-auto text-center relative z-10 flex flex-col items-center">
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[0.6rem] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] text-muted mb-12 font-medium"
                    >
                        The Core Philosophy
                    </motion.p>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-hero text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] tracking-tighter text-foreground max-w-5xl text-balance"
                    >
                        We build DeeTours so you don’t have to fight <span className="italic font-light text-muted">confusion, risk, or doubt</span> to experience the world.
                    </motion.h1>
                    
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 96 }}
                        transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[1px] bg-gradient-to-b from-border-strong to-transparent mt-24"
                    />
                </div>
            </section>

            {/* Deep Human Problem */}
            <section className="py-32 md:py-48 px-6 md:px-12 relative z-10">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                    <div className="md:col-span-4 lg:col-span-5">
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1 }}
                            className="text-[0.6rem] md:text-xs uppercase tracking-[0.4em] text-muted sticky top-32 md:top-48 font-medium"
                        >
                            The Real Problem
                        </motion.p>
                    </div>
                    
                    <div className="md:col-span-8 lg:col-span-7 flex flex-col gap-12 md:gap-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="font-hero text-[clamp(2rem,4vw,4rem)] leading-[0.95] tracking-tight text-foreground"
                        >
                            The real problem is not planning a trip. It is <span className="italic font-light">decision fatigue, lack of trust,</span> and emotional uncertainty.
                        </motion.h2>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: 0.1 }}
                            className="text-muted text-lg md:text-xl font-light leading-relaxed max-w-2xl"
                        >
                            Travel today feels noisy, uncertain, and mentally exhausting. People don't just struggle with logistics. They struggle with who to trust. They wonder if what they see is what will actually happen. They wonder if they will feel comfortable.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="p-8 md:p-12 lg:p-16 border border-border-subtle bg-surface-1 transition-colors duration-500 rounded-none md:rounded-xl relative overflow-hidden group hover:border-border-strong"
                        >
                            <h3 className="font-hero text-2xl md:text-3xl mb-6 italic font-light text-foreground group-hover:scale-[1.02] transform transition-transform duration-700 origin-left">The Subconscious Toll</h3>
                            <p className="text-muted font-light text-base md:text-lg leading-relaxed">
                                People want to experience the world fully, but they are tired of carrying the burden of planning, verifying, worrying, and second-guessing every decision.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Audience Psychology / Trust Matrix */}
            <section className="py-32 md:py-48 bg-surface-1 border-y border-border-subtle px-6 md:px-12 relative z-10 transition-colors duration-500">
                <div className="max-w-[1400px] mx-auto">
                    <div className="mb-24 md:mb-32 text-center md:text-left">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1 }}
                            className="text-[0.6rem] md:text-xs uppercase tracking-[0.4em] text-muted mb-8 font-medium"
                        >
                            Psychological States
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="font-hero text-[clamp(2rem,5vw,4.5rem)] leading-[0.9] tracking-tight max-w-4xl text-foreground"
                        >
                            Different expressions of the exact same <span className="italic font-light text-muted">human need.</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border-subtle">
                        {[
                            { title: "The Seeker", desc: "Wants freedom and exploration. Fears unsafe situations and poor execution. Needs to feel completely physically and emotionally safe." },
                            { title: "The Achiever", desc: "Time-starved. Wants quality experiences. Fears wasting money and badly organized chaos. Needs to feel this is definitively worth their time." },
                            { title: "The Trust-Driven", desc: "Wants simplicity and reliability. Fears scams and lack of care. Needs to know they can trust the architects completely." },
                            { title: "The Spiritual Explorer", desc: "Wants depth and authenticity. Fears commercialized tourism. Needs to feel a profound, unbothered connection." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="bg-background p-10 md:p-16 hover:bg-surface-1 transition-colors duration-700 group flex flex-col justify-between min-h-[300px]"
                            >
                                <div>
                                    <h3 className="font-hero text-3xl md:text-4xl mb-6 tracking-tighter text-foreground group-hover:italic transition-all duration-500">{item.title}</h3>
                                    <div className="w-12 h-[1px] bg-border-strong mb-8 group-hover:w-24 transition-all duration-700" />
                                </div>
                                <p className="text-muted font-light leading-relaxed text-base md:text-lg max-w-sm">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-32 md:mt-48 text-center"
                    >
                        <h2 className="font-hero text-[clamp(2.5rem,6vw,6rem)] text-foreground leading-none mb-6 tracking-tighter drop-shadow-sm">
                            “I don’t have to worry anymore.”
                        </h2>
                        <p className="text-muted font-medium text-xs md:text-sm uppercase tracking-[0.4em]">The underlying truth.</p>
                    </motion.div>
                </div>
            </section>

            {/* The Transformation */}
            <section className="py-32 md:py-48 px-6 md:px-12 relative z-10 text-center flex flex-col items-center justify-center bg-background">
                <div className="max-w-[1200px] w-full mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                        className="text-[0.6rem] md:text-xs uppercase tracking-[0.4em] text-muted mb-16 md:mb-24 font-medium"
                    >
                        The Expected Transformation
                    </motion.p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex-1 md:text-right w-full"
                        >
                            <p className="text-muted font-hero text-[clamp(2rem,4vw,4rem)] italic font-light tracking-tighter opacity-50 line-through">
                                Overwhelmed & Uncertain
                            </p>
                        </motion.div>
                        
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border border-border-strong rounded-full shrink-0"
                        >
                            <span className="text-foreground text-xl md:text-2xl font-light">→</span>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex-1 md:text-left w-full"
                        >
                            <p className="text-foreground font-hero text-[clamp(2rem,4vw,4rem)] tracking-tighter">
                                Calm, Confident & Present
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Brand Beliefs / Axioms */}
            <section className="py-32 md:py-48 bg-surface-1 border-t border-border-subtle px-6 md:px-12 relative z-10 transition-colors duration-500">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                        <div className="lg:col-span-4">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="font-hero text-[clamp(3rem,5vw,5rem)] tracking-tighter leading-[0.9] sticky top-32 md:top-48 text-foreground"
                            >
                                Axioms of <br/><span className="italic font-light text-muted">Experience.</span>
                            </motion.h2>
                        </div>
                        <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-16 md:gap-24">
                            {[
                                { title: "Trust Over Variety", content: "People don’t want 100 options. They want 1 option they can rely on implicitly." },
                                { title: "Ease is a Premium", content: "The less mental load the traveler carries, the higher the perceived value. Friction destroys flow." },
                                { title: "Care Creates Loyalty", content: "People remember exactly how supported they felt, not just the details of where they went." },
                                { title: "Clarity Over Noise", content: "No overwhelming choices. Only methodically designed, profoundly meaningful experiences." }
                            ].map((axiom, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="border-b border-border-subtle pb-12 group"
                                >
                                    <h3 className="font-hero text-3xl md:text-5xl text-foreground mb-6 md:mb-8 tracking-tight group-hover:translate-x-2 transition-transform duration-500">{axiom.title}</h3>
                                    <p className="text-muted font-light text-lg md:text-xl leading-relaxed max-w-xl">{axiom.content}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

