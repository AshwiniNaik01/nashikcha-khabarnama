"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { rashiData } from "@/components/rashi/RashiData";
import {
    ArrowLeft,
    Star,
    Heart,
    Briefcase,
    Share2,
    Coins,
    Activity,
} from "lucide-react";

interface PageProps {
    params: Promise<{ id: string }>;
}

/* -------------------- Helper Components -------------------- */

const Stat = ({ label, value }: { label: string; value: string }) => (
    <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="text-gray-400 text-xs font-bold uppercase mb-1">
            {label}
        </div>
        <div className="font-black">{value}</div>
    </div>
);

const DetailCard = ({
    icon,
    title,
    text,
}: {
    icon: React.ReactNode;
    title: string;
    text: string;
}) => (
    <div className="p-8 bg-white/60 backdrop-blur-md rounded-xl border border-gray-100 shadow-md space-y-4">
        {icon}
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="text-zinc-600">{text}</p>
    </div>
);

/* -------------------- Page -------------------- */

export default function RashiDetailPage({ params }: PageProps) {
    const router = useRouter();
    const { id } = use(params);

    const rashi = rashiData.find((r) => r.id === id);

    if (!rashi) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-2xl font-black">भविष्य सापडले नाही</h1>
                <Link
                    href="/rashi"
                    className="mt-4 inline-block text-red-600 font-bold hover:underline"
                >
                    परत जा
                </Link>
            </div>
        );
    }

    return (
        <section className="relative bg-white overflow-hidden rounded-3xl border border-gray-200">
            {/* 🌄 SECTION BACKGROUND */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${rashi.image})`,
                    opacity: 0.15,
                }}
            />

            {/* CONTENT */}
            <div className="relative z-10">
                {/* HEADER */}
                <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            suppressHydrationWarning
                            className="flex items-center gap-2 text-gray-800 font-bold hover:text-red-600 transition-colors"
                        >
                            <ArrowLeft size={18} />
                            <span>परत</span>
                        </button>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{rashi.icon}</span>
                            <h1 className="text-xl font-black font-serif">
                                {rashi.name}
                            </h1>
                        </div>

                        <button suppressHydrationWarning className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>

                {/* BODY */}
                <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                    <div className="max-w-5xl mx-auto space-y-12">
                        {/* HERO */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                                <img
                                    src={rashi.image}
                                    alt={rashi.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-8 left-8 text-white">
                                    <h2 className="text-4xl font-black font-serif">
                                        {rashi.name}
                                    </h2>
                                    <p className="text-lg opacity-90">
                                        {rashi.sanskritName}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest border border-red-100">
                                    <Star size={16} fill="currentColor" />
                                    आजचा विशेष अंदाज
                                </div>

                                <p className="text-2xl lg:text-3xl font-bold font-serif italic leading-snug">
                                    “{rashi.forecast}”
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <Stat label="कालावधी" value={rashi.date} />
                                    <Stat label="घटक" value={rashi.element} />
                                </div>
                            </div>
                        </section>

                        {/* QUICK STATS */}
                        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "स्वामी ग्रह", value: rashi.rulingPlanet },
                                { label: "शुभ अंक", value: rashi.luckyNumber },
                                { label: "शुभ रंग", value: rashi.luckyColor },
                                { label: "जुळणारी रास", value: `${rashi.compatibility}%` },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="p-6 rounded-3xl bg-white/70 backdrop-blur border shadow-sm text-center"
                                >
                                    <div className="text-sm font-black uppercase text-gray-400 mb-1">
                                        {item.label}
                                    </div>
                                    <div className="text-xl font-black text-lokmat-red">
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* DETAILS */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailCard
                                icon={<Heart className="text-pink-600" />}
                                title="प्रेम आणि नातेसंबंध"
                                text="आज जोडीदारासोबतचे संबंध मधुर राहतील. अविवाहितांसाठी विवाहाचे योग आहेत."
                            />

                            <DetailCard
                                icon={<Briefcase className="text-blue-600" />}
                                title="करिअर आणि शिक्षण"
                                text="नोकरीत पदोन्नतीचे संकेत आहेत. विद्यार्थ्यांना अभ्यासात यश मिळेल."
                            />

                            <DetailCard
                                icon={<Coins className="text-green-600" />}
                                title="आर्थिक स्थिती"
                                text="गुंतवणुकीसाठी दिवस अनुकूल आहे. खर्चावर नियंत्रण ठेवल्यास आर्थिक स्थैर्य मिळेल."
                            />

                            <DetailCard
                                icon={<Activity className="text-orange-600" />}
                                title="आरोग्य"
                                text="मानसिक तणाव कमी राहील. आहार व दिनचर्या संतुलित ठेवल्यास प्रकृती चांगली राहील."
                            />
                        </section>

                    </div>
                </div>
            </div>
        </section>
    );
}
