"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";

export function CTA() {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-gray-200 to-transparent" />

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-accent-luxury uppercase tracking-widest font-semibold text-sm mb-6 block">
                        Your Journey Awaits
                    </span>
                    <h2 className="font-hero text-5xl md:text-6xl text-primary-dark mb-10 leading-tight">
                        Ready to explore?
                    </h2>
                    <Link href="/booking">
                        <Button size="lg" variant="primary" className="text-lg px-12 py-6 rounded-sm shadow-xl hover:shadow-2xl transition-all">
                            Plan My Trip
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
