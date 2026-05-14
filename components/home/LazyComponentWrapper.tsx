"use client";

import React, { useEffect, useState, useRef, ReactNode } from "react";

export default function LazyComponentWrapper({ children }: { children: ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || isVisible) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "300px" } // Load slightly before it comes into view
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [isVisible]);

    if (!isVisible) {
        return (
            <div ref={ref} className="w-full min-h-[300px] flex items-center justify-center bg-gray-50/50 rounded-2xl animate-pulse">
                <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return <div ref={ref}>{children}</div>;
}
