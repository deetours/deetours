"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function Testimonials() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacityText = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 1, 0]);

    return (
        <section 
            ref={sectionRef}
            className="relative h-[120vh] w-full bg-surface-1 overflow-hidden flex items-center justify-center"
        >
            {/* Massive 100% Viewport Width Background Image (Parallax/Fixed effect) */}
            <motion.div 
                style={{ y: yBackground }}
                className="absolute inset-0 w-full h-[140%] -top-[20%]"
            >
                <Image
                    src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop" // Abstract/Founder aesthetic image
                    alt="The Curator"
                    fill
                    className="object-cover grayscale mix-blend-luminosity opacity-40"
                    sizes="100vw"
                />
            </motion.div>

            {/* Deep atmospheric gradients to push the image back */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="noise absolute inset-0 mix-blend-overlay opacity-30" />

            {/* The Trust Quote Typography layered perfectly over the darkest part */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[0.65rem] uppercase tracking-[0.3em] text-[#FAFAFA] opacity-60 mb-12"
                >
                    The Philosophy
                </motion.p>

                {/* Massive 8vw font size */}
                <motion.div
                    // Try to tie opacity to exactly when it crosses the center, but whileInView is safer for mobile
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    <h2 className="font-hero text-[clamp(2.5rem,8vw,8rem)] text-[#FAFAFA] leading-[1] tracking-tighter mb-4 text-balance max-w-5xl">
                        "Your only responsibility <br/>
                        is to simply <span className="italic font-light text-[#E5E5E5] mix-blend-screen opacity-90">arrive</span>."
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-20 flex flex-col items-center"
                >
                    <div className="w-[1px] h-16 bg-[#FAFAFA] opacity-30 mb-8" />
                    <p className="font-hero text-2xl md:text-3xl text-[#FAFAFA] italic">Deepa</p>
                    <p className="text-[0.55rem] uppercase tracking-[0.3em] text-[#FAFAFA] opacity-50 mt-4">Founder & Experience Curator</p>
                </motion.div>
            </div>
        </section>
    );
}

