"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { OWNER, JOURNAL_POSTS } from "@/lib/constants";

export default function JournalPage() {
    const featured = JOURNAL_POSTS[0];
    const remaining = JOURNAL_POSTS.slice(1);

    return (
        <main className="min-h-screen bg-background text-foreground relative selection:bg-foreground selection:text-background">
            <Navigation />

            <div className="noise mix-blend-overlay opacity-20 pointer-events-none fixed inset-0 z-0" />

            {/* Header */}
            <section className="pt-48 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-border-subtle relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[0.65rem] uppercase tracking-[0.4em] text-muted mb-12"
                >
                    Field Notes & Essays
                </motion.p>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-hero text-[clamp(4.5rem,10vw,12rem)] leading-[0.85] tracking-tighter text-foreground max-w-4xl text-balance"
                    >
                        Notes on <br /><span className="italic text-muted font-light">Transformation.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-border-strong font-light max-w-sm text-right hidden md:block text-xl"
                    >
                        Personal essays and field notes by {OWNER.name}, written from the places that changed her.
                    </motion.p>
                </div>
            </section>

            {/* Featured Essay — Cinematic Bleed */}
            <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 relative z-10">
                <motion.article
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link href={`/blog/${featured.slug}`} className="group block">
                        <div className="relative w-full aspect-[21/9] overflow-hidden bg-surface-1 mb-16">
                            <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/0 transition-colors duration-[2s] ease-[0.16,1,0.3,1]" />
                            <Image
                                src={featured.image}
                                alt={featured.title}
                                fill
                                className="object-cover contrast-[1.1] grayscale-[10%] group-hover:scale-105 transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                                priority
                            />
                            <div className="absolute top-8 left-8 bg-background/80 backdrop-blur-md px-6 py-3 z-20">
                                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-foreground">Featured Record</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
                            <div className="md:col-span-3 lg:col-span-2">
                                <div className="flex flex-col gap-4 border-l border-border-subtle pl-6">
                                    <span className="text-[0.6rem] uppercase tracking-[0.3em] text-foreground">{featured.category}</span>
                                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">{featured.date}</span>
                                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">{featured.readTime}</span>
                                </div>
                            </div>
                            <div className="md:col-span-9 lg:col-span-10">
                                <h2 className="font-hero text-[clamp(2.5rem,5vw,5rem)] leading-none text-foreground mb-8 group-hover:italic transition-all duration-700 max-w-5xl tracking-tighter">
                                    {featured.title}
                                </h2>
                                <p className="text-xl md:text-2xl text-border-strong font-light leading-relaxed max-w-4xl">
                                    {featured.excerpt}
                                </p>
                            </div>
                        </div>
                    </Link>
                </motion.article>
            </section>

            {/* Remaining Essays — The Staggered Archives */}
            <section className="bg-surface-1 py-32 md:py-48 relative overflow-hidden border-t border-border-subtle z-10">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-32 md:space-y-48 relative z-10">
                    {remaining.map((post, i) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link href={`/blog/${post.slug}`} className={`group flex flex-col gap-12 lg:gap-24 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                                <div className="md:w-5/12">
                                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-background">
                                        <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/10 transition-colors duration-[2s] ease-[0.16,1,0.3,1]" />
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover contrast-[1.1] grayscale-[10%] group-hover:scale-105 transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                                        />
                                    </div>
                                </div>
                                <div className="md:w-7/12 flex flex-col justify-center">
                                    <div className="flex items-center gap-6 mb-8 mt-4 md:mt-0">
                                        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-foreground">{post.category}</span>
                                        <span className="w-1 h-1 rounded-full bg-border-subtle" />
                                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">{post.date}</span>
                                    </div>
                                    <h2 className="font-hero text-[clamp(2.5rem,4vw,4rem)] text-foreground leading-[0.9] mb-8 group-hover:italic transition-all duration-700 tracking-tighter max-w-2xl">
                                        {post.title}
                                    </h2>
                                    <p className="text-xl text-border-strong font-light leading-relaxed max-w-xl">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}

