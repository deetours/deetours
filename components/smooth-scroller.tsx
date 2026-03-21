"use client";

import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SmoothScroller({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [key, setKey] = useState(pathname);

    // Forces lenis to re-initialize on route changes so parallax/scroll trigger works correctly.
    useEffect(() => {
        setKey(pathname);
    }, [pathname]);

    return (
        <ReactLenis root key={key} options={{ 
            lerp: 0.08, 
            duration: 1.5,
            smoothWheel: true 
        }}>
            {children}
        </ReactLenis>
    );
}

