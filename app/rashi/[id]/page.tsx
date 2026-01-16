"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { rashiData } from "@/components/rashi/RashiData";
import {
  Calendar,
  Share2,
  ChevronRight,
  Flame,
  ArrowLeft,
  Zap,
  Shield,
  Heart,
  Briefcase,
  Coins,
  Activity,
  Star,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RashiDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [selectedTab, setSelectedTab] = useState("संपूर्ण फलीत");

  const rashi = rashiData.find((r) => r.id === id);

  const tabs = ["संपूर्ण फलीत", "आर्थिक", "आरोग्य", "करिअर", "प्रेम संबंध"];

  if (!rashi) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            भविष्य सापडले नाही
          </h1>
          <Link
            href="/rashi"
            className="mt-4 inline-block text-red-600 font-bold hover:underline"
          >
            परत जा
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" dark:bg-zinc-950 min-h-screen font-sans selection:bg-red-100 selection:text-red-600 relative overflow-x-hidden">
      {/* Background Image Overlay - Premium Look */}
      <div
        className="fixed inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${rashi.image})`,
          opacity: 0.15,
          zIndex: -1,
        }}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-black hover:text-red-600 transition-all font-bold uppercase tracking-widest text-[16px]"
        >
          <ArrowLeft size={14} /> मागे जा
        </button>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-12">
          <div className="lg:col-span-8 group relative cursor-pointer overflow-hidden bg-zinc-900 shadow-2xl rounded-[2.5rem] border-4 border-white dark:border-zinc-800">
            <div className="relative aspect-video">
              <img
                src={rashi.image}
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[1.5s]"
                alt={rashi.name}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-32 md:h-32 bg-white/10 backdrop-blur-lg text-white rounded-full flex items-center justify-center shadow-2xl border border-white/20 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-5xl md:text-7xl drop-shadow-lg">
                    {rashi.icon}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 flex flex-wrap items-center gap-3">
                <span className="bg-red-600 text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full flex items-center gap-2">
                  <Flame size={12} fill="white" /> TRENDING २०२६
                </span>
                <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 text-[10px] font-bold rounded-full border border-white/20 uppercase tracking-widest">
                  साप्ताहिक विशेष
                </span>
              </div>
            </div>
            <div className="p-6 md:p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
              <h1 className="text-2xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                {rashi.name}: {rashi.forecast}
              </h1>
            </div>
          </div>

          {/* Sidebar Ads */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-red-600 italic">
                पुरस्कृत जाहिरात
              </h3>
              <Share2
                size={18}
                className="text-zinc-400 cursor-pointer hover:text-red-600 transition-colors"
              />
            </div>
            {[1, 2, 3].map((ad) => (
              <div
                key={ad}
                className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm h-32 flex flex-col items-center justify-center border border-zinc-200 dark:border-zinc-800 p-4 rounded-3xl group cursor-pointer hover:border-red-600/30 transition-all"
              >
                <p className="text-zinc-400 text-[9px] font-black tracking-widest uppercase mb-1">
                  ADVERTISEMENT {ad}
                </p>
                <span className="text-zinc-600 dark:text-zinc-400 italic text-sm font-bold text-center">
                  नाशिकमधील सर्वोत्तम ज्योतिष केंद्र
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            {
              label: "स्वामी ग्रह",
              value: rashi.rulingPlanet,
              color: "text-blue-600",
              bg: "bg-blue-50/80",
            },
            {
              label: "शुभ अंक",
              value: rashi.luckyNumber,
              color: "text-green-600",
              bg: "bg-green-50/80",
            },
            {
              label: "शुभ रंग",
              value: rashi.luckyColor,
              color: "text-red-600",
              bg: "bg-red-50/80",
            },
            {
              label: "जुळणारी रास",
              value: `${rashi.compatibility || "९५"}%`,
              color: "text-amber-600",
              bg: "bg-amber-50/80",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-6 rounded-[2rem] ${stat.bg} backdrop-blur-md border-2 border-white shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:scale-105`}
            >
              <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                {stat.label}
              </div>
              <div className={`text-xl font-black ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </section>

        {/* Detailed Analysis Content */}
        <section className="space-y-10 mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-3xl md:text-4xl font-black flex items-center gap-3 tracking-tighter">
              <Shield className="text-red-600" size={36} /> सविस्तर विश्लेषण
            </h3>
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full border border-red-100 dark:border-red-900/30">
              <Zap size={16} className="text-red-600 animate-pulse" />
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                आजचा विशेष सल्ला
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-[2.5rem] border border-white dark:border-zinc-800 shadow-sm space-y-4 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-600">
                <Heart fill="currentColor" opacity={0.2} />
              </div>
              <h4 className="text-2xl font-black tracking-tight">
                प्रेम आणि नातेसंबंध
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                आज जोडीदारासोबतचे संबंध मधुर राहतील. अविवाहितांसाठी विवाहाचे योग
                येण्याची शक्यता आहे. कुटुंबातील मोठ्यांचे आशीर्वाद लाभतील.
              </p>
            </div>

            <div className="p-8 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-[2.5rem] border border-white dark:border-zinc-800 shadow-sm space-y-4 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                <Briefcase fill="currentColor" opacity={0.2} />
              </div>
              <h4 className="text-2xl font-black tracking-tight">
                करिअर आणि शिक्षण
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                नोकरीत पदोन्नतीचे संकेत मिळत आहेत. विद्यार्थ्यांना अभ्यासात
                चांगले यश मिळेल. नवीन प्रकल्पांची सुरुवात करण्यासाठी आजचा दिवस
                उत्तम आहे.
              </p>
            </div>

            <div className="p-8 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-[2.5rem] border border-white dark:border-zinc-800 shadow-sm space-y-4 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                <Coins fill="currentColor" opacity={0.2} />
              </div>
              <h4 className="text-2xl font-black tracking-tight">
                आर्थिक स्थिती
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                धनलाभाचे योग असले तरी अनावश्यक खर्च टाळणे हिताचे ठरेल. जुनी येणी
                वसूल होतील.
              </p>
            </div>

            <div className="p-8 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-[2.5rem] border border-white dark:border-zinc-800 shadow-sm space-y-4 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                <Activity fill="currentColor" opacity={0.2} />
              </div>
              <h4 className="text-2xl font-black tracking-tight">आरोग्य</h4>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                मानसिक शांतीसाठी योगासने आणि ध्यानधारणा करा. आहारावर नियंत्रण
                ठेवावे. प्रकृतीकडे दुर्लक्ष करू नका.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Related Rashi */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-10 w-2 bg-red-600 rounded-full"></div>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter uppercase text-balance">
              इतर राशींचे भविष्य
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rashiData.slice(0, 3).map((item) => (
              <Link
                href={`/rashi/${item.id}`}
                key={item.id}
                className="flex flex-col group"
              >
                <div className="relative aspect-video overflow-hidden mb-4 shadow-xl rounded-[2rem] border-2 border-white dark:border-zinc-800">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={item.name}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/40 text-3xl">
                      {item.icon}
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-xl px-2 group-hover:text-red-600 transition-colors line-clamp-1">
                  {item.name} रास: साप्ताहिक अंदाज
                </h3>
                <div className="flex items-center justify-between mt-3 px-2">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={12} /> ११ जाने २०२६
                  </span>
                  <ChevronRight
                    size={18}
                    className="text-red-600 group-hover:translate-x-2 transition-transform"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
