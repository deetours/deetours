"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";

export function Categories() {
    return (
        <section className="bg-primary-dark w-full overflow-hidden text-white py-[clamp(6rem,12vw,10rem)] relative">
            <div className="noise" />
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-6"
                        >
                            Curated Collections
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="font-hero text-section leading-[1.1] max-w-2xl"
                        >
                            Journeys designed for specific states of being.
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                    {CATEGORIES.map((category, index) => (
                        <Link key={category.id} href={`/trips?category=${category.id}`} className="group relative block w-full overflow-hidden aspect-[3/4]">
                            <motion.div
                                initial={{ opacity: 0, scale: 1.05 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={category.imageUrl}
                                    alt={category.title}
                                    fill
                                    className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />

                                {/* Edge-to-edge subtle gradient for text readability without boxing */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-1000" />

                                <div className="absolute bottom-0 left-0 p-8 w-full z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]">
                                    <h3 className="font-hero text-3xl md:text-4xl mb-3 text-white">
                                        {category.title}
                                    </h3>
                                    <p className="text-gray-300 font-light text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                        {category.description}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}

