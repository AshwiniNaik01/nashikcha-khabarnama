"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { rashiData } from "@/components/rashi/RashiData";
import {
    ArrowLeft,
    Star,
    Calendar,
    Zap,
    Shield,
    Heart,
    Briefcase,
    Coins,
    Activity,
    Share2
} from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function RashiDetailPage({ params }: PageProps) {
    const router = useRouter();
    const { id } = use(params);

    const rashi = rashiData.find((r) => r.id === id);

    if (!rashi) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">भविष्य सापडले नाही</h1>
                    <Link href="/rashi" className="mt-4 inline-block text-red-600 font-bold hover:underline">
                        परत जा
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-white">
            <div
                className="fixed inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
                style={{
                    backgroundImage: `url(${rashi.image})`,
                    opacity: 0.15
                }}
            />

            <div className="relative z-10">
                <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            suppressHydrationWarning
                            className="flex items-center gap-2 text-gray-800 font-bold hover:text-red-600 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span>परत</span>
                        </button>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{rashi.icon}</span>
                            <h1 className="text-xl font-black text-gray-900 font-serif">{rashi.name}</h1>
                        </div>
                        <button suppressHydrationWarning className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 lg:py-12">
                    <div className="max-w-5xl mx-auto space-y-12">
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                                <img src={rashi.image} alt={rashi.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-8 left-8 text-white">
                                    <h2 className="text-4xl font-black font-serif">{rashi.name}</h2>
                                    <p className="text-lg opacity-90">{rashi.sanskritName}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest border border-red-100">
                                    <Star size={16} fill="currentColor" /> आजचा विशेष अंदाज
                                </div>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight font-serif italic">
                                    "{rashi.forecast}"
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="text-gray-400 text-xs font-bold uppercase mb-1">कालावधी</div>
                                        <div className="font-black">{rashi.date}</div>
                                    </div>
                                    <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="text-gray-400 text-xs font-bold uppercase mb-1">घटक</div>
                                        <div className="font-black">{rashi.element}</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "स्वामी ग्रह", value: rashi.rulingPlanet, color: "text-blue-600", bg: "bg-blue-50" },
                                { label: "शुभ अंक", value: rashi.luckyNumber, color: "text-green-600", bg: "bg-green-50" },
                                { label: "शुभ रंग", value: rashi.luckyColor, color: "text-red-600", bg: "bg-red-50" },
                                { label: "जुळणारी रास", value: `${rashi.compatibility}%`, color: "text-amber-600", bg: "bg-amber-50" }
                            ].map((stat, i) => (
                                <div key={i} className={`p-6 rounded-3xl ${stat.bg} border-2 border-white shadow-sm flex flex-col items-center justify-center text-center`}>
                                    <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</div>
                                    <div className={`text-xl font-black ${stat.color}`}>{stat.value}</div>
                                </div>
                            ))}
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                                <Heart className="text-pink-600" />
                                <h4 className="text-xl font-bold">प्रेम आणि नातेसंबंध</h4>
                                <p className="text-zinc-600">आज जोडीदारासोबतचे संबंध मधुर राहतील. अविवाहितांसाठी विवाहाचे योग आहेत.</p>
                            </div>
                            <div className="p-8 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                                <Briefcase className="text-blue-600" />
                                <h4 className="text-xl font-bold">करिअर आणि शिक्षण</h4>
                                <p className="text-zinc-600">नोकरीत पदोन्नतीचे संकेत आहेत. विद्यार्थ्यांना अभ्यासात यश मिळेल.</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}