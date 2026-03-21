"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-5 h-5" />;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn(
                "p-2 text-foreground hover:text-muted transition-colors relative overflow-hidden flex items-center justify-center rounded-full group",
                className
            )}
            aria-label="Toggle theme"
        >
            <Sun className={cn(
                "w-4 h-4 transition-all duration-700 absolute",
                theme === 'dark' ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
            )} />
            <Moon className={cn(
                "w-4 h-4 transition-all duration-700 absolute",
                theme === 'dark' ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
            )} />
        </button>
    );
}

