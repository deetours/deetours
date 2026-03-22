"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { useAuth, UserButton } from "@clerk/nextjs";

export function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { isLoaded, userId } = useAuth();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { label: "Destinations", href: "/destinations" },
        { label: "The Collection", href: "/trips" },
        { label: "Our Journals", href: "/blog" },
        { label: "Why DeeTours", href: "/about" },
        { label: "Book Now", href: "/booking" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
                className={cn(
                    "fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[100] transition-transform duration-700 ease-[0.16,1,0.3,1] w-[90%] md:w-auto min-w-[320px]",
                    isScrolled ? "scale-95 shadow-2xl shadow-black/10" : "scale-100"
                )}
            >
                <div className="flex items-center justify-between bg-surface-1/90 backdrop-blur-3xl border border-border-subtle rounded-full px-6 md:px-10 py-5 transition-colors duration-500">
                    {/* Left: Logo */}
                    <div className="flex items-center mr-8 md:mr-16">
                        <Link href="/" className="group">
                            <span className="font-hero text-xl tracking-tighter text-foreground group-hover:text-muted transition-colors duration-500">
                                DeeTours
                            </span>
                        </Link>
                    </div>

                    {/* Center: Links (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-10">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-[0.6rem] uppercase tracking-[0.4em] transition-all duration-500 hover:text-foreground",
                                    pathname === link.href ? "text-foreground font-medium" : "text-muted"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Theme Toggle & Mobile Trigger */}
                    <div className="flex items-center gap-4 md:ml-12">
                        <ThemeToggle />
                        
                        {isLoaded && userId ? (
                            <>
                                <Link href="/dashboard" className="hidden md:block text-[0.6rem] uppercase tracking-[0.3em] text-foreground font-medium hover:italic transition-all opacity-80 hover:opacity-100">
                                    Dashboard
                                </Link>
                                <div className="border border-border-subtle rounded-full p-[2px]">
                                    <UserButton appearance={{ elements: { userButtonAvatarBox: "w-7 h-7" } }} />
                                </div>
                            </>
                        ) : isLoaded && !userId ? (
                            <Link href="/sign-in" className="hidden md:flex items-center justify-center text-[0.55rem] uppercase tracking-[0.3em] text-background bg-foreground px-4 py-2 rounded-full hover:bg-foreground/90 transition-colors">
                                Archive Access
                            </Link>
                        ) : null}

                        <button
                            className="md:hidden p-2 text-foreground hover:text-muted transition-colors"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Cinematic Full Screen Menu for Mobile */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                        exit={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                        transition={{ ease: [0.16, 1, 0.3, 1], duration: 1 }}
                        className="fixed inset-0 z-[110] bg-background text-foreground flex flex-col justify-center px-10 transition-colors duration-500"
                    >
                        <div className="noise mix-blend-overlay opacity-30 pointer-events-none" />

                        <button
                            className="absolute top-8 right-8 p-4 z-50 text-foreground hover:rotate-90 transition-transform duration-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        
                        <div className="flex flex-col gap-6 md:gap-12 text-[clamp(2rem,8vw,4rem)] md:text-6xl font-hero z-10 relative">
                            {[{ label: "The Origin", href: "/" }, ...links].map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + (i * 0.1), duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="hover:italic transition-all duration-500 block text-muted hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            
                            {/* Mobile Auth Button */}
                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="mt-8 md:hidden"
                            >
                                {isLoaded && !userId && (
                                    <Link 
                                        href="/sign-in" 
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="inline-flex items-center justify-center text-xs uppercase tracking-[0.3em] font-sans text-background bg-foreground px-8 py-4 rounded-full"
                                    >
                                        Archive Access
                                    </Link>
                                )}
                                {isLoaded && userId && (
                                    <Link 
                                        href="/dashboard" 
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="inline-flex items-center justify-center text-xs uppercase tracking-[0.3em] font-sans text-foreground border border-border-subtle hover:bg-foreground hover:text-background transition-colors px-8 py-4 rounded-full"
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

