"use client";

import React from "react";
import { Rashi } from "./RashiData";

interface RashiCardProps {
    rashi: Rashi;
}

const RashiCard: React.FC<RashiCardProps> = ({ rashi }) => {
    return (
        <div className="group relative w-full h-64 perspective-1000 cursor-pointer">
            <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl rounded-2xl">

                {/* Front Side */}
                <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${rashi.color} rounded-2xl p-6 flex flex-col items-center justify-center text-white [backface-visibility:hidden] shadow-lg border border-white/20`}>
                    <div className="text-6xl mb-4 filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
                        {rashi.icon}
                    </div>
                    <h3 className="text-3xl font-black tracking-wide uppercase drop-shadow-sm font-serif">
                        {rashi.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium opacity-90 tracking-wider">
                        {rashi.date}
                    </p>
                    <div className="absolute bottom-4 text-xs font-bold bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        भविष्य पाहण्यासाठी करा
                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] border-2 border-lokmat-red shadow-2xl">
                    <h4 className="text-2xl font-bold text-lokmat-red mb-3 font-serif line-clamp-1 border-b-2 border-lokmat-red/10 pb-2 w-full">
                        {rashi.name} राशीभविष्य
                    </h4>
                    <p className="text-gray-700 font-medium leading-relaxed overflow-hidden">
                        {rashi.forecast}
                    </p>
                    <button className="mt-4 px-4 py-2 bg-lokmat-red text-white text-sm font-bold rounded-lg shadow-md hover:bg-red-700 transition-colors">
                        सविस्तर वाचा
                    </button>

                    {/* Decorative Elements */}
                    <div className="absolute top-2 right-2 text-lokmat-red opacity-10 text-4xl">
                        {rashi.icon}
                    </div>
                    <div className="absolute bottom-2 left-2 text-lokmat-red opacity-10 text-4xl">
                        {rashi.icon}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RashiCard;
