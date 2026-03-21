"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const frictionPoints = [
    {
        num: "01",
        title: "The Illusion of Choice",
        desc: "Infinite browser tabs and contradictory reviews have stripped the soul from exploration. You are auditing spreadsheets instead of anticipating wonder."
    },
    {
        num: "02",
        title: "The Surface Level",
        desc: "Algorithmic travel funnels you into crowded, sterilized 'top 10' lists, preventing you from actually touching the pulse of a destination."
    },
    {
        num: "03",
        title: "The Silent Exhaustion",
        desc: "Managing logistics while traveling means you are never truly present. We remove the cognitive load so you can simply arrive."
    }
];

export function StoryBlock() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax background texture movement
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={containerRef} className="bg-background text-foreground relative w-full overflow-hidden border-t border-b border-border-subtle">
            {/* Ambient Background Noise */}
            <div className="absolute inset-0 noise mix-blend-overlay opacity-20 pointer-events-none z-0" />
            
            {/* Parallax Gradient Overlay */}
            <motion.div 
                style={{ y: yBg }} 
                className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_0%,var(--border-subtle)_0%,transparent_70%)]"
            />

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-48 relative z-10">
                <div className="flex flex-col mb-48 md:w-3/4 lg:w-3/5">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[0.6rem] uppercase tracking-[0.5em] text-muted mb-12"
                    >
                        The Friction
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        className="font-hero text-[clamp(4.5rem,8vw,7rem)] leading-[0.85] text-foreground tracking-tighter"
                    >
                        Modern travel is an exercise in <span className="italic text-muted font-light">exhaustion</span>.
                    </motion.h2>
                </div>

                <div className="relative w-full">
                    {frictionPoints.map((point, i) => (
                        <div key={i} className={`relative flex flex-col md:flex-row items-center justify-between mb-64 last:mb-0 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            
                            {/* The Numeric Marker (Massive & Faded) */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                                className={`absolute top-1/2 transform -translate-y-1/2 text-[clamp(18rem,35vw,30rem)] font-hero font-light italic text-surface-1 leading-none select-none pointer-events-none z-0 ${i % 2 === 0 ? 'left-[-5%] md:left-[-10%]' : 'right-[-5%] md:right-[-10%]'}`}
                            >
                                {point.num}
                            </motion.div>

                            {/* Blank Spacer for Alignment */}
                            <div className="hidden md:block w-1/2" />

                            {/* The Content */}
                            <div className="w-full md:w-1/2 z-10 md:px-16 perspective-1000">
                                <motion.div
                                    initial={{ opacity: 0, rotateY: i % 2 === 0 ? 15 : -15, z: -100 }}
                                    whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
                                    viewport={{ once: true, margin: "-20%" }}
                                    transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className={`flex flex-col ${i % 2 !== 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} bg-background/50 backdrop-blur-md p-8 md:p-12 border border-border-subtle/50 rounded-2xl`}
                                >
                                    <h3 className="font-hero text-[clamp(2.5rem,5vw,4rem)] text-foreground mb-8 leading-[0.9] tracking-tighter">
                                        {point.title}
                                    </h3>
                                    <div className={`w-16 h-[1px] bg-foreground/30 mb-8 ${i % 2 !== 0 ? 'ml-auto' : ''}`} />
                                    <p className="text-border-strong text-xl font-light leading-relaxed max-w-md">
                                        {point.desc}
                                    </p>
                                </motion.div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            
            {/* Cinematic Fade out at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        </section>
    );
}

