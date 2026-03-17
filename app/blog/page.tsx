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
        <main className="min-h-screen bg-background relative selection:bg-accent-luxury selection:text-white">
            <Navigation />

            {/* Header */}
            <section className="pt-48 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto border-b border-gray-100">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8"
                >
                    Field Notes & Essays
                </motion.p>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-hero text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tighter text-primary-dark max-w-3xl text-balance"
                    >
                        Notes on <br /><span className="italic text-gray-400 font-light">Transformation</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-gray-400 font-light max-w-xs text-right hidden md:block"
                    >
                        Personal essays and field notes by {OWNER.name}, written from the places that changed her.
                    </motion.p>
                </div>
            </section>

            {/* Featured Essay — Full Bleed */}
            <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
                <motion.article
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Link href={`/blog/${featured.slug}`} className="group block">
                        <div className="relative w-full aspect-[21/9] overflow-hidden bg-gray-100 mb-12">
                            <Image
                                src={featured.image}
                                alt={featured.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                                priority
                            />
                            <div className="absolute top-6 left-6 bg-primary-dark/80 backdrop-blur-sm px-4 py-2">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-accent-luxury">Featured Essay</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            <div className="md:col-span-2">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent-luxury">{featured.category}</span>
                                    <span className="text-[10px] text-gray-400">{featured.date}</span>
                                    <span className="text-[10px] text-gray-400">{featured.readTime}</span>
                                </div>
                            </div>
                            <div className="md:col-span-10">
                                <h2 className="font-hero text-5xl md:text-6xl text-primary-dark leading-tight mb-6 group-hover:text-accent-luxury transition-colors duration-500">
                                    {featured.title}
                                </h2>
                                <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl">
                                    {featured.excerpt}
                                </p>
                                <div className="mt-8 flex items-center gap-3">
                                    <span className="text-sm text-gray-400">By</span>
                                    <span className="text-sm font-medium text-primary-dark">{featured.author}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.article>
            </section>

            {/* Divider */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 border-t border-gray-100" />

            {/* Remaining Essays */}
            <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 space-y-24">
                {remaining.map((post, i) => (
                    <motion.article
                        key={post.slug}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Link href={`/blog/${post.slug}`} className={`group flex flex-col gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                            <div className="md:w-1/2">
                                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    />
                                </div>
                            </div>
                            <div className="md:w-1/2 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent-luxury">{post.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <span className="text-[10px] text-gray-400">{post.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <span className="text-[10px] text-gray-400">{post.readTime}</span>
                                </div>
                                <h2 className="font-hero text-4xl md:text-5xl text-primary-dark leading-tight mb-6 group-hover:text-accent-luxury transition-colors duration-500">
                                    {post.title}
                                </h2>
                                <p className="text-lg text-gray-500 font-light leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </section>

            {/* Subscribe CTA */}
            <section className="bg-primary-dark py-32 text-center relative overflow-hidden">
                <div className="noise" />
                <div className="relative z-10 max-w-xl mx-auto px-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-8">The Weekly Letter</p>
                    <h2 className="font-hero text-4xl md:text-5xl text-white mb-6 text-balance">
                        Receive essays from the road, personally from {OWNER.name}.
                    </h2>
                    <p className="text-gray-400 font-light mb-12">No newsletters. No promotions. Just writing worth reading.</p>
                    <div className="flex gap-0 max-w-sm mx-auto">
                        <input
                            className="flex-1 bg-white/10 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/50 transition-colors"
                            placeholder="your@email.com"
                        />
                        <button className="bg-white text-primary-dark px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-accent-luxury hover:text-white transition-colors duration-300">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
