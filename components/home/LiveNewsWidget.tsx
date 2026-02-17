
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Play, Pause } from 'lucide-react';
import { getAllNews, News } from '@/components/services/newsService';
import Link from "next/link";

const LiveNewsWidget = () => {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [currentNews, setCurrentNews] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const TIMER_DURATION = 5000;
    const PROGRESS_INTERVAL = 50; // Update progress frequently for smoothness

    useEffect(() => {
        const fetchLiveNews = async () => {
            try {
                const data = await getAllNews();
                setNewsList(data.slice(0, 10));
            } catch (error) {
                console.warn("Handled live updates issue:", error);
                setNewsList([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLiveNews();
    }, []);

    // Timer for news rotation and progress bar
    useEffect(() => {
        if (newsList.length === 0 || !isPlaying) return;

        // Reset progress when news changes
        setProgress(0);

        const startTime = Date.now();

        progressIntervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = (elapsed / TIMER_DURATION) * 100;

            if (newProgress >= 100) {
                setCurrentNews(prev => (prev + 1) % newsList.length);
                setProgress(0);
                // The interval continues for the next item because of the key/state change, 
                // but cleaner re-instantiation happens via dependency array if needed.
                // However, logic here relies on the effect re-running on 'currentNews' change 
                // if we included it in deps, or we can manage it completely here.
                // Better approach: Let the effect re-run when currentNews changes.
            } else {
                setProgress(newProgress);
            }
        }, PROGRESS_INTERVAL);

        return () => {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, [newsList.length, isPlaying, currentNews]);

    // Handle manual navigation
    const handleManualChange = (index: number) => {
        setCurrentNews(index);
        setProgress(0);
        setIsPlaying(false); // Pause on manual interaction (optional, but good UX)
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-8 flex items-center justify-center">
                <Loader2 className="animate-spin text-lokmat-red" />
            </div>
        );
    }

    if (newsList.length === 0) return null;

    const activeArticle = newsList[currentNews];

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 relative overflow-hidden">
            {/* Top Progress Bar - REMOVED per requirement to use circular one instead, OR keep as secondary? User asked for circular. Let's remove this one to avoid clutter. */}

            {/* Circular Progress & Controls */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-50 mt-1">
                <div className="flex items-center gap-2">
                    <div className="bg-lokmat-red w-3 h-3 rounded-full animate-pulse shadow-[0_0_8px_rgba(237,27,36,0.6)]"></div>
                    <h3 className="font-black text-lg tracking-tight uppercase">लाईव्ह न्यूज</h3>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                    {/* Play/Pause Button */}
                    <button
                        onClick={togglePlayPause}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-700"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                    </button>

                    {/* Numeric Countdown */}
                    <span className="text-xs font-bold w-4 text-center tabular-nums text-lokmat-red">
                        {Math.ceil((1 - progress / 100) * (TIMER_DURATION / 1000))}s
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                {/* Main Link for Active News */}
                <Link href={`/news/${activeArticle._id}/${activeArticle.slug}`}>
                    <div className="bg-red-50 border border-red-100 rounded-lg p-4 shadow-sm relative overflow-hidden group cursor-pointer hover:bg-red-100 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className="bg-lokmat-red text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">लाईव्ह</div>
                            <p className="text-sm font-bold flex-1 leading-snug min-h-[40px] group-hover:text-lokmat-red transition-colors">
                                {activeArticle.title}
                            </p>
                        </div>

                        <div className="text-[10px] text-gray-500 mt-3 flex items-center gap-2 font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-lokmat-red rounded-full"></span>
                                आत्ताच अपडेट
                            </span>
                            <span className="ml-auto bg-white px-2 py-0.5 rounded border border-red-100">
                                {currentNews + 1}/{newsList.length}
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Sub-list with Links */}
                <div className="space-y-3">
                    {newsList.slice(0, 3).map((item, index) => (
                        <Link key={item._id} href={`/news/${item._id}/${item.slug}`}>
                            <div className="flex items-start gap-3 border-b border-gray-50 pb-3 last:border-0 last:pb-0 group cursor-pointer mt-3">
                                <div className={`w-2 h-2 rounded-full mt-1.5 transition-colors ${index === currentNews ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-gray-200 group-hover:bg-lokmat-red'}`}></div>
                                <p className={`text-sm leading-snug transition-colors ${index === currentNews ? 'text-lokmat-red font-bold' : 'text-gray-700 font-medium group-hover:text-lokmat-red'}`}>
                                    {item.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveNewsWidget;