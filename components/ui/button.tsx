"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef, useRef } from "react";
import { useMagnetic } from "@/components/hooks/use-magnetic";

export interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "luxury";
    size?: "sm" | "md" | "lg";
    children?: React.ReactNode;
    magnetic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", magnetic = true, ...props }, ref) => {
        const magneticRef = useMagnetic(0.2);

        return (
            <div ref={magnetic ? magneticRef : null} className="inline-block">
                <motion.button
                    ref={ref}
                    className={cn(
                        "inline-flex items-center justify-center text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark disabled:pointer-events-none disabled:opacity-50 tracking-wider",
                        {
                            "bg-primary-dark text-white rounded-full hover:bg-black hover:scale-105": variant === "primary",
                            "bg-accent-adventure text-white rounded-full hover:bg-gray-800": variant === "secondary",
                            "border-b border-gray-900 bg-transparent rounded-none hover:text-gray-500 pb-1": variant === "outline",
                            "hover:text-gray-500": variant === "ghost",
                            "bg-accent-luxury text-white rounded-full hover:bg-opacity-90 hover:scale-105": variant === "luxury",
                            "h-9 px-6": size === "sm" && variant !== "outline",
                            "h-12 px-8": size === "md" && variant !== "outline",
                            "h-16 px-10 text-base": size === "lg" && variant !== "outline",
                            "py-1": variant === "outline"
                        },
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);
Button.displayName = "Button";

export { Button };
