"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isHeroPage = pathname === "/" || pathname === "/about" || (pathname.startsWith("/trips/") && pathname !== "/trips") || (pathname.startsWith("/blog/") && pathname !== "/blog");

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const transparentMode = isHeroPage && !isScrolled && !mobileMenuOpen;

    const links = [
        { label: "Journeys", href: "/trips" },
        { label: "Journal", href: "/blog" },
        { label: "Studio", href: "/about" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ ease: [0.22, 1, 0.36, 1], duration: 1 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-colors duration-500 px-6 md:px-12 py-8",
                    transparentMode ? "bg-transparent text-white" : "bg-background/80 backdrop-blur-xl text-primary-dark"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center">
                    {/* Left Column: Logo */}
                    <div className="flex-1 flex justify-start">
                        <Link href="/" className="flex flex-col group">
                            <span
                                className={cn(
                                    "font-hero text-2xl tracking-tighter leading-none transition-colors duration-500",
                                    transparentMode ? "text-white" : "text-primary-dark"
                                )}
                            >
                                DeeTours
                            </span>
                        </Link>
                    </div>

                    {/* Center Column: Links */}
                    <div className="hidden md:flex items-center space-x-12">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:opacity-50",
                                    pathname === link.href && !transparentMode ? "text-accent-luxury" : ""
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Column: Sanctuary + Mobile Trigger */}
                    <div className="flex-1 flex justify-end items-center gap-8">
                        <Link
                            href="/dashboard"
                            className={cn(
                                "hidden md:block text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:opacity-50",
                                pathname === "/dashboard" && !transparentMode ? "text-accent-luxury" : ""
                            )}
                        >
                            Sanctuary
                        </Link>

                        <button
                            className="md:hidden p-2"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Full Screen Cinematic Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                        exit={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                        transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.8 }}
                        className="fixed inset-0 z-[60] bg-primary-dark text-white flex flex-col justify-center px-12"
                    >
                        <div className="noise" />

                        <button
                            className="absolute top-10 right-10 p-2 z-50 hover:rotate-90 transition-transform duration-500"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <div className="flex flex-col gap-8 text-5xl md:text-7xl font-hero z-10">
                            {[{ label: "Home", href: "/" }, ...links].map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="hover:italic transition-all duration-300 block title-clip"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
