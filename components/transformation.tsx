"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const WORDS = ["See", "Feel", "Live", "Know", "Become"];

export function Transformation() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.65, 0.65, 0.3]);
    const headlineY = useTransform(scrollYProgress, [0.1, 0.5], ["60px", "0px"]);
    const headlineOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
    const subY = useTransform(scrollYProgress, [0.25, 0.55], ["40px", "0px"]);
    const subOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);

    return (
        <section
            ref={containerRef}
            className="relative h-[100vh] w-full overflow-hidden bg-primary-dark flex items-center justify-center"
        >
            {/* Pinned Cinematic Background */}
            <motion.div
                style={{ scale: imageScale, opacity: imageOpacity }}
                className="absolute inset-0 w-full h-full"
            >
                <Image
                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2674&auto=format&fit=crop"
                    alt="Transformation"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* Deep gradient layers for cinematic contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/40 to-primary-dark/80" />
            <div className="noise absolute inset-0" />

            {/* Core Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">

                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[10px] uppercase tracking-[0.5em] text-accent-luxury mb-10"
                >
                    The Promise
                </motion.p>

                {/* The Headline — Monument Typography */}
                <motion.div
                    style={{ y: headlineY, opacity: headlineOpacity }}
                    className="flex flex-col items-center gap-0"
                >
                    <h2 className="font-hero text-white leading-[0.85] tracking-tighter text-balance"
                        style={{ fontSize: "clamp(4.5rem, 14vw, 13rem)" }}>
                        Return
                    </h2>
                    <h2
                        className="font-hero italic font-light text-accent-luxury leading-[0.85] tracking-tighter text-balance"
                        style={{ fontSize: "clamp(4.5rem, 14vw, 13rem)" }}
                    >
                        Changed.
                    </h2>
                </motion.div>

                {/* Rule */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-24 h-px bg-accent-luxury/40 my-10 origin-center"
                />

                {/* Body — The Philosophy */}
                <motion.p
                    style={{ y: subY, opacity: subOpacity }}
                    className="text-lg md:text-xl text-white/60 font-light leading-loose max-w-xl tracking-wide"
                >
                    The best journeys don&apos;t simply show you the world.<br />
                    They quietly dismantle who you were before you left.
                </motion.p>

                {/* Animated Rolling Words */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex items-center gap-3 mt-12"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">You will</span>
                    <div className="overflow-hidden h-5 relative w-24">
                        <motion.div
                            animate={{ y: WORDS.map((_, i) => `-${i * 20}px`) }}
                            transition={{
                                duration: WORDS.length * 1.5,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "loop",
                            }}
                            className="flex flex-col"
                        >
                            {[...WORDS, WORDS[0]].map((word, i) => (
                                <span
                                    key={i}
                                    className="text-[10px] uppercase tracking-[0.3em] text-accent-luxury h-5 flex items-center"
                                >
                                    {word}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">differently</span>
                </motion.div>

            </div>
        </section>
    );
}

