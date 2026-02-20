"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { rashiData } from "@/components/rashi/RashiData";
import { getRashiById, ApiRashi } from "@/components/services/rashiService";
import {
  ArrowLeft,
  Star,
  Heart,
  Briefcase,
  Share2,
  Coins,
  Activity,
  Loader2,
  Calendar,
} from "lucide-react";

/* -------------------- Helpers -------------------- */

const stripHtml = (html: string | undefined) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>?/gm, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// तारीख फॉरमॅट: "2026-02-17T00:00:00.000Z" -> "2026-02-17"
const formatDateOnly = (dateString: string | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

/* -------------------- Sub-Components -------------------- */

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="group p-5 bg-white/80 backdrop-blur-sm rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="text-gray-400 text-[11px] font-black uppercase mb-1 tracking-widest">
      {label}
    </div>
    <div className="font-extrabold text-gray-900 text-lg">{value || "---"}</div>
  </div>
);

const DetailCard = ({
  icon,
  title,
  text,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  gradient: string;
}) => (
  <div className="group relative p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
    <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${gradient}`} />
    <div className="flex flex-col space-y-4">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-300">
        {icon}
      </div>
      <h4 className="text-xl font-black text-gray-800 tracking-tight">{title}</h4>
      <p className="text-gray-600 leading-relaxed font-medium italic">
        {text || "याबाबतची माहिती लवकरच उपलब्ध होईल."}
      </p>
    </div>
  </div>
);

/* -------------------- Main Component -------------------- */

export default function RashiDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [apiData, setApiData] = useState<ApiRashi | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!params.id) return;
      try {
        setLoading(true);
        const response = await getRashiById(params.id as string);
        if (response.success && response.data) {
          setApiData(response.data);
        }
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [params.id]);

  const staticInfo = rashiData?.find((r) => r.name === apiData?.rashi);


  const handleBack = () => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      router.push(`/rashi?date=${dateParam}`);
    } else if (apiData?.currentDate) {

      const formatted = formatDateOnly(apiData.currentDate);

      router.push(`/rashi?date=${formatted}`);
    } else {
      router.push('/rashi');
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6 bg-slate-50">
        <div className="relative">
          <Loader2 className="animate-spin text-red-600 w-16 h-16" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-red-100 rounded-full animate-ping" />
          </div>
        </div>
        <p className="font-black text-gray-800 italic text-xl animate-pulse">
          तुमच्या नशिबाचे तारे मोजत आहोत...
        </p>
      </div>
    );
  }

  if (!apiData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="text-8xl mb-6 animate-bounce">🔮</div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">माहिती उपलब्ध नाही</h1>
        <Link href="/rashi" className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-red-600 transition-all">
          सर्व राशी पहा
        </Link>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-slate-50/50 overflow-hidden">
      {/* 🌄 Subtle Background Blur Image */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${staticInfo?.image || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10">
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-2xl border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="group flex items-center gap-2 text-gray-800 font-extrabold bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 hover:text-red-600 transition-all"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>मागे जा</span>
            </button>

            <div className="flex items-center gap-4">
              <span className="text-4xl">{staticInfo?.icon}</span>
              <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                {apiData.rashi} राशी भविष्य
              </h1>
            </div>

            <button className="p-3 rounded-xl bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all">
              <Share2 size={20} className="text-gray-600" />
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto space-y-16">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-red-500/20 to-orange-400/20 rounded-[4rem] blur-2xl group-hover:opacity-100 transition duration-1000" />
                <div className="relative aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white">
                  <img
                    src={staticInfo?.image}
                    alt={apiData.rashi}
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                    <h2 className="text-6xl font-black mb-2 tracking-tighter">{apiData.rashi}</h2>
                    <p className="text-xl font-bold opacity-90">स्वामी ग्रह: {apiData.subh_graha}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-wrap gap-4">
                  <div className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-red-200">
                    <Star size={14} fill="white" /> विशेष अंदाज
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-2xl text-sm font-bold border border-gray-200 shadow-sm">
                    <Calendar size={16} className="text-red-500" />
                    {formatDateOnly(apiData.currentDate)}
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -top-10 -left-6 text-[10rem] text-gray-200/50 font-serif leading-none select-none">“</span>
                  <p className="text-2xl lg:text-4xl font-bold leading-[1.4] text-gray-800 relative z-10 italic">
                    {stripHtml(apiData.description)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Stat label="शुभ रंग" value={apiData.subh_ranga || "---"} />
                  <Stat label="तत्त्व (Element)" value={apiData.tatva} />
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DetailCard
                icon={<Heart className="text-pink-600" size={28} />}
                title="प्रेम आणि नातेसंबंध"
                gradient="from-pink-500 to-rose-400"
                text={stripHtml(apiData.prem_ani_natesambandh)}
              />
              <DetailCard
                icon={<Briefcase className="text-blue-600" size={28} />}
                title="करिअर आणि शिक्षण"
                gradient="from-blue-500 to-indigo-400"
                text={stripHtml(apiData.kariyar_ani_shikshan)}
              />
              <DetailCard
                icon={<Coins className="text-emerald-600" size={28} />}
                title="आर्थिक स्थिती"
                gradient="from-emerald-500 to-teal-400"
                text={stripHtml(apiData.arthik_stiti)}
              />
              <DetailCard
                icon={<Activity className="text-orange-600" size={28} />}
                title="आरोग्य"
                gradient="from-orange-500 to-amber-400"
                text={stripHtml(apiData.arogya)}
              />
            </section>
          </div>
        </main>
      </div>
    </section>
  );
}