"use client";

import { motion } from "framer-motion";

export function TrustMetrics() {
    const metrics = [
        { value: "200+", label: "Journeys Curated" },
        { value: "6", label: "Continents Explored" },
        { value: "4.9★", label: "Average Rating" }
    ];

    return (
        <section className="bg-foreground text-background py-24 md:py-32 relative z-10">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-background/20 text-center">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="pt-16 md:pt-0 first:pt-0"
                        >
                            <h3 className="font-hero text-6xl md:text-7xl lg:text-8xl tracking-tighter mb-4 text-background">{metric.value}</h3>
                            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-background/70 font-medium">{metric.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
