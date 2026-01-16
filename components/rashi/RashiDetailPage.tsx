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
  Share2,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RashiDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  // rashiData मधून माहिती शोधणे
  const rashi = rashiData.find((r) => r.id === id);

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
    <div className="relative min-h-screen bg-white">
      {/* Background Image with Low Opacity - As requested */}
      <div
        className="fixed inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${rashi.image})`,
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-800 font-bold hover:text-red-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>परत</span>
            </button>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{rashi.icon}</span>
              <h1 className="text-xl font-black text-gray-900 font-serif">
                {rashi.name} - संपूर्ण भविष्य
              </h1>
            </div>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src={rashi.image}
                  alt={rashi.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="text-5xl mb-4">{rashi.icon}</div>
                  <h2 className="text-4xl font-black font-serif mb-1">
                    {rashi.name}
                  </h2>
                  <p className="text-lg opacity-90 font-medium">
                    {rashi.sanskritName || "Zodiac Sign"}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest border border-red-100">
                  <Star size={16} fill="currentColor" />
                  आजचा विशेष अंदाज
                </div>

                <p className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight font-serif italic">
                  "{rashi.forecast}"
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white/90 rounded-3xl shadow-sm border border-gray-100">
                    <div className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Calendar size={14} className="text-red-600" /> कालावधी
                    </div>
                    <div className="text-lg font-black text-gray-900">
                      {rashi.date}
                    </div>
                  </div>
                  <div className="p-6 bg-white/90 rounded-3xl shadow-sm border border-gray-100">
                    <div className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Zap size={14} className="text-orange-500" /> घटक
                    </div>
                    <div className="text-lg font-black text-gray-900">
                      {rashi.element}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Stats Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "स्वामी ग्रह",
                  value: rashi.rulingPlanet,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  label: "शुभ अंक",
                  value: rashi.luckyNumber,
                  color: "text-green-600",
                  bg: "bg-green-50",
                },
                {
                  label: "शुभ रंग",
                  value: rashi.luckyColor,
                  color: "text-red-600",
                  bg: "bg-red-50",
                },
                {
                  label: "जुळणारी रास",
                  value: `${rashi.compatibility}%`,
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-3xl ${stat.bg} border-2 border-white shadow-sm flex flex-col items-center justify-center text-center`}
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

            {/* In-depth Analysis Section with Dummy Content */}
            <section className="space-y-6">
              <h3 className="text-3xl font-black font-serif flex items-center gap-3">
                <Shield className="text-red-600" /> सविस्तर विश्लेषण
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm rounded-[2rem] space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600">
                    <Heart />
                  </div>
                  <h4 className="text-xl font-bold">प्रेम आणि नातेसंबंध</h4>
                  <p className="text-zinc-600 leading-relaxed">
                    आज जोडीदारासोबतचे संबंध मधुर राहतील. कुटुंबात आनंदाचे
                    वातावरण असेल. अविवाहितांसाठी विवाहाचे नवीन प्रस्ताव येण्याची
                    शक्यता आहे. जुन्या मित्रांची भेट होईल.
                  </p>
                </div>

                <div className="p-8 bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm rounded-[2rem] space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Briefcase />
                  </div>
                  <h4 className="text-xl font-bold">करिअर आणि शिक्षण</h4>
                  <p className="text-zinc-600 leading-relaxed">
                    नोकरीत पदोन्नतीचे संकेत मिळत आहेत. वरिष्ठ तुमच्या कामाची दखल
                    घेतील. विद्यार्थ्यांना अभ्यासात एकाग्रता राखणे सोपे जाईल आणि
                    परीक्षेत यश मिळेल.
                  </p>
                </div>

                <div className="p-8 bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm rounded-[2rem] space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                    <Coins />
                  </div>
                  <h4 className="text-xl font-bold">आर्थिक स्थिती</h4>
                  <p className="text-zinc-600 leading-relaxed">
                    गुंतवणुकीसाठी आजचा दिवस उत्तम आहे. जुनी येणी वसूल होतील.
                    अनावश्यक खर्च टाळल्यास तुमची आर्थिक बाजू अधिक भक्कम होईल.
                    धनलाभाचे योग आहेत.
                  </p>
                </div>

                <div className="p-8 bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm rounded-[2rem] space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <Activity />
                  </div>
                  <h4 className="text-xl font-bold">आरोग्य</h4>
                  <p className="text-zinc-600 leading-relaxed">
                    मानसिक शांततेसाठी योगासने आणि ध्यानधारणा करा. आहारावर
                    नियंत्रण ठेवा. बाह्य पदार्थ खाणे टाळावे. प्रकृतीमध्ये मोठी
                    सुधारणा दिसून येईल.
                  </p>
                </div>
              </div>
            </section>

            {/* Bottom Call to Action */}
            <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-[3rem] p-10 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="relative z-10 space-y-4">
                <h2 className="text-3xl font-black font-serif">
                  तुमच्या कुंडलीबद्दल अधिक जाणून घ्या
                </h2>
                <p className="text-white/80 max-w-xl mx-auto">
                  आमच्या तज्ज्ञ ज्योतिषांशी संवाद साधा आणि तुमच्या जीवनातील
                  समस्यांवर अचूक उपाय मिळवा.
                </p>
                <button className="bg-white text-red-600 px-10 py-4 rounded-full font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                  संपर्क करा
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="py-12 text-center text-gray-400 text-sm border-t border-gray-100">
          <p>© 2026 खबरनामा राशिभविष्य. सर्व हक्क राखीव.</p>
          <p className="mt-2 text-xs opacity-60">
            टीप: हे भविष्य ग्रहांच्या स्थितीवर आधारित असून सामान्य
            मार्गदर्शनासाठी आहे.
          </p>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-25deg);
          }
          100% {
            transform: translateX(200%) skewX(-25deg);
          }
        }
      `}</style>
    </div>
  );
}
