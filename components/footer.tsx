"use client";

import Link from "next/link";
import { OWNER } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-background text-foreground relative overflow-hidden flex flex-col justify-end min-h-[90vh] border-t border-border-strong transition-colors duration-500">
            <div className="noise mix-blend-overlay opacity-30 pointer-events-none absolute inset-0" />
            
            <div className="w-full flex-grow flex flex-col items-center justify-center relative z-10 px-6 mt-32">
                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-border-strong mb-12">
                    The Archive Is Open
                </p>
                
                <h2 className="font-hero text-[clamp(4rem,10vw,12rem)] leading-[0.85] tracking-tighter text-foreground text-center max-w-[90vw]">
                    The world is <br />
                    <span className="italic font-light text-muted">waiting.</span>
                </h2>

                <Link href="/booking" className="mt-20 group flex items-center gap-6 active-scale">
                    <span className="text-[0.7rem] uppercase tracking-[0.3em] text-foreground group-hover:text-border-strong transition-colors duration-500">
                        Begin the Dialogue
                    </span>
                    <div className="w-12 h-[1px] bg-border-subtle relative overflow-hidden">
                        <div className="absolute inset-0 bg-foreground -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-border-strong group-hover:text-foreground group-hover:translate-x-2 transition-all duration-700 ease-[0.16,1,0.3,1]" />
                </Link>
            </div>

            {/* Big Typographic Watermark */}
            <div className="w-full flex justify-center mt-32 overflow-hidden relative z-10 border-b border-border-subtle">
                <h1 className="font-hero text-[18vw] leading-[0.75] tracking-tighter text-border-subtle opacity-50 select-none text-center">
                    DeeTours
                </h1>
            </div>

            {/* Legal Bar */}
            <div className="w-full relative z-10 px-6 py-8 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[0.6rem] uppercase tracking-[0.2em] text-muted bg-background">
                <p>© {new Date().getFullYear()} DeeTours Studio. By {OWNER.name}.</p>
                <div className="flex gap-12">
                    <span>Bengaluru, India</span>
                    <a href="https://instagram.com/deetours.in" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors active-scale">Instagram</a>
                    <Link href="/booking" className="hover:text-foreground transition-colors active-scale">Contact</Link>
                </div>
            </div>
        </footer>
    );
}

