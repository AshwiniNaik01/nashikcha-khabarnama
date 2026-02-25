// "use client";

// import React, { use, useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { rashiData } from "@/components/rashi/RashiData";
// import { getRashiById, ApiRashi } from "@/components/services/rashiService";
// import {
//   ArrowLeft,
//   Star,
//   Calendar,
//   Zap,
//   Shield,
//   Heart,
//   Briefcase,
//   Coins,
//   Activity,
//   Share2,
//   Loader2,
// } from "lucide-react";
// import Link from "next/link";

// // Helper to strip HTML tags
// const stripHtml = (html: string | undefined) => {
//   if (!html) return "";
//   return html
//     .replace(/<[^>]*>?/gm, " ")
//     .replace(/\s+/g, " ")
//     .trim();
// };

// // तारीख फॉरमॅट: "2026-02-17T00:00:00.000Z" -> "2026-02-17"
// const formatDateOnly = (dateString: string | undefined) => {
//   if (!dateString) return "";
//   const date = new Date(dateString);
//   return date.toISOString().split("T")[0];
// };

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default function RashiDetailPage({ params }: PageProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { id } = use(params);

//   const [rashiApi, setRashiApi] = useState<ApiRashi | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRashi = async () => {
//       try {
//         setLoading(true);
//         const response = await getRashiById(id);
//         if (response.success) {
//           setRashiApi(response.data);
//         } else {
//           setError(response.message || "भविष्य लोड करण्यास असमर्थ");
//         }
//       } catch (err) {
//         console.error("API Error:", err);
//         setError("नेटवर्क एरर! कृपया पुन्हा प्रयत्न करा.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRashi();
//   }, [id]);

//   // Find static assets (icon, image) based on Marathi name
//   const staticData = rashiData.find((r) => r.name === rashiApi?.rashi);

//   const handleBack = () => {
//     const dateParam = searchParams.get("date");
//     if (dateParam) {
//       router.push(`/rashi?date=${dateParam}`);
//     } else if (rashiApi?.currentDate) {
//       const formatted = formatDateOnly(rashiApi.currentDate);
//       router.push(`/rashi?date=${formatted}`);
//     } else {
//       router.push('/rashi');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-4">
//         <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
//         <p className="text-gray-500 font-medium animate-pulse">
//           तुमचं भविष्य उघडत आहे...
//         </p>
//       </div>
//     );
//   }

//   if (error || !rashiApi) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-xl space-y-6">
//           <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
//             <Shield size={40} />
//           </div>
//           <h1 className="text-2xl font-black text-gray-900 leading-tight">
//             {error || "भविष्य सापडले नाही"}
//           </h1>
//           <p className="text-gray-500">
//             आम्ही हे भविष्य शोधण्यात यशस्वी झालो नाही. कृपया पुन्हा तपासा.
//           </p>
//           <Link
//             href="/rashi"
//             className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg"
//           >
//             <ArrowLeft size={18} /> परत जा
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen bg-white">
//       {/* Background Image with Low Opacity */}
//       {staticData && (
//         <div
//           className="fixed inset-0 bg-cover bg-center transition-opacity duration-1000"
//           style={{
//             backgroundImage: `url(${staticData.image})`,
//             opacity: 0.1,
//             zIndex: 0,
//           }}
//         />
//       )}

//       {/* Content Layer */}
//       <div className="relative z-10">
//         {/* Navigation Header */}
//         <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
//           <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//             <button
//               onClick={handleBack}
//               className="flex items-center gap-2 text-gray-800 font-bold hover:text-red-600 transition-colors"
//             >
//               <ArrowLeft size={20} />
//               <span className="hidden sm:inline">परत</span>
//             </button>
//             <div className="flex items-center gap-3">
//               <span className="text-2xl">{staticData?.icon}</span>
//               <h1 className="text-lg sm:text-xl font-black text-gray-900">
//                 {rashiApi.rashi} - राशीभविष्य
//               </h1>
//             </div>
//             <button className="p-2.5 rounded-full bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-all border border-gray-100">
//               <Share2 size={20} />
//             </button>
//           </div>
//         </header>

//         <main className="container mx-auto px-4 py-8 lg:py-12">
//           <div className="max-w-6xl mx-auto space-y-12">
//             {/* Hero Section */}
//             <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//               <div className="lg:col-span-5 relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white group">
//                 {staticData && (
//                   <img
//                     src={staticData.image}
//                     alt={rashiApi.rashi}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
//                   />
//                 )}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//                 <div className="absolute bottom-8 left-8 right-8 text-white">
//                   <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
//                     {staticData?.icon}
//                   </div>
//                   <h2 className="text-5xl font-black mb-1">{rashiApi.rashi}</h2>
//                   <p className="text-lg opacity-80 font-bold tracking-widest uppercase">
//                     अक्षर: {rashiApi.akshar || "-"}
//                   </p>
//                 </div>
//               </div>

//               <div className="lg:col-span-7 space-y-8">
//                 <div className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-red-200">
//                   <Star
//                     size={14}
//                     fill="currentColor"
//                     className="animate-spin-slow"
//                   />
//                   विशेष अंदाज
//                 </div>

//                 <div className="space-y-6">
//                   <p className="text-2xl md:text-4xl font-black text-gray-900 leading-snug italic font-serif">
//                     “{stripHtml(rashiApi.description)}”
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 sm:gap-6">
//                   <div className="p-6 bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//                     <div className="text-zinc-400 font-black text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
//                       <Calendar size={14} className="text-red-600" /> कालावधी
//                     </div>
//                     <div className="text-lg font-black text-gray-900">
//                       {rashiApi.kalavadi}
//                     </div>
//                   </div>
//                   <div className="p-6 bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//                     <div className="text-zinc-400 font-black text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
//                       <Zap size={14} className="text-orange-500" /> तत्व
//                     </div>
//                     <div className="text-lg font-black text-gray-900">
//                       {rashiApi.tatva}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Detailed Stats Grid */}
//             <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//               {[
//                 {
//                   label: "शुभ ग्रह",
//                   value: rashiApi.subh_graha,
//                   color: "text-blue-600",
//                   bg: "bg-blue-50/50",
//                   icon: <Zap size={16} />,
//                 },
//                 {
//                   label: "भाग्यांक",
//                   value: rashiApi.bhagyank,
//                   color: "text-amber-600",
//                   bg: "bg-amber-50/50",
//                   icon: <Star size={16} />,
//                 },
//                 {
//                   label: "शुभ रंग",
//                   value: rashiApi.subh_ranga,
//                   color: "text-rose-600",
//                   bg: "bg-rose-50/50",
//                   icon: <Heart size={16} />,
//                 },
//                 {
//                   label: "जुळणारी रास",
//                   value: rashiApi.julni,
//                   color: "text-purple-600",
//                   bg: "bg-purple-50/50",
//                   icon: <Activity size={16} />,
//                 },
//               ].map((stat, i) => (
//                 <div
//                   key={i}
//                   className={`p-8 rounded-[2.5rem] ${stat.bg} border border-white shadow-sm flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform`}
//                 >
//                   <div className={`${stat.color} mb-2 opacity-50`}>
//                     {stat.icon}
//                   </div>
//                   <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
//                     {stat.label}
//                   </div>
//                   <div className={`text-2xl font-black ${stat.color}`}>
//                     {stat.value}
//                   </div>
//                 </div>
//               ))}
//             </section>

//             {/* In-depth Analysis Section */}
//             <section className="space-y-8">
//               <div className="flex items-center gap-4">
//                 <h3 className="text-3xl font-black flex items-center gap-3">
//                   सविस्तर न्युज
//                 </h3>
//                 <div className="flex-1 h-[1px] bg-gray-100" />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
//                 {/* प्रेम */}
//                 <div className="p-10 bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm rounded-[3rem] space-y-6 group hover:shadow-xl transition-all h-full">
//                   <div className="w-16 h-16 rounded-3xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-inner group-hover:scale-110 transition-transform">
//                     <Heart size={32} />
//                   </div>
//                   <div className="space-y-3">
//                     <h4 className="text-2xl font-black">प्रेम आणि नातेसंबंध</h4>
//                     {rashiApi.prem_ani_natesambandh ? (
//                       <p className="text-gray-600 leading-relaxed text-lg">
//                         {stripHtml(rashiApi.prem_ani_natesambandh)}
//                       </p>
//                     ) : (
//                       <p className="text-zinc-400 italic">माहिती उपलब्ध नाही</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* करिअर */}
//                 <div className="p-10 bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm rounded-[3rem] space-y-6 group hover:shadow-xl transition-all h-full">
//                   <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
//                     <Briefcase size={32} />
//                   </div>
//                   <div className="space-y-3">
//                     <h4 className="text-2xl font-black">करिअर आणि शिक्षण</h4>
//                     {rashiApi.kariyar_ani_shikshan ? (
//                       <p className="text-gray-600 leading-relaxed text-lg">
//                         {stripHtml(rashiApi.kariyar_ani_shikshan)}
//                       </p>
//                     ) : (
//                       <p className="text-zinc-400 italic">माहिती उपलब्ध नाही</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* आर्थिक */}
//                 <div className="p-10 bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm rounded-[3rem] space-y-6 group hover:shadow-xl transition-all h-full">
//                   <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform">
//                     <Coins size={32} />
//                   </div>
//                   <div className="space-y-3">
//                     <h4 className="text-2xl font-black">आर्थिक स्थिती</h4>
//                     {rashiApi.arthik_stiti ? (
//                       <p className="text-gray-600 leading-relaxed text-lg">
//                         {stripHtml(rashiApi.arthik_stiti)}
//                       </p>
//                     ) : (
//                       <p className="text-zinc-400 italic">माहिती उपलब्ध नाही</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* आरोग्य */}
//                 <div className="p-10 bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm rounded-[3rem] space-y-6 group hover:shadow-xl transition-all h-full">
//                   <div className="w-16 h-16 rounded-3xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-inner group-hover:scale-110 transition-transform">
//                     <Activity size={32} />
//                   </div>
//                   <div className="space-y-3">
//                     <h4 className="text-2xl font-black">आरोग्य</h4>
//                     {rashiApi.arogya ? (
//                       <p className="text-gray-600 leading-relaxed text-lg">
//                         {stripHtml(rashiApi.arogya)}
//                       </p>
//                     ) : (
//                       <p className="text-zinc-400 italic">माहिती उपलब्ध नाही</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Footer Info */}
//             <div className="bg-red-50 p-10 rounded-[3rem] border border-red-100 text-center space-y-4">
//               <h2 className="text-2xl font-black text-red-900 leading-tight">
//                 तुमच्या कुंडलीबद्दल अधिक जाणून घ्या
//               </h2>
//               <p className="text-red-700/80 max-w-2xl mx-auto font-medium">
//                 नासिकच्या खबरनाम्यावर मिळवा दररोजचे अचूक राशीभविष्य.
//                 तज्ज्ञांच्या मार्गदर्शनाखाली तयार केलेले हे भविष्य तुमच्या
//                 प्रगतीसाठी उपयुक्त ठरेल.
//               </p>
//               <div className="pt-4">
//                 <button className="bg-red-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest shadow-xl hover:bg-red-700 transition-all hover:scale-105 active:scale-95">
//                   संपर्क करा
//                 </button>
//               </div>
//             </div>
//           </div>
//         </main>

//         <footer className="py-12 text-center text-gray-400 text-xs border-t border-gray-100 bg-white/5 backdrop-blur">
//           <p>© 2026 नासिकचा खबरनामा. सर्व हक्क राखीव.</p>
//           <p className="mt-2 opacity-60">
//             टीप: हे भविष्य ग्रहांच्या स्थितीवर आधारित असून केवळ सामान्य
//             मार्गदर्शनासाठी आहे.
//           </p>
//         </footer>
//       </div>

//       <style jsx global>{`
//         @keyframes shimmer {
//           0% {
//             transform: translateX(-100%) skewX(-25deg);
//           }
//           100% {
//             transform: translateX(200%) skewX(-25deg);
//           }
//         }
//         .animate-spin-slow {
//           animation: spin 8s linear infinite;
//         }
//         @keyframes spin {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";

import React, { use, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { rashiData } from "@/components/rashi/RashiData";
import { getRashiById, ApiRashi } from "@/components/services/rashiService";
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
  Loader2,
} from "lucide-react";
import Link from "next/link";

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

/* -------------------- Main Content Component -------------------- */
function RashiDetailContent({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [rashiApi, setRashiApi] = useState<ApiRashi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRashi = async () => {
      try {
        setLoading(true);
        const response = await getRashiById(id);
        if (response.success) {
          setRashiApi(response.data);
        } else {
          setError(response.message || "भविष्य लोड करण्यास असमर्थ");
        }
      } catch (err) {
        setError("नेटवर्क एरर! कृपया पुन्हा प्रयत्न करा.");
      } finally {
        setLoading(false);
      }
    };
    fetchRashi();
  }, [id]);

  const staticData = rashiData.find((r) => r.name === rashiApi?.rashi);

  const handleBack = () => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      router.push(`/rashi?date=${dateParam}`);
    } else if (rashiApi?.currentDate) {
      router.push(`/rashi?date=${formatDateOnly(rashiApi.currentDate)}`);
    } else {
      router.push('/rashi');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-4">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">तुमचं भविष्य उघडत आहे...</p>
      </div>
    );
  }

  if (error || !rashiApi) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-xl space-y-6">
          <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <Shield size={40} />
          </div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">{error || "भविष्य सापडले नाही"}</h1>
          <Link href="/rashi" className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">
            <ArrowLeft size={18} /> परत जा
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Background Layer */}
      {staticData && (
        <div className="fixed inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${staticData.image})`, opacity: 0.1, zIndex: 0 }} />
      )}

      <div className="relative z-10">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <button onClick={handleBack} className="flex items-center gap-2 text-gray-800 font-bold hover:text-red-600 transition-colors">
              <ArrowLeft size={20} /> <span className="hidden sm:inline">परत</span>
            </button>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{staticData?.icon}</span>
              <h1 className="text-lg sm:text-xl font-black text-gray-900">{rashiApi.rashi} - राशीभविष्य</h1>
            </div>
            <button className="p-2.5 rounded-full bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-all border border-gray-100">
              <Share2 size={20} />
            </button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white group">
                {staticData && (
                  <img src={staticData.image} alt={rashiApi.rashi} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">{staticData?.icon}</div>
                  <h2 className="text-5xl font-black mb-1">{rashiApi.rashi}</h2>
                  <p className="text-lg opacity-80 font-bold tracking-widest uppercase">अक्षर: {rashiApi.akshar || "-"}</p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-red-200">
                  <Star size={14} fill="currentColor" className="animate-spin-slow" /> विशेष अंदाज
                </div>
                <p className="text-2xl md:text-4xl font-black text-gray-900 leading-snug italic font-serif">
                  “{stripHtml(rashiApi.description)}”
                </p>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="p-6 bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="text-zinc-400 font-black text-[10px] mb-3 flex items-center gap-2"><Calendar size={14} className="text-red-600" /> कालावधी</div>
                    <div className="text-lg font-black text-gray-900">{rashiApi.kalavadi}</div>
                  </div>
                  <div className="p-6 bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="text-zinc-400 font-black text-[10px] mb-3 flex items-center gap-2"><Zap size={14} className="text-orange-500" /> तत्व</div>
                    <div className="text-lg font-black text-gray-900">{rashiApi.tatva}</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: "शुभ ग्रह", value: rashiApi.subh_graha, color: "text-blue-600", bg: "bg-blue-50/50", icon: <Zap size={16} /> },
                { label: "भाग्यांक", value: rashiApi.bhagyank, color: "text-amber-600", bg: "bg-amber-50/50", icon: <Star size={16} /> },
                { label: "शुभ रंग", value: rashiApi.subh_ranga, color: "text-rose-600", bg: "bg-rose-50/50", icon: <Heart size={16} /> },
                { label: "जुळणारी रास", value: rashiApi.julni, color: "text-purple-600", bg: "bg-purple-50/50", icon: <Activity size={16} /> },
              ].map((stat, i) => (
                <div key={i} className={`p-8 rounded-[2.5rem] ${stat.bg} border border-white shadow-sm flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform`}>
                  <div className={`${stat.color} mb-2 opacity-50`}>{stat.icon}</div>
                  <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                </div>
              ))}
            </section>

            {/* Detail Analysis */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <DetailBox icon={<Heart size={32} />} title="प्रेम आणि नातेसंबंध" text={rashiApi.prem_ani_natesambandh} colorClass="bg-rose-50 text-rose-600" />
              <DetailBox icon={<Briefcase size={32} />} title="करिअर आणि शिक्षण" text={rashiApi.kariyar_ani_shikshan} colorClass="bg-blue-50 text-blue-600" />
              <DetailBox icon={<Coins size={32} />} title="आर्थिक स्थिती" text={rashiApi.arthik_stiti} colorClass="bg-emerald-50 text-emerald-600" />
              <DetailBox icon={<Activity size={32} />} title="आरोग्य" text={rashiApi.arogya} colorClass="bg-orange-50 text-orange-600" />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

// Sub-component for clean code
const DetailBox = ({ icon, title, text, colorClass }: any) => (
  <div className="p-10 bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm rounded-[3rem] space-y-6 group hover:shadow-xl transition-all h-full">
    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${colorClass}`}>
      {icon}
    </div>
    <div className="space-y-3">
      <h4 className="text-2xl font-black">{title}</h4>
      {text ? <p className="text-gray-600 leading-relaxed text-lg">{stripHtml(text)}</p> : <p className="text-zinc-400 italic">माहिती उपलब्ध नाही</p>}
    </div>
  </div>
);


interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RashiDetailPage({ params }: PageProps) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white font-black">लोड होत आहे...</div>}>
      <RashiDetailContent id={id} />
    </Suspense>
  );
}