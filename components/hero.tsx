"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// The feeling states that rotate on the right side
const slides = [
    {
        id: "silence",
        img: "https://images.unsplash.com/photo-1518557984649-7b161c230cfa?q=80&w=2670&auto=format&fit=crop", // Dark misty forest
        color: "#E2E8F0"
    },
    {
        id: "culture",
        img: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=2670&auto=format&fit=crop", // Serene cinematic landscape
        color: "#FDE68A"
    },
    {
        id: "comfort",
        img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2670&auto=format&fit=crop", // Moody water
        color: "#BAE6FD"
    }
];

export function Hero() {
    const [isHovered, setIsHovered] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        setIsDesktop(window.innerWidth >= 1024);
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto rotate images to simulate the visual carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // 5 seconds per feeling
        return () => clearInterval(interval);
    }, []);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Subtly parallax the images based on overall scroll
    const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Structural tension: 50/50 normally, shifts to 40/60 when hovering the image side on desktop
    const rightPanelWidth = isDesktop ? (isHovered ? "60%" : "50%") : "100%";
    const leftPanelWidth = isDesktop ? (isHovered ? "40%" : "50%") : "100%";
    const leftPanelHeight = isDesktop ? "100%" : "60%";
    const rightPanelHeight = isDesktop ? "100%" : "40%";

    return (
        <motion.section 
            ref={containerRef}
            style={{ opacity: opacityHero }}
            className="relative h-[110vh] w-full bg-background flex flex-col lg:flex-row text-foreground overflow-hidden cursor-crosshair"
        >
            {/* █ L E F T   S I D E (The Mind/Logic) █ */}
            <motion.div 
                animate={{ width: leftPanelWidth, height: leftPanelHeight }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center justify-center p-8 lg:p-16 z-10 shrink-0"
            >
                <div className="max-w-md w-full ml-auto mr-12 lg:mr-24 z-10">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-[0.65rem] uppercase tracking-[0.3em] text-muted mb-8"
                    >
                        The Architecture of Escape
                    </motion.p>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[clamp(3.5rem,6vw,5.5rem)] font-hero leading-[1.05] tracking-tight mb-8"
                    >
                        Disconnect <br />
                        <motion.span 
                            animate={{ color: slides[activeSlide].color }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            className="font-light italic"
                        >
                            to reconnect.
                        </motion.span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg text-muted leading-relaxed font-light"
                    >
                        The world is loud. Your escape shouldn’t be. Discover sanctuaries of silence, culture, and absolute comfort.
                    </motion.p>
                </div>
            </motion.div>

            {/* █ R I G H T   S I D E (The Escape/Emotion) █ */}
            <motion.div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ width: "100%" }} // The wiping reveal
                animate={{ width: rightPanelWidth, height: rightPanelHeight }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative shrink-0 overflow-hidden bg-surface-1"
            >
                {/* Physical Texture */}
                <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
                <div className="noise absolute inset-0 z-20 pointer-events-none opacity-50 mix-blend-overlay" />
                
                {/* Crossfading Visual Loop */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 2.4, ease: "easeInOut" }}
                        style={{ y: yImage }}
                        className="absolute inset-0 origin-center"
                    >
                        <Image
                            src={slides[activeSlide].img}
                            fill
                            priority
                            alt="Cinematic location"
                            className="object-cover contrast-[1.15] grayscale-[15%]"
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* █ T H E   B R I D G E   C T A █ */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    left: isDesktop ? leftPanelWidth : "50%",
                    top: isDesktop ? "50%" : leftPanelHeight,
                    x: "-50%",
                    y: "-50%"
                }}
                transition={{ 
                    duration: 1.4, 
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { delay: 1.8, duration: 1.2 }
                }}
                className="absolute top-1/2 -translate-y-1/2 z-40"
            >
                <Link href="/booking" className="group block focus:outline-none">
                    <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border border-border-subtle flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-[0.16,1,0.3,1] bg-black/10 backdrop-blur-sm hover:border-white/60 hover:bg-black/40">
                        {/* Hover Fill Mechanism */}
                        <div className="absolute inset-0 bg-foreground translate-y-[100%] rounded-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                        
                        {/* Typography / Iconography */}
                        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-[#E5E5E5] group-hover:text-background transition-colors duration-500">
                            <span className="text-[0.6rem] uppercase tracking-[0.25em] font-medium group-hover:opacity-0 transition-opacity duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center">
                                Request<br/>Dossier
                            </span>
                            <ArrowRight 
                                className="w-8 h-8 absolute top-1/2 left-1/2 translate-y-10 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1]" 
                                strokeWidth={1}
                            />
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 2 }}
                className="absolute bottom-8 left-12 z-40 flex flex-col items-start text-muted"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#737373]/80 to-transparent mb-4 overflow-hidden relative">
                    <motion.div 
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-full bg-foreground"
                    />
                </div>
                <span className="text-[0.55rem] uppercase tracking-[0.3em] rotate-180" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
            </motion.div>

            {/* Global Grain Top Layer */}
            <div className="noise fixed inset-0 z-[100] pointer-events-none mix-blend-overlay opacity-[0.15]" />
        </motion.section>
    );
}

