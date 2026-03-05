"use client";

import React, { useEffect, useState } from "react";
import {
    getLatestWeeklyHoroscope,
    WeeklyHoroscope as WeeklyHoroscopeType
} from "@/components/services/WeeklyHoroscopeServices";
import { rashiData } from "@/components/rashi/RashiData";
import { Loader2, Share2, Check } from "lucide-react";
import { getAllNews, News, NEWS_IMAGE_BASE_URL } from "@/components/services/newsService";
import { getAllAds, Advertisement } from "@/components/services/adService";
import AdDisplay from "@/components/advertisement/AdDisplay";
import Link from "next/link";
import { FaShare } from "react-icons/fa";
import RelatedNews from "@/components/news/RelatedNews";
import ShortsCard from "@/components/news/ShortsCard";



/**
 * WeeklyHoroscope Component
 * Redesigned to match the provided UI screenshots with a sidebar, ads, and rashi news.
 */
const WeeklyHoroscope = () => {
    const [horoscope, setHoroscope] = useState<WeeklyHoroscopeType | null>(null);
    const [rashiNews, setRashiNews] = useState<News[]>([]);
    const [ads, setAds] = useState<Advertisement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareUrl = typeof window !== "undefined" ? window.location.href : "https://www.nasikchakhabarnama.com/weekly-rashibhavishya";
        const isShareSupported = typeof navigator.share !== "undefined";

        if (isShareSupported) {
            try {
                await navigator.share({
                    title: "साप्ताहिक राशीभविष्य | नाशिकचा खबरनामा",
                    text: `या आठवड्याचे (${horoscope?.weekRange}) राशीभविष्य जाणून घ्या.`,
                    url: shareUrl,
                });
            } catch (error) {
                console.log("Error sharing:", error);
            }
        } else {
            navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [horoRes, newsRes, adsRes] = await Promise.all([
                    getLatestWeeklyHoroscope(),
                    getAllNews(),
                    getAllAds()
                ]);

                if (horoRes.success && horoRes.data) {
                    setHoroscope(horoRes.data);
                } else {
                    setError(horoRes.message || "माहिती उपलब्ध नाही.");
                }

                // Filter out rashi news from general news for the sidebar
                const generalNews = newsRes.filter(n => n.category !== "राशी वृत्त" && n.category !== "rashi-vrutta");
                setRashiNews(generalNews.slice(0, 10)); // Top 10 general news
                setAds(adsRes);
            } catch (err) {
                console.error("Error fetching weekly horoscope data:", err);
                setError("डेटा लोड करताना त्रुटी आली.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-red-600" />
                <p className="text-gray-500 font-bold">माहिती लोड होत आहे...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-20 bg-red-50 rounded-xl border border-dashed border-red-200">
                <p className="text-red-600 font-bold">{error}</p>
            </div>
        );
    }

    if (!horoscope) return null;

    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex items-center gap-4 py-2">
                    <h1 className="text-2xl font-black text-gray-900 whitespace-nowrap">
                        साप्ताहिक राशिभविष्य
                    </h1>
                    <div className="h-[2px] bg-gray-200 w-full" />
                </div>
            </div>

            {/* Tabs & Share triggered from UI */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                <div className="flex flex-wrap gap-2">
                    <Link
                        href="/category/rashi-vrutta"
                        className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 font-black text-xs uppercase hover:bg-gray-50 transition-colors"
                    >
                        राशी वृत्त
                    </Link>
                    <Link
                        href="/rashi"
                        className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 font-black text-xs uppercase hover:bg-gray-50 transition-colors"
                    >
                        आजचे भविष्य
                    </Link>
                    <button
                        className="px-6 py-2 rounded-full bg-red-600 text-white font-black text-xs uppercase shadow-md shadow-red-100"
                    >
                        साप्ताहिक राशिभविष्य
                    </button>
                </div>

                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-2 bg-yellow-600 text-white rounded-full font-black text-xs uppercase shadow-md shadow-yellow-100 hover:bg-yellow-700 transition-all active:scale-95"
                >
                    {copied ? <Check size={14} /> : <FaShare size={14} />}
                    {copied ? "कॉपी झाले" : "शेअर करा"}
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Content: Horoscope List */}
                <div className="lg:w-2/3 space-y-12">
                    {horoscope.signs.map((sign) => {
                        const staticInfo = rashiData.find(r => r.name === sign.signName);
                        return (
                            <div key={sign._id} className="flex flex-col md:flex-row gap-8 pb-10 border-b border-gray-100 last:border-0 group">
                                {/* Sign Image / Icon */}
                                <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-3xl overflow-hidden border border-gray-100 group-hover:border-red-400 transition-all duration-500 shadow-sm relative">
                                    {staticInfo?.image ? (
                                        <img
                                            src={staticInfo.image}
                                            alt={sign.signName}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[80px] md:text-[100px] text-gray-300 group-hover:text-red-600">
                                            {staticInfo?.icon}
                                        </div>
                                    )}

                                    {/* Small Icon Overlay for Premium feel */}
                                    <div className="absolute top-2 left-2 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl md:text-2xl text-red-600 shadow-sm border border-red-50">
                                        {staticInfo?.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                            {sign.signName}
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-1">
                                                ( {horoscope.weekRange} )
                                            </span>
                                        </h3>
                                        <p className="text-lg font-black text-gray-800 mt-1">
                                            {sign.signName} : {sign.signTitle}
                                        </p>
                                    </div>

                                    <div className="text-gray-700 leading-loose text-[15px] space-y-4">
                                        <p className="whitespace-pre-line">
                                            {sign.prediction}
                                        </p>
                                    </div>

                                    <div className="pt-4 space-y-2">
                                        <p className="text-[15px]">
                                            <span className="font-black text-gray-900 border-b-2 border-amber-400 pb-0.5">शुभ दिनांक :</span>
                                            <span className="ml-2 font-black text-gray-700">{sign.luckyDates}</span>
                                        </p>
                                        <p className="text-[15px]">
                                            <span className="font-black text-gray-900 border-b-2 border-pink-400 pb-0.5">महिलांसाठी :</span>
                                            <span className="ml-2 font-black text-gray-700 italic">{sign.womenTip}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Sidebar: Ads & News */}
                <aside className="lg:w-1/3 space-y-10">
                    <AdDisplay ads={ads} position="right" />

                    <RelatedNews
                        title="ताज्या बातम्या"
                        news={rashiNews.slice(0, 5).map(n => ({
                            id: n._id,
                            slug: n.slug || n._id,
                            title: n.title,
                            img: n.image?.cdnUrl || "/placeholder.jpg"
                        }))}
                    />


                    <ShortsCard category="राशी वृत्त" />

                    <AdDisplay ads={ads} position="right" className="mt-8" />
                </aside>
            </div>
        </div>
    );
};

export default WeeklyHoroscope;
