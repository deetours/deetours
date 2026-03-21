"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col min-h-screen"
        >
            {children}
        </motion.div>
    );
}

