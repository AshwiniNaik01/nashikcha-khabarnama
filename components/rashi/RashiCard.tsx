"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Star, Calendar, TrendingUp } from "lucide-react";
// तुमच्या फाईल पाथनुसार हे चेक करा
import { rashiData } from "./RashiData";
import { ApiRashi } from "@/components/services/rashiService";

interface RashiCardProps {
    rashi: ApiRashi; // API कडून येणारा डायनॅमिक डेटा
}

const RashiCard: React.FC<RashiCardProps> = ({ rashi }) => {
    const router = useRouter();

    // API मधील 'rashi' की वापरून लोकल rashiData मधून Image आणि Icon मॅच करणे
    const staticInfo = rashiData.find((item) => item.name === rashi.rashi);

    const handleDetail = (e: React.MouseEvent) => {
        e.stopPropagation();
        // API च्या _id चा वापर करून नेव्हिगेशन
        router.push(`/rashi/${rashi._id}`);
    };

    return (
        <div
            onClick={handleDetail}
            className="group relative w-full h-full cursor-pointer transition-all duration-300 hover:-translate-y-2"
        >
            <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 group-hover:border-red-200">

                {/* Image Section - Static from RashiData */}
                <div className="relative h-48 overflow-hidden shrink-0">
                    <img
                        src={staticInfo?.image}
                        alt={`${rashi.rashi} rashi`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Rashi Icon Badge - Static from RashiData */}
                    <div className="absolute top-4 left-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg backdrop-blur-sm bg-white/10">
                            {staticInfo?.icon}
                        </div>
                    </div>

                    {/* Rashi Name & Tatva - Dynamic from API */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-white drop-shadow-lg font-serif">
                                    {rashi.rashi}
                                </h3>
                                <p className="text-white/90 text-sm mt-1 font-medium">
                                    {rashi.subh_graha} (स्वामी)
                                </p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                <span className="text-xs font-bold text-white uppercase">
                                    {rashi.tatva}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                    {/* Date Range & Letters - Dynamic from API */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1.5 text-zinc-500">
                            <Calendar size={14} className="text-red-600" />
                            <span className="text-[11px] font-bold uppercase tracking-tighter">
                                {rashi.kalavadi}
                            </span>
                        </div>
                        <div className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[10px] font-black border border-amber-100">
                            {rashi.akshar}
                        </div>
                    </div>

                    {/* Quick Forecast - Dynamic from API */}
                    <div className="mb-0">
                        <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <Star size={12} className="text-amber-500" />
                            आजचा भविष्य
                        </h4>
                        <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3 min-h-[4.5rem]">
                            {rashi.description}
                        </p>
                    </div>

                    {/* Lucky Numbers & Color - Dynamic from API */}
                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-zinc-100 mb-4">
                        <div className="text-center">
                            <div className="text-lg font-black text-zinc-800">{rashi.bhagyank}</div>
                            <div className="text-[10px] font-bold text-zinc-400 uppercase">भाग्यांक</div>
                        </div>
                        <div className="text-center border-x border-zinc-100">
                            <div className="text-sm font-black text-red-600 mt-1 truncate px-1">
                                {rashi.subh_ranga}
                            </div>
                            <div className="text-[10px] font-bold text-zinc-400 uppercase">शुभ रंग</div>
                        </div>
                        <div className="text-center">
                            <div className="text-[10px] font-black text-zinc-800 mt-2 leading-tight uppercase">
                                {rashi.julni ? rashi.julni.split(',')[0] : 'सर्व'}
                            </div>
                            <div className="text-[10px] font-bold text-zinc-400 uppercase">जुळणी</div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleDetail}
                        suppressHydrationWarning
                        className="relative w-full overflow-hidden group/btn bg-gradient-to-r from-[#800000] to-[#E1261C] text-white py-3 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 mt-auto"
                    >
                        <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                        <TrendingUp size={16} className="text-white" />
                        <span className="text-white font-black text-sm uppercase tracking-widest">
                            संपूर्ण भविष्य वाचा
                        </span>
                    </button>
                </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-300 rounded-2xl pointer-events-none transition-all duration-500" />
        </div>
    );
};

export default RashiCard;



// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { Calendar, Star } from "lucide-react";
// import { ApiRashi } from "@/components/services/rashiService";

// interface Props {
//     rashi: ApiRashi;
// }

// const RashiCard: React.FC<Props> = ({ rashi }) => {
//     const router = useRouter();

//     return (
//         <div
//             onClick={() => router.push(`/rashi/${rashi.rashi}`)}
//             className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-1 transition"
//         >
//             <h3 className="text-2xl font-black text-red-600 mb-2">
//                 {rashi.rashi}
//             </h3>

//             <p className="text-sm text-gray-600 line-clamp-3 mb-4">
//                 {rashi.description}
//             </p>

//             <div className="flex justify-between text-xs text-gray-500">
//                 <span className="flex items-center gap-1">
//                     <Calendar size={12} /> {rashi.kalavadi}
//                 </span>
//                 <span className="flex items-center gap-1">
//                     <Star size={12} /> {rashi.bhagyank}
//                 </span>
//             </div>
//         </div>
//     );
// };

// export default RashiCard;

