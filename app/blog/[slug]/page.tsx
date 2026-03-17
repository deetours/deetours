"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { OWNER, JOURNAL_POSTS } from "@/lib/constants";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";

export default function JournalDetailPage() {
    const params = useParams();
    const post = JOURNAL_POSTS.find((p) => p.slug === params.slug);

    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="font-hero text-4xl mb-6">Essay not found.</h1>
                    <Link href="/blog">
                        <span className="text-accent-luxury hover:underline">Return to Journal</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background relative selection:bg-accent-luxury selection:text-white">
            <Navigation />

            {/* Cinematic Hero */}
            <section className="relative h-[80vh] w-full overflow-hidden bg-primary-dark">
                <motion.div style={{ opacity, scale }} className="absolute inset-0 w-full h-full">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </motion.div>

                {/* Contrast Scrims */}
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent z-10" />
                <div className="noise z-20" />

                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white p-6 md:p-12 mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-6 mb-8"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-accent-luxury">{post.category}</span>
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">{post.readTime}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="font-hero text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] tracking-tighter text-center max-w-5xl text-balance"
                    >
                        {post.title}
                    </motion.h1>
                </div>
            </section>

            {/* Reading Experience */}
            <section className="relative z-30 -mt-20 px-6">
                <div className="max-w-3xl mx-auto bg-background p-8 md:p-20 shadow-2xl relative">
                    <div className="noise opacity-20" />

                    <div className="flex flex-wrap items-center justify-between gap-8 mb-16 pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary-dark">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Written By</p>
                                <p className="text-sm font-medium text-primary-dark">{post.author}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Published</p>
                                <p className="text-sm font-medium text-primary-dark">{post.date}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="prose prose-lg prose-gray max-w-none 
                        prose-headings:font-hero prose-headings:text-primary-dark prose-headings:tracking-tighter
                        prose-p:text-gray-600 prose-p:font-light prose-p:leading-relaxed prose-p:mb-8
                        prose-blockquote:border-accent-luxury prose-blockquote:text-2xl prose-blockquote:font-hero prose-blockquote:italic prose-blockquote:text-primary-dark prose-blockquote:font-light
                        "
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col items-center">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-8">End of Essay</p>
                        <Link href="/blog">
                            <button className="group flex items-center gap-3 text-primary-dark hover:text-accent-luxury transition-colors duration-300">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-500" />
                                <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Return to Journal</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* More Essays Bottom Bar */}
            <section className="py-32 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-16 text-center">Continue Reading</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {JOURNAL_POSTS.filter(p => p.slug !== post.slug).slice(0, 2).map((p) => (
                            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                                <div className="relative aspect-[16/9] overflow-hidden mb-6">
                                    <Image
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                </div>
                                <h4 className="font-hero text-2xl group-hover:text-accent-luxury transition-colors">{p.title}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
