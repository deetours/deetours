"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { OWNER } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function StudioPage() {
    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const values = [
        { number: "01", title: "Radical Curation", body: "We do not offer 500 packages. We offer a handful of masterpieces. Every journey is chosen because we have deeply researched, personally visited, or meticulously vetted each element within it." },
        { number: "02", title: "Safety as Luxury", body: "For the modern woman traveler, the greatest luxury is feeling completely safe. Our on-ground network in every destination operates quietly, around the clock, ensuring physical and emotional security without feeling like surveillance." },
        { number: "03", title: "Invisible Logistics", body: "The interface should disappear so the experience remains. We handle every permit, transfer, reservation, and contingency in advance. You should feel like the world is perfectly arranged around you." },
        { number: "04", title: "Transformation as Goal", body: "We are not building itineraries. We are architecting life-altering chapters. Every journey should leave you changed—expanded, grounded, and more deeply yourself." },
    ];

    return (
        <main className="min-h-screen bg-background relative selection:bg-accent-luxury selection:text-white">
            <Navigation />

            {/* Full-Bleed Cinematic Hero */}
            <section className="relative h-screen w-full overflow-hidden bg-primary-dark">
                <motion.div style={{ y: yParallax }} className="absolute inset-0 w-full h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1498307833015-e7b411130613?q=80&w=2609&auto=format&fit=crop"
                        alt="The Studio"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                </motion.div>
                <div className="noise" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/30 to-transparent z-10" />
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />

                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white p-6 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-8"
                    >
                        Founded by {OWNER.name}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="font-hero text-[clamp(3.5rem,9vw,8rem)] leading-[0.9] tracking-tighter max-w-5xl text-balance"
                    >
                        We design journeys that <span className="italic text-accent-luxury font-light">change you.</span>
                    </motion.h1>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 z-10 flex flex-col items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-px h-12 bg-white/20"
                    />
                </div>
            </section>

            {/* Origin Story — Deepa Murali */}
            <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-[clamp(8rem,15vw,12rem)] grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <Image
                        src="https://images.unsplash.com/photo-1531123897727-8f129e1eb4ce?q=80&w=1287&auto=format&fit=crop"
                        alt={OWNER.name}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary-dark/80 to-transparent">
                        <p className="text-white font-hero text-2xl">{OWNER.name}</p>
                        <p className="text-accent-luxury text-[10px] tracking-[0.2em] uppercase mt-1">{OWNER.tagline}</p>
                    </div>
                </div>

                <div className="lg:col-span-7 flex flex-col gap-10">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8">The Origin</p>
                        <h2 className="font-hero text-[clamp(2rem,4vw,3.5rem)] leading-tight text-primary-dark text-balance mb-8">
                            Born from a personal search for travel that felt <span className="italic text-gray-500">truly safe and truly free.</span>
                        </h2>
                    </div>
                    <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                        <p>
                            {OWNER.name} founded DeeTours after years of experiencing travel that promised transformation but delivered exhaustion. As a solo woman traveler navigating the world, she encountered a fundamental contradiction: the most beautiful destinations were often the hardest to access safely, and the safest options surrendered all beauty.
                        </p>
                        <p>
                            She built DeeTours as the answer — a studio that applies the same ruthless editorial eye to travel as a great maison applies to fashion. Nothing that doesn't belong. Nothing that doesn't serve the experience. Only the essential, the meaningful, and the breathtaking.
                        </p>
                        <p>
                            Today, DeeTours has curated journeys for hundreds of women across 30+ countries, with a singular philosophy: <strong className="text-primary-dark font-medium">the world belongs to those who are prepared to meet it on its own terms.</strong>
                        </p>
                    </div>
                    <div className="flex items-center gap-4 pt-4">
                        <Link href="/contact">
                            <Button size="lg" variant="outline">
                                Begin a Conversation <ArrowRight className="w-4 h-4 ml-2 inline" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* The Values — Editorial Numbered Layout */}
            <section className="bg-primary-dark text-white py-[clamp(8rem,15vw,12rem)] relative overflow-hidden">
                <div className="noise" />
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-24">The Philosophy</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="border-t border-gray-800 pt-10"
                            >
                                <span className="font-hero text-6xl text-gray-800 block mb-6">{v.number}</span>
                                <h3 className="font-hero text-3xl mb-6">{v.title}</h3>
                                <p className="text-gray-400 font-light leading-relaxed text-lg">{v.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats/Trust Bar */}
            <section className="py-24 border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { stat: "500+", label: "Women Journeys Curated" },
                        { stat: "30+", label: "Countries Explored" },
                        { stat: "100%", label: "Safety Record" },
                        { stat: "4.9★", label: "Average Experience Rating" },
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center"
                        >
                            <p className="font-hero text-5xl md:text-6xl text-primary-dark mb-3">{item.stat}</p>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">{item.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 text-center max-w-2xl mx-auto px-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8">Ready?</p>
                <h2 className="font-hero text-[clamp(2.5rem,6vw,5rem)] text-primary-dark leading-tight mb-12 text-balance">
                    Let {OWNER.name} design your next chapter.
                </h2>
                <Link href="/contact">
                    <Button size="lg">
                        Request a Consultation
                    </Button>
                </Link>
                <div className="mt-8">
                    <a href={`tel:${OWNER.phone}`} className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-primary-dark transition-colors">
                        Or call directly: {OWNER.phone}
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
