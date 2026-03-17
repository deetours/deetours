"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";

export function Hero() {
    const lineVariants = {
        hidden: { y: "150%" },
        visible: {
            y: 0,
            transition: { ease: [0.22, 1, 0.36, 1] as any, duration: 1.2 }
        }
    };

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-primary-dark">
            {/* Background Image with precise scrim overlay - NOT heavy black gradient */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-[1.05]"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2670&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
            <div className="noise z-20" />

            {/* Content */}
            <div className="relative z-30 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center mt-20">

                <div className="flex flex-col items-center gap-6">
                    {/* Staggered clipping text reveal */}
                    <h1 className="text-white font-hero text-[clamp(4rem,10vw,8rem)] leading-[0.9] tracking-tighter flex flex-col items-center">
                        <span className="overflow-hidden block pb-2">
                            <motion.span
                                variants={lineVariants}
                                initial="hidden"
                                animate="visible"
                                className="block"
                            >
                                Travel Beyond
                            </motion.span>
                        </span>
                        <span className="overflow-hidden block italic font-light text-[clamp(3.5rem,8vw,6.5rem)] text-accent-luxury pb-4">
                            <motion.span
                                variants={lineVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.15 }}
                                className="block"
                            >
                                The Destination
                            </motion.span>
                        </span>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-10 mt-4"
                    >
                        <p className="text-white/80 max-w-md text-lg font-light leading-relaxed">
                            We orchestrate highly curated, transformative global journeys for those who seek depth over breadth.
                        </p>

                        <Button size="lg" variant="luxury" onClick={() => window.location.href = '/trips'}>
                            Design Your Journey
                        </Button>
                    </motion.div>
                </div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center text-white/50"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] mb-4">Discover</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
            </motion.div>
        </section>
    );
}
