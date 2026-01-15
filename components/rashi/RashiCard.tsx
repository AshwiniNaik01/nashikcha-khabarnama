
"use client";

import React from "react";
import { Rashi } from "./RashiData";
import { Star, Calendar, Users, TrendingUp } from "lucide-react";

interface RashiCardProps {
    rashi: Rashi;
}

const RashiCard: React.FC<RashiCardProps> = ({ rashi }) => {
    return (
        <div className="group relative w-full cursor-pointer transition-all duration-300 hover:-translate-y-2">
            {/* Card Container */}
            <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 group-hover:border-amber-200">
                {/* Image Container with Overlay */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={rashi.image}
                        alt={`${rashi.name} rashi`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Rashi Icon Badge */}
                    <div className="absolute top-4 left-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg backdrop-blur-sm`}>
                            {rashi.icon}
                        </div>
                    </div>

                    {/* Rashi Name */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-white drop-shadow-lg font-serif">
                                    {rashi.name}
                                </h3>
                                <p className="text-white/90 text-sm mt-1 font-medium">
                                    {rashi.sanskritName}
                                </p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                <span className="text-xs font-bold text-white">
                                    {rashi.element}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-5">
                    {/* Date Range & Letters */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={14} className="text-amber-500" />
                            <span className="text-sm font-medium">{rashi.date}</span>
                        </div>
                        <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                            <span className="text-xs font-bold">{rashi.letters}</span>
                        </div>
                    </div>

                    {/* Quick Forecast */}
                    <div className="mb-4">
                        <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <Star size={14} className="text-amber-500" />
                            आजचा भविष्य
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                            {rashi.forecast}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100">
                        <div className="text-center">
                            <div className={`text-lg font-bold ${rashi.color.split(' ')[1].replace('to-', 'text-')}`}>
                                {rashi.luckyNumber}
                            </div>
                            <div className="text-xs text-gray-500">भाग्यांक</div>
                        </div>
                        <div className="text-center">
                            <div className={`text-lg font-bold ${rashi.color.split(' ')[1].replace('to-', 'text-')}`}>
                                {rashi.luckyColor}
                            </div>
                            <div className="text-xs text-gray-500">शुभ रंग</div>
                        </div>
                        <div className="text-center">
                            <div className={`text-lg font-bold ${rashi.color.split(' ')[1].replace('to-', 'text-')}`}>
                                {rashi.compatibility}%
                            </div>
                            <div className="text-xs text-gray-500">जुळणी</div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-3 py-2.5 bg-lokmat-gradient text-white font-bold rounded-lg hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2">
                        <TrendingUp size={16} />
                        संपूर्ण भविष्य वाचा
                    </button>
                </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-300 rounded-2xl pointer-events-none transition-all duration-500" />
        </div>
    );
};

export default RashiCard;
