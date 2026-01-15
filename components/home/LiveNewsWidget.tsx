// components/home/LiveNewsWidget.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Radio, Volume2 } from 'lucide-react';

const LiveNewsWidget = () => {
    const [currentNews, setCurrentNews] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const liveUpdates = [
        'राम मंदिर सोहळ्यासाठी नाशिकमध्ये विशेष व्यवस्था',
        'गोदावरी नदीचा प्रवाह सामान्य',
        'बाजार समितीत सकाळी ७ वाजेपर्यंतचे दर',
        'आजचे हवामान: थंडीचा कडाका कायम',
        'महानगरपालिकेची आजची बैठक रद्द'
    ];

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setCurrentNews((prev) => (prev + 1) % liveUpdates.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-50">
                <div className="flex items-center gap-2">
                    <div className="bg-lokmat-red w-3 h-3 rounded-full animate-pulse shadow-[0_0_8px_rgba(237,27,36,0.6)]"></div>
                    <h3 className="font-black text-lg tracking-tight uppercase">लाईव्ह न्यूज</h3>
                </div>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-lokmat-red hover:text-white transition-all px-3 py-1.5 rounded-full text-xs font-bold"
                    suppressHydrationWarning
                >
                    {isPlaying ? <Volume2 size={14} /> : <Radio size={14} />}
                    {isPlaying ? 'थांबा' : 'सुरू करा'}
                </button>
            </div>

            <div className="space-y-4">
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                        <div className="bg-lokmat-red text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">ब्रेकिंग</div>
                        <p className="text-sm font-bold flex-1 leading-snug">{liveUpdates[currentNews]}</p>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-3 flex items-center gap-2 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1"><span className="w-1 h-1 bg-lokmat-red rounded-full"></span> आत्ताच अपडेट</span>
                        <span className="ml-auto bg-white px-2 py-0.5 rounded border border-red-100">{currentNews + 1}/{liveUpdates.length}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    {liveUpdates.slice(0, 3).map((update, index) => (
                        <div key={index} className="flex items-start gap-3 border-b border-gray-50 pb-3 last:border-0 last:pb-0 group cursor-pointer">
                            <div className={`w-2 h-2 rounded-full mt-1.5 transition-colors ${index === 0 ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-gray-200 group-hover:bg-lokmat-red'}`}></div>
                            <p className="text-sm font-medium text-gray-700 group-hover:text-lokmat-red transition-colors leading-snug">{update}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveNewsWidget;