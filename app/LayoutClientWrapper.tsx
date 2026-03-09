'use client';

import AdDisplay from '@/components/advertisement/AdDisplay';
import { Advertisement as AdType, getAdsByCategory } from '@/components/services/adService';
import React, { useEffect, useState } from 'react';

function LayoutContent({ children }: { children: React.ReactNode }) {
    const [globalAds, setGlobalAds] = useState<AdType[]>([]);

    useEffect(() => {
        const fetchGlobalAds = async () => {
            try {
                const res = await getAdsByCategory('all');
                if (res.success) setGlobalAds(res.data);
            } catch (err) {
                console.error('Layout Ads Error:', err);
            }
        };

        setTimeout(fetchGlobalAds, 100);
    }, []);
    return (
        <div className="site-layout-wrapper flex justify-center min-h-screen bg-white">
            {/* Left Sidebar */}
            <aside className="hidden xl:flex flex-col w-[120px] p-2 border-r border-gray-100/50">
                <div className="sticky top-[100px] h-[calc(100vh-120px)]">
                    <AdDisplay ads={globalAds} position="sticky-left" className="w-full h-full" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="site-main-content flex-1 max-w-6xl">
                <div className="parity-container">{children}</div>
            </main>

            {/* Right Sidebar */}
            <aside className="hidden xl:flex flex-col w-[120px] p-2 border-l border-gray-100/50">
                <div className="sticky top-[100px] h-[calc(100vh-120px)]">
                    <AdDisplay ads={globalAds} position="sticky-right" className="w-full h-full" />
                </div>
            </aside>
        </div>
    );
}

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
    return <LayoutContent>{children}</LayoutContent>;
}
