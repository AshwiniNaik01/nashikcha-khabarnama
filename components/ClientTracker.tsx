'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ClientTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!(window as any).gtag) return;

        const url = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

        (window as any).gtag('config', 'G-48FNN5BNR0', {
            page_path: url,
        });
    }, [pathname, searchParams]);

    return null;
}
