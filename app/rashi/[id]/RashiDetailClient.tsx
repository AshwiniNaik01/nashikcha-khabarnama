"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ArrowLeft,
    Star,
    Heart,
    Briefcase,
    Coins,
    Activity,
    Calendar,
    Check,
} from "lucide-react";
import { FaShare } from "react-icons/fa";
import { rashiData } from "@/components/rashi/RashiData";
import { ApiRashi } from "@/components/services/rashiService";

/* -------------------- Helpers -------------------- */
const stripHtml = (html: string | undefined) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
};

const formatDateOnly = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('mr-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

/* -------------------- Sub-Components -------------------- */
const Stat = ({ label, value }: { label: string; value: string }) => (
    <div className="group p-4 sm:p-5 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 text-center lg:text-left">
        <div className="text-gray-400 text-[10px] sm:text-[11px] font-black uppercase mb-1 tracking-widest">{label}</div>
        <div className="font-extrabold text-gray-900 text-base sm:text-lg">{value || "---"}</div>
    </div>
);

const DetailCard = ({ icon, title, text, gradient }: { icon: React.ReactNode; title: string; text: string; gradient: string; }) => (
    <div className="group relative p-6 sm:p-8 bg-white rounded-3xl sm:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
        <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${gradient}`} />
        <div className="flex flex-col space-y-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-300 bg-gray-50">{icon}</div>
            <h4 className="text-lg sm:text-xl font-black text-gray-800 tracking-tight">{title}</h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium italic">{text || "याबाबतची माहिती लवकरच उपलब्ध होईल."}</p>
        </div>
    </div>
);

/* -------------------- Main Content Component -------------------- */
function RashiDetailContent({ apiData, id }: { apiData: ApiRashi; id: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [copied, setCopied] = useState(false);
    const [shareUrl, setShareUrl] = useState("");

    const staticInfo = rashiData?.find((r) => r.name === apiData.rashi);

    useEffect(() => {
        const BASE_URL = "https://www.nasikchakhabarnama.com";
        setShareUrl(`${BASE_URL}/rashi/${id}`);
    }, [id]);

    const handleShare = async () => {
        const isShareSupported = typeof navigator.share !== "undefined";
        const shareTitle = `${apiData.rashi} राशी भविष्य | नाशिकचा खबरनामा`;
        const shareText = `✨ *आजचे ${apiData.rashi} राशी भविष्य* (${formatDateOnly(apiData.currentDate)})\n\nसविस्तर वाचण्यासाठी खालील लिंकवर क्लिक करा:`;

        if (isShareSupported) {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: shareUrl,
                });
            } catch (error) {
                console.log("Sharing failed", error);
            }
        } else {
            const fullMsg = `${shareText}\n${shareUrl}`;
            navigator.clipboard.writeText(fullMsg);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleBack = () => {
        const dateParam = searchParams.get("date");
        if (dateParam) {
            router.push(`/rashi?date=${dateParam}`);
        } else {
            router.push('/rashi');
        }
    };

    return (
        <section className="relative min-h-screen bg-slate-50/50 overflow-hidden font-marathi pb-10">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10 transition-opacity duration-1000"
                style={{ backgroundImage: `url(${staticInfo?.image || ""})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(100px)" }} />

            <div className="relative z-10">
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-2xl border-b border-gray-200/50 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
                        <button onClick={handleBack} className="group flex items-center gap-2 text-gray-800 font-extrabold bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-sm border border-gray-100 hover:border-red-200 hover:text-red-600 transition-all text-sm">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden xs:inline">मागे</span>
                        </button>

                        <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
                            <span className="text-2xl sm:text-4xl shrink-0">{staticInfo?.icon}</span>
                            <h1 className="text-lg sm:text-2xl font-black text-gray-900 truncate">
                                {apiData.rashi} राशी भविष्य
                            </h1>
                        </div>

                        <button onClick={handleShare} className="flex p-2.5 rounded-xl bg-yellow-600 text-white shadow-lg shadow-yellow-200/50 hover:bg-yellow-700 active:scale-95 transition-all items-center gap-2">
                            {copied ? <Check size={20} /> : <FaShare size={18} />}
                            <span className="hidden md:inline font-bold">शेअर</span>
                        </button>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    <div className="max-w-6xl mx-auto space-y-12 sm:space-y-20">
                        {/* Hero Section */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
                            <div className="relative group mx-auto w-full max-w-[450px] lg:max-w-none">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/30 to-red-500/30 rounded-[3rem] sm:rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                                <div className="relative aspect-square rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl border-[8px] sm:border-[12px] border-white">
                                    <img src={staticInfo?.image} alt={apiData.rashi} className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white">
                                        <h2 className="text-4xl sm:text-6xl font-black mb-1 sm:mb-2 tracking-tighter">{apiData.rashi}</h2>
                                        <p className="text-base sm:text-xl font-bold opacity-90">स्वामी ग्रह: {apiData.subh_graha}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 sm:gap-8">
                                <div className="flex flex-wrap gap-3">
                                    <div className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-red-200">
                                        <Star size={14} fill="white" /> विशेष अंदाज
                                    </div>
                                    <div className="inline-flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-2xl text-sm font-bold border border-gray-100 shadow-sm">
                                        <Calendar size={16} className="text-red-500" /> {formatDateOnly(apiData.currentDate)}
                                    </div>
                                </div>
                                <div className="relative pt-6">
                                    <span className="absolute -top-4 -left-4 sm:-top-8 sm:-left-6 text-[7rem] sm:text-[10rem] text-gray-200/70 font-serif leading-none select-none -z-10">“</span>
                                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold leading-relaxed text-gray-800 relative z-10 italic">
                                        {stripHtml(apiData.description)}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                                    <Stat label="शुभ रंग" value={apiData.subh_ranga || "---"} />
                                    <Stat label="तत्त्व (Element)" value={apiData.tatva} />
                                </div>
                            </div>
                        </section>

                        {/* Detailed Stats Grid */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            <DetailCard icon={<Heart className="text-pink-600" size={28} />} title="प्रेम आणि नातेसंबंध" gradient="from-pink-500 to-rose-400" text={stripHtml(apiData.prem_ani_natesambandh)} />
                            <DetailCard icon={<Briefcase className="text-blue-600" size={28} />} title="करिअर आणि शिक्षण" gradient="from-blue-500 to-indigo-400" text={stripHtml(apiData.kariyar_ani_shikshan)} />
                            <DetailCard icon={<Coins className="text-emerald-600" size={28} />} title="आर्थिक स्थिती" gradient="from-emerald-500 to-teal-400" text={stripHtml(apiData.arthik_stiti)} />
                            <DetailCard icon={<Activity className="text-orange-600" size={28} />} title="आरोग्य" gradient="from-orange-500 to-amber-400" text={stripHtml(apiData.arogya)} />
                        </section>
                    </div>
                </main>
            </div>
        </section>
    );
}

export default function RashiDetailClient(props: { apiData: ApiRashi; id: string }) {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white font-marathi font-bold text-lg tracking-wide">राशी भविष्य लोड होत आहे...</div>}>
            <RashiDetailContent {...props} />
        </Suspense>
    );
}