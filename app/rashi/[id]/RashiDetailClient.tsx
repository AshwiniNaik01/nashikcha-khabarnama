// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//     ArrowLeft,
//     Star,
//     Heart,
//     Briefcase,
//     Share2,
//     Coins,
//     Activity,
//     Calendar,
//     Check,
// } from "lucide-react";
// import { FaShare } from "react-icons/fa";
// import { rashiData } from "@/components/rashi/RashiData";
// import { ApiRashi } from "@/components/services/rashiService";

// /* -------------------- Helpers -------------------- */

// const stripHtml = (html: string | undefined) => {
//     if (!html) return "";
//     return html
//         .replace(/<[^>]*>?/gm, " ")
//         .replace(/\s+/g, " ")
//         .trim();
// };

// const formatDateOnly = (dateString: string | undefined) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toISOString().split("T")[0];
// };

// /* -------------------- Sub-Components -------------------- */

// const Stat = ({ label, value }: { label: string; value: string }) => (
//     <div className="group p-5 bg-white/80 backdrop-blur-sm rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
//         <div className="text-gray-400 text-[11px] font-black uppercase mb-1 tracking-widest">
//             {label}
//         </div>
//         <div className="font-extrabold text-gray-900 text-lg">{value || "---"}</div>
//     </div>
// );

// const DetailCard = ({
//     icon,
//     title,
//     text,
//     gradient,
// }: {
//     icon: React.ReactNode;
//     title: string;
//     text: string;
//     gradient: string;
// }) => (
//     <div className="group relative p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
//         <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${gradient}`} />
//         <div className="flex flex-col space-y-4">
//             <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-300">
//                 {icon}
//             </div>
//             <h4 className="text-xl font-black text-gray-800 tracking-tight">{title}</h4>
//             <p className="text-gray-600 leading-relaxed font-medium italic">
//                 {text || "याबाबतची माहिती लवकरच उपलब्ध होईल."}
//             </p>
//         </div>
//     </div>
// );

// /* -------------------- Main Component -------------------- */

// interface RashiDetailClientProps {
//     apiData: ApiRashi;
//     id: string;
// }

// export default function RashiDetailClient({ apiData, id }: RashiDetailClientProps) {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isMounted, setIsMounted] = useState(false);
//     const [copied, setCopied] = useState(false);

//     const staticInfo = rashiData?.find((r) => r.name === apiData.rashi);

//     const baseUrl = "https://www.nasikchakhabarnama.com";
//     const shareUrl = `${baseUrl}/rashi/${id}`;

//     useEffect(() => {
//         setIsMounted(true);

//         // --- Google Analytics: Track Rashi View ---
//         if (typeof window !== "undefined" && (window as any).gtag) {
//             (window as any).gtag('event', 'view_rashi', {
//                 rashi_name: apiData.rashi,
//                 rashi_id: id,
//                 page_location: window.location.href
//             });
//         }
//     }, [id, apiData.rashi]);

//     const handleShare = async () => {
//         const isShareSupported = typeof navigator.share !== "undefined";

//         // --- Google Analytics: Track Share Click ---
//         if (typeof window !== "undefined" && (window as any).gtag) {
//             (window as any).gtag('event', 'click_share_rashi', {
//                 rashi_name: apiData.rashi,
//                 method: isShareSupported ? 'System Share' : 'Copy Link'
//             });
//         }

//         if (isShareSupported) {
//             try {
//                 await navigator.share({
//                     title: `${apiData.rashi} राशी भविष्य | नाशिकचा खबरनामा`,
//                     text: `${apiData.rashi} राशी भविष्य - ${stripHtml(apiData.description).slice(0, 100)}...`,
//                     url: shareUrl,
//                 });
//             } catch (error) {
//                 console.log("Error sharing:", error);
//             }
//         } else {
//             navigator.clipboard.writeText(shareUrl);
//             setCopied(true);
//             setTimeout(() => setCopied(false), 2000);
//         }
//     };

//     const handleBack = () => {
//         const dateParam = searchParams.get("date");
//         if (dateParam) {
//             router.push(`/rashi?date=${dateParam}`);
//         } else if (apiData.currentDate) {
//             const formatted = formatDateOnly(apiData.currentDate);
//             router.push(`/rashi?date=${formatted}`);
//         } else {
//             router.push('/rashi');
//         }
//     };

//     if (!isMounted) return null;

//     return (
//         <section className="relative min-h-screen bg-slate-50/50 overflow-hidden font-marathi">
//             {/* 🌄 Subtle Background Blur Image */}
//             <div
//                 className="fixed inset-0 z-0 pointer-events-none opacity-20 transition-opacity duration-1000"
//                 style={{
//                     backgroundImage: `url(${staticInfo?.image || ""})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     filter: "blur(80px)",
//                 }}
//             />

//             <div className="relative z-10">
//                 <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-2xl border-b border-gray-200/50">
//                     <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
//                         <button
//                             onClick={handleBack}
//                             className="group flex items-center gap-2 text-gray-800 font-extrabold bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 hover:text-red-600 transition-all"
//                         >
//                             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//                             <span>मागे जा</span>
//                         </button>

//                         <div className="flex items-center gap-4">
//                             <span className="text-4xl">{staticInfo?.icon}</span>
//                             <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
//                                 {apiData.rashi} राशी भविष्य
//                             </h1>
//                         </div>

//                         <div className="flex items-center gap-2">
//                             <button
//                                 onClick={handleShare}
//                                 className="p-3 rounded-xl bg-yellow-600 text-white shadow-sm border border-yellow-700 hover:bg-yellow-700 transition-all font-bold flex items-center gap-2"
//                             >
//                                 {copied ? <Check size={20} /> : <FaShare size={20} />}
//                                 <span>शेअर करा</span>
//                             </button>
//                         </div>
//                     </div>
//                 </header>

//                 <main className="max-w-7xl mx-auto px-6 py-12">
//                     <div className="max-w-6xl mx-auto space-y-16">
//                         <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//                             <div className="relative group">
//                                 <div className="absolute -inset-4 bg-gradient-to-tr from-red-500/20 to-orange-400/20 rounded-[4rem] blur-2xl group-hover:opacity-100 transition duration-1000" />
//                                 <div className="relative aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white">
//                                     <img
//                                         src={staticInfo?.image}
//                                         alt={apiData.rashi}
//                                         className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000"
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
//                                     <div className="absolute bottom-10 left-10 text-white">
//                                         <h2 className="text-6xl font-black mb-2 tracking-tighter">{apiData.rashi}</h2>
//                                         <p className="text-xl font-bold opacity-90">स्वामी ग्रह: {apiData.subh_graha}</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="flex flex-col gap-8">
//                                 <div className="flex flex-wrap gap-4">
//                                     <div className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-red-200">
//                                         <Star size={14} fill="white" /> विशेष अंदाज
//                                     </div>
//                                     <div className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-2xl text-sm font-bold border border-gray-200 shadow-sm">
//                                         <Calendar size={16} className="text-red-500" />
//                                         {formatDateOnly(apiData.currentDate)}
//                                     </div>
//                                 </div>

//                                 <div className="relative">
//                                     <span className="absolute -top-10 -left-6 text-[10rem] text-gray-200/50 font-serif leading-none select-none">“</span>
//                                     <p className="text-2xl lg:text-4xl font-bold leading-[1.4] text-gray-800 relative z-10 italic">
//                                         {stripHtml(apiData.description)}
//                                     </p>
//                                 </div>

//                                 <div className="grid grid-cols-2 gap-6">
//                                     <Stat label="शुभ रंग" value={apiData.subh_ranga || "---"} />
//                                     <Stat label="तत्त्व (Element)" value={apiData.tatva} />
//                                 </div>
//                             </div>
//                         </section>

//                         <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                             <DetailCard
//                                 icon={<Heart className="text-pink-600" size={28} />}
//                                 title="प्रेम आणि नातेसंबंध"
//                                 gradient="from-pink-500 to-rose-400"
//                                 text={stripHtml(apiData.prem_ani_natesambandh)}
//                             />
//                             <DetailCard
//                                 icon={<Briefcase className="text-blue-600" size={28} />}
//                                 title="करिअर आणि शिक्षण"
//                                 gradient="from-blue-500 to-indigo-400"
//                                 text={stripHtml(apiData.kariyar_ani_shikshan)}
//                             />
//                             <DetailCard
//                                 icon={<Coins className="text-emerald-600" size={28} />}
//                                 title="आर्थिक स्थिती"
//                                 gradient="from-emerald-500 to-teal-400"
//                                 text={stripHtml(apiData.arthik_stiti)}
//                             />
//                             <DetailCard
//                                 icon={<Activity className="text-orange-600" size={28} />}
//                                 title="आरोग्य"
//                                 gradient="from-orange-500 to-amber-400"
//                                 text={stripHtml(apiData.arogya)}
//                             />
//                         </section>
//                     </div>
//                 </main>
//             </div>

//             {/* Mobile Floating Buttons */}
//             <div className="fixed bottom-10 right-6 flex flex-col gap-3 z-50 md:hidden">
//                 <button
//                     onClick={handleShare}
//                     className="w-12 h-12 flex items-center justify-center bg-yellow-600 text-white rounded-full shadow-lg active:scale-90 transition-all border-none"
//                 >
//                     {copied ? <Check size={24} /> : <FaShare size={24} />}
//                 </button>
//             </div>
//         </section>
//     );
// }


"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ArrowLeft,
    Star,
    Heart,
    Briefcase,
    Share2,
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
    return html.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim();
};

const formatDateOnly = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
};

/* -------------------- Sub-Components -------------------- */
const Stat = ({ label, value }: { label: string; value: string }) => (
    <div className="group p-4 sm:p-5 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="text-gray-400 text-[10px] sm:text-[11px] font-black uppercase mb-1 tracking-widest">{label}</div>
        <div className="font-extrabold text-gray-900 text-base sm:text-lg">{value || "---"}</div>
    </div>
);

const DetailCard = ({ icon, title, text, gradient }: { icon: React.ReactNode; title: string; text: string; gradient: string; }) => (
    <div className="group relative p-6 sm:p-8 bg-white rounded-3xl sm:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
        <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${gradient}`} />
        <div className="flex flex-col space-y-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-300">{icon}</div>
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

    const staticInfo = rashiData?.find((r) => r.name === apiData.rashi);

    const [shareUrl, setShareUrl] = useState("");

    useEffect(() => {
        setShareUrl(window.location.origin + window.location.pathname + (window.location.search || ""));
    }, [id]);

    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag('event', 'view_rashi', {
                rashi_name: apiData.rashi,
                rashi_id: id,
                page_location: window.location.href
            });
        }
    }, [id, apiData.rashi]);

    const handleShare = async () => {
        const isShareSupported = typeof navigator.share !== "undefined";
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag('event', 'click_share_rashi', {
                rashi_name: apiData.rashi,
                method: isShareSupported ? 'System Share' : 'Copy Link'
            });
        }

        if (isShareSupported) {
            try {
                await navigator.share({
                    title: `${apiData.rashi} राशी भविष्य | नाशिकचा खबरनामा`,
                    text: `${apiData.rashi} राशी भविष्य - ${stripHtml(apiData.description).slice(0, 100)}...`,
                    url: shareUrl,
                });
            } catch (error) { console.log("Error sharing:", error); }
        } else {
            navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleBack = () => {
        const dateParam = searchParams.get("date");
        if (dateParam) {
            router.push(`/rashi?date=${dateParam}`);
        } else if (apiData.currentDate) {
            router.push(`/rashi?date=${formatDateOnly(apiData.currentDate)}`);
        } else {
            router.push('/rashi');
        }
    };

    return (
        <section className="relative min-h-screen bg-slate-50/50 overflow-hidden font-marathi">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 transition-opacity duration-1000"
                style={{ backgroundImage: `url(${staticInfo?.image || ""})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(80px)" }} />

            <div className="relative z-10">
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-2xl border-b border-gray-200/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
                        <button onClick={handleBack} className="group flex items-center gap-1.5 sm:gap-2 text-gray-800 font-extrabold bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:text-red-600 transition-all text-sm sm:text-base">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden xs:inline">मागे जा</span>
                        </button>
                        <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
                            <span className="text-2xl sm:text-4xl shrink-0">{staticInfo?.icon}</span>
                            <h1 className="text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 truncate">
                                {apiData.rashi} राशी भविष्य
                            </h1>
                        </div>
                        <button onClick={handleShare} className="hidden sm:flex p-2 sm:p-3 rounded-lg sm:rounded-xl bg-yellow-600 text-white shadow-sm border border-yellow-700 hover:bg-yellow-700 transition-all font-bold items-center gap-2">
                            {copied ? <Check size={18} /> : <FaShare size={18} />}
                            <span className="hidden md:inline">शेअर करा</span>
                        </button>
                        {/* Mobile Share (Always Icon) */}
                        <button onClick={handleShare} className="sm:hidden p-2.5 rounded-lg bg-yellow-600 text-white shadow-sm border border-yellow-700 active:scale-95 transition-all">
                            {copied ? <Check size={20} /> : <FaShare size={20} />}
                        </button>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
                    <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16">
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                            <div className="relative group px-2 sm:px-0">
                                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-red-500/20 to-orange-400/20 rounded-[2.5rem] sm:rounded-[4rem] blur-2xl group-hover:opacity-100 transition duration-1000" />
                                <div className="relative aspect-square rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl border-[6px] sm:border-[12px] border-white">
                                    <img src={staticInfo?.image} alt={apiData.rashi} className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white">
                                        <h2 className="text-4xl sm:text-6xl font-black mb-1 sm:mb-2 tracking-tighter">{apiData.rashi}</h2>
                                        <p className="text-base sm:text-xl font-bold opacity-90">स्वामी ग्रह: {apiData.subh_graha}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6 sm:gap-8 px-2 sm:px-0">
                                <div className="flex flex-wrap gap-3 sm:gap-4">
                                    <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-xl shadow-red-200">
                                        <Star size={12} fill="white" className="sm:w-[14px] sm:h-[14px]" /> विशेष अंदाज
                                    </div>
                                    <div className="inline-flex items-center gap-2 bg-white text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold border border-gray-200 shadow-sm">
                                        <Calendar size={14} className="text-red-500 sm:w-[16px] sm:h-[16px]" /> {formatDateOnly(apiData.currentDate)}
                                    </div>
                                </div>
                                <div className="relative mt-4">
                                    <span className="absolute -top-6 -left-4 sm:-top-10 sm:-left-6 text-[6rem] sm:text-[10rem] text-gray-200/50 font-serif leading-none select-none">“</span>
                                    <p className="text-xl sm:text-2xl lg:text-4xl font-bold leading-[1.5] text-gray-800 relative z-10 italic">
                                        {stripHtml(apiData.description)}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                                    <Stat label="शुभ रंग" value={apiData.subh_ranga || "---"} />
                                    <Stat label="तत्त्व (Element)" value={apiData.tatva} />
                                </div>
                            </div>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
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


interface RashiDetailClientProps {
    apiData: ApiRashi;
    id: string;
}

export default function RashiDetailClient(props: RashiDetailClientProps) {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white font-marathi font-bold">माहिती लोड होत आहे...</div>}>
            <RashiDetailContent {...props} />
        </Suspense>
    );
}
