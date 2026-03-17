"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function StoryBlock() {
    return (
        <section className="bg-background relative py-[clamp(8rem,15vw,12rem)] w-full overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center">

                    {/* Narrative Text */}
                    <div className="relative z-10">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-8"
                        >
                            The Paradigm Shift
                        </motion.p>

                        <h2 className="font-hero text-section leading-[1.1] text-primary-dark mb-12 text-balance">
                            Modern travel has become an exercise in <span className="italic text-gray-500">exhaustion</span>. We built DeeTours to restore the magic.
                        </h2>

                        <div className="space-y-8 text-lg text-gray-600 font-light leading-relaxed max-w-xl">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                Endless tabs, conflicting reviews, and logistical anxiety have stripped the soul from exploration. As a women-led studio, we approach travel intimately—like crafting a film where you are the protagonist.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                We handle the immaculate details behind the curtain so that your only responsibility is to simply arrive and be transformed.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-16 pt-8 border-t border-gray-200 inline-block"
                        >
                            <p className="font-hero text-2xl italic">Elena Voss</p>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">Founder & Lead Architect</p>
                        </motion.div>
                    </div>

                    {/* Abstract / Immersive Imagery */}
                    <div className="relative h-[80vh] w-full bg-gray-100 overflow-hidden group">
                        <motion.div
                            initial={{ scale: 1.1 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full h-full relative"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop"
                                alt="Exploration concept"
                                fill
                                className="object-cover transition-transform duration-[2s] group-hover:scale-[1.03]"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
