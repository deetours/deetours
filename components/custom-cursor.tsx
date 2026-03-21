"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over interactive elements
            if (
                window.getComputedStyle(target).cursor === 'pointer' || 
                target.tagName.toLowerCase() === 'a' || 
                target.tagName.toLowerCase() === 'button'
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    // Mix-blend-difference ONLY works perfectly if the element is pure white universally.
    // Pure White (255) - White Background (255) = Black Cursor (0)
    // Pure White (255) - Black Background (0) = White Cursor (255)
    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center border-2 border-white"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isHovered ? 2.5 : 1,
                backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 28,
                mass: 0.5
            }}
        >
            {isHovered && (
                <motion.span 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-black text-[4px] font-bold uppercase tracking-widest"
                >
                    Act
                </motion.span>
            )}
        </motion.div>
    );
}

