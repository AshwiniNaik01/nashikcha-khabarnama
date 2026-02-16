"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { rashiData } from "@/components/rashi/RashiData";
import { getRashiById, ApiRashi } from "@/components/services/rashiService"; // ✅ नाव बदलले
import {
    ArrowLeft,
    Star,
    Heart,
    Briefcase,
    Share2,
    Coins,
    Activity,
    Loader2
} from "lucide-react";

// Helper to strip HTML tags
const stripHtml = (html: string | undefined) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim();
};

/* -------------------- Helper Components -------------------- */

const Stat = ({ label, value }: { label: string; value: string }) => (
    <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="text-gray-400 text-[10px] font-bold uppercase mb-1 tracking-wider">
            {label}
        </div>
        <div className="font-black text-gray-800">{value || "---"}</div>
    </div>
);

const DetailCard = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
    <div className="p-8 bg-white/60 backdrop-blur-md rounded-xl border border-gray-100 shadow-md space-y-4 transition-all hover:shadow-lg">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            {icon}
        </div>
        <h4 className="text-xl font-bold text-gray-800">{title}</h4>
        <p className="text-zinc-600 leading-relaxed">{text || "याबाबतची माहिती लवकरच उपलब्ध होईल."}</p>
    </div>
);

/* -------------------- Main Page -------------------- */

export default function RashiDetailPage() {
    const router = useRouter();
    const params = useParams();
    const [apiData, setApiData] = useState<ApiRashi | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            // URL मधून 'id' मिळत नसेल तर थांबवा
            if (!params.id) return;

            try {
                setLoading(true);
                // ✅ एंडपॉइंटनुसार योग्य सर्व्हिस कॉल (/api/v1/rashi/id/${id})
                const response = await getRashiById(params.id as string);

                if (response.success && response.data) {
                    setApiData(response.data);
                } else {
                    setApiData(null);
                }
            } catch (error) {
                console.error("माहिती मिळवताना त्रुटी आली:", error);
                setApiData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [params.id]);

    // ✅ API च्या नावावरून (उदा. "मेष") इमेज आणि आयकॉन शोधणे
    const staticInfo = rashiData?.find((r) => r.name === apiData?.rashi);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center gap-4 bg-white">
                <Loader2 className="animate-spin text-red-600" size={40} />
                <p className="font-bold text-gray-500 italic text-lg">तुमच्या नशिबाचे तारे मोजत आहोत...</p>
            </div>
        );
    }

    if (!apiData) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-center px-4">
                <div className="text-6xl mb-4">🔮</div>
                <h1 className="text-2xl font-black text-gray-800">माहिती उपलब्ध नाही</h1>
                <p className="text-gray-500 mb-6">आम्ही शोधलेली राशी किंवा आयडी सापडू शकली नाही.</p>
                <Link href="/rashi" className="px-8 py-3 bg-red-600 text-white rounded-full font-bold shadow-lg hover:bg-red-700 transition-all">
                    सर्व राशी पहा
                </Link>
            </div>
        );
    }

    return (
        <section className="relative min-h-screen bg-white overflow-hidden rounded-3xl border border-gray-200">
            {/* 🌄 Background Decor */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
                style={{
                    backgroundImage: `url(${staticInfo?.image || ''})`,
                    opacity: 0.1,
                }}
            />

            <div className="relative z-10">
                {/* Header Section */}
                <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-800 font-bold hover:text-red-600 transition-all"
                        >
                            <ArrowLeft size={18} />
                            <span>मागे जा</span>
                        </button>

                        <div className="flex items-center gap-3">
                            <span className="text-3xl">{staticInfo?.icon}</span>
                            <h1 className="text-xl font-black text-gray-900">
                                {apiData.rashi} राशी भविष्य
                            </h1>
                        </div>

                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <Share2 size={18} className="text-gray-600" />
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                    <div className="max-w-5xl mx-auto space-y-12">

                        {/* Hero: Image & Description */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                                <img
                                    src={staticInfo?.image}
                                    alt={apiData.rashi}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 text-white">
                                    <h2 className="text-4xl font-black mb-1">{apiData.rashi}</h2>
                                    <p className="text-lg opacity-90">स्वामी ग्रह: {apiData.subh_graha}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest border border-red-100">
                                    <Star size={16} fill="currentColor" />
                                    आजचा विशेष अंदाज
                                </div>

                                <p className="text-2xl lg:text-3xl font-bold italic leading-tight text-gray-800">
                                    “{stripHtml(apiData.description)}”
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <Stat label="कालावधी" value={apiData.kalavadi} />
                                    <Stat label="तत्त्व (Element)" value={apiData.tatva} />
                                </div>
                            </div>
                        </section>

                        {/* Detailed Insights Cards */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailCard
                                icon={<Heart className="text-pink-600" />}
                                title="प्रेम आणि नातेसंबंध"
                                text={stripHtml(apiData.prem_ani_natesambandh)}
                            />
                            <DetailCard
                                icon={<Briefcase className="text-blue-600" />}
                                title="करिअर आणि शिक्षण"
                                text={stripHtml(apiData.kariyar_ani_shikshan)}
                            />
                            <DetailCard
                                icon={<Coins className="text-green-600" />}
                                title="आर्थिक स्थिती"
                                text={stripHtml(apiData.arthik_stiti)}
                            />
                            <DetailCard
                                icon={<Activity className="text-orange-600" />}
                                title="आरोग्य"
                                text={stripHtml(apiData.arogya)}
                            />
                        </section>
                    </div>
                </main>
            </div>
        </section>
    );
}