"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { OWNER, JOURNAL_POSTS } from "@/lib/constants";
import { ArrowLeft, User } from "lucide-react";

export default function JournalDetailPage() {
    const params = useParams();
    const post = JOURNAL_POSTS.find((p) => p.slug === params.slug);

    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
    const yText = useTransform(scrollYProgress, [0, 0.4], ["0%", "50%"]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <h1 className="font-hero text-4xl mb-6">Record missing.</h1>
                    <Link href="/blog">
                        <span className="text-border-strong hover:text-foreground transition-colors uppercase tracking-[0.2em] text-[0.6rem]">Return to Archives</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground relative selection:bg-foreground selection:text-background">
            <Navigation />

            {/* Cinematic Hero - ALWAYS DARK FOR PHOTO PARITY */}
            <section className="relative h-[90vh] w-full overflow-hidden bg-[#111111]">
                <motion.div style={{ opacity, scale }} className="absolute inset-0 w-full h-[120%] origin-center">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover opacity-50 grayscale-[20%] contrast-[1.2]"
                        priority
                    />
                </motion.div>

                {/* Strict Dark Scrims */}
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0A0A0A]/90 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10" />
                <div className="noise mix-blend-overlay opacity-30 z-20 pointer-events-none absolute inset-0" />

                <div className="absolute inset-0 flex flex-col items-center justify-end z-30 p-6 md:p-12 pb-32">
                    <motion.div
                        style={{ y: yText }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-5xl"
                    >
                        <div className="flex items-center gap-6 mb-8 justify-center">
                            <span className="text-[0.6rem] uppercase tracking-[0.4em] text-[#FAFAFA] opacity-80">{post.category}</span>
                            <span className="w-1 h-1 rounded-full bg-[#FAFAFA]" />
                            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#A3A3A3]">{post.readTime}</span>
                        </div>

                        <h1 className="font-hero text-[clamp(2.5rem,7vw,7rem)] leading-[0.85] tracking-tighter text-center text-balance text-[#FAFAFA]" style={{ fontWeight: 300 }}>
                            {post.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Reading Experience */}
            <section className="relative z-30 px-6 mt-16 md:mt-32">
                <div className="max-w-[800px] mx-auto">
                    <div className="flex flex-wrap items-center justify-between gap-8 mb-24 pb-12 border-b border-border-subtle">
                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted mb-1">Authored By</p>
                                <p className="text-sm font-medium text-foreground">{post.author}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div>
                                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted mb-1">Published</p>
                                <p className="text-sm font-medium text-foreground">{post.date}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="prose prose-lg dark:prose-invert max-w-none 
                        prose-headings:font-hero prose-headings:text-foreground prose-headings:tracking-tighter prose-headings:font-normal
                        prose-p:text-border-strong prose-p:font-light prose-p:leading-[1.8] prose-p:mb-10 prose-p:text-xl
                        prose-blockquote:border-l-4 prose-blockquote:border-border-subtle prose-blockquote:pl-8 prose-blockquote:my-16 prose-blockquote:text-[clamp(1.5rem,3vw,2.5rem)] prose-blockquote:font-hero prose-blockquote:italic prose-blockquote:text-foreground prose-blockquote:font-normal prose-blockquote:leading-tight
                        prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-muted prose-a:transition-colors
                        "
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-32 pt-16 border-t border-border-subtle flex flex-col items-center">
                        <Link href="/blog">
                            <button className="group flex items-center gap-4 text-muted hover:text-foreground transition-colors duration-500">
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                                <span className="text-[0.6rem] uppercase tracking-[0.3em] font-medium">Return to The Archive</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* More Essays Bottom Bar */}
            <section className="py-48 px-6 border-t border-border-subtle mt-32 bg-surface-1">
                <div className="max-w-[1600px] mx-auto">
                    <h3 className="text-[0.65rem] uppercase tracking-[0.4em] text-muted mb-24 hidden md:block">Connected Records</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
                        {JOURNAL_POSTS.filter(p => p.slug !== post.slug).slice(0, 2).map((p) => (
                            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                                <div className="relative aspect-[16/9] overflow-hidden mb-8 bg-background">
                                    <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/10 transition-colors duration-[2s] ease-[0.16,1,0.3,1]" />
                                    <Image
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        className="object-cover contrast-[1.1] grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    />
                                </div>
                                <h4 className="font-hero text-[clamp(2rem,3vw,3rem)] tracking-tighter text-border-strong group-hover:text-foreground group-hover:italic transition-all duration-700 leading-none">{p.title}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
