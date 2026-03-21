"use client";

import { motion } from "framer-motion";
import { OWNER } from "@/lib/constants";

// The WhatsApp logo SVG path
const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);

export function WhatsAppButton() {
    // Format the phone number by removing spaces for the api link
    const formattedPhone = OWNER.phone.replace(/\s+/g, '');
    const message = encodeURIComponent("I'm interested in discussing a journey.");

    return (
        <motion.a
            href={`https://wa.me/${formattedPhone}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-24 right-6 md:bottom-28 md:right-8 z-50 flex items-center justify-center w-14 h-14 bg-foreground text-background rounded-full shadow-[var(--shadow-harsh)] hover:shadow-xl transition-shadow duration-500"
            aria-label="Chat on WhatsApp"
        >
            <WhatsAppIcon />
        </motion.a>
    );
}
