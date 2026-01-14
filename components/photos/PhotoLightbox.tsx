
// components/photos/PhotoLightbox.tsx

"use client";

import React, { useEffect, useState } from "react";
import {
    X,
    ChevronLeft,
    ChevronRight,
    Share2,
    Download,
    Heart,
    Eye,
    MapPin,
    Calendar,
    User,
    Tag,
    Camera,
} from "lucide-react";

/* ---------------- Types ---------------- */

interface Photo {
    id: string;
    url: string;
    title: string;
    description: string;
    category: string;
    views?: number;
    likes?: number;
    date?: string;
    location?: string;
    photographer?: string;
    tags?: string[];
    isFeatured?: boolean;
    isExclusive?: boolean;
}

interface PhotoLightboxProps {
    photo: Photo | null;
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

/* ---------------- Helpers ---------------- */

const Stat = ({ icon, label, value }: any) => (
    <div className="bg-white/5 p-4 rounded-2xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-gray-400">
            {icon} {label}
        </div>
        <div className="text-2xl font-black text-white">{value}</div>
    </div>
);

const MetaCard = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) => (
    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
            {icon}
        </div>
        <div>
            <div className="text-xs font-bold text-gray-500 uppercase mb-1">
                {label}
            </div>
            <div className="text-sm font-semibold text-gray-900">
                {value}
            </div>
        </div>
    </div>
);

/* ---------------- Component ---------------- */

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
    photo,
    isOpen,
    onClose,
    onNext,
    onPrev,
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    /* Keyboard Navigation */
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === " ") {
                e.preventDefault();
                onNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, onNext, onPrev]);

    /* Image Preload */
    useEffect(() => {
        if (!isOpen || !photo) return;

        setIsLoading(true);
        setIsLiked(false);

        const img = new Image();
        img.src = photo.url;
        img.onload = () => setIsLoading(false);
    }, [isOpen, photo]);

    if (!isOpen || !photo) return null;

    const formatNumber = (num?: number) => {
        if (!num) return "0";
        if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
        return num.toString();
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-rose-100 backdrop-blur-2xl animate-in fade-in duration-300">

            {/* Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-lokmat-red/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[520px] h-[520px] bg-blue-900/20 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 bg-white/10 hover:bg-lokmat-red p-3 rounded-full transition-all hover:rotate-90 hover:scale-110 z-[99999]"
            >
                <X size={26} />
            </button>

            {/* Desktop Navigation */}
            <button
                onClick={onPrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex bg-white/10 hover:bg-lokmat-red p-4 rounded-full z-[99999]"
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={onNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex bg-white/10 hover:bg-lokmat-red p-4 rounded-full z-[99999]"
            >
                <ChevronRight size={32} />
            </button>

            {/* Mobile Touch Zones */}
            <div className="absolute inset-0 flex md:hidden z-[99990]">
                <div className="flex-1" onClick={onPrev} />
                <div className="flex-1" onClick={onNext} />
            </div>

            {/* Main Layout */}
            <div className="relative w-full h-full max-w-[1400px] flex flex-col lg:flex-row p-4 lg:p-8 gap-8 z-[99995]">

                {/* LEFT – IMAGE (SLIDE FROM LEFT) */}
                <div className="flex-1 flex items-center justify-center opacity-0 animate-slide-left group/image">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 border-4 border-white/10 border-t-lokmat-red rounded-full animate-spin" />
                            <p className="text-white/40 text-sm font-bold tracking-widest uppercase">
                                लोड होत आहे...
                            </p>
                        </div>
                    ) : (
                        <div className="relative">
                            <img
                                src={photo.url}
                                alt={photo.title}
                                className="max-h-[85vh] w-auto object-contain rounded-2xl bg-[#111]
                shadow-[0_0_80px_-20px_rgba(255,0,0,0.4)]"
                            />

                            <div className="absolute top-4 left-4 space-y-2">
                                <span className="px-3 py-1 text-xs font-black bg-lokmat-red text-white rounded-lg">
                                    {photo.category}
                                </span>
                                {photo.isFeatured && (
                                    <span className="px-3 py-1 text-xs font-black bg-yellow-400 text-black rounded-lg">
                                        ⭐ विशेष छायाचित्र
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT – DETAILS (SLIDE FROM RIGHT) */}
                {/* RIGHT INFO PANEL – ADVANCED CLIENT STYLE */}
                <div className="hidden lg:flex ml-8 w-[400px] h-[85vh] flex-shrink-0 opacity-0 animate-slide-right [animation-delay:0.08s]">
                    <div className="w-full h-full bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

                        {/* Header */}
                        <div className="p-6 bg-gradient-to-r from-lokmat-red to-orange-500 text-white">
                            <div className="flex items-center gap-2 text-xs font-black tracking-widest uppercase">
                                <Camera size={16} />
                                दृश्य कथा
                            </div>

                            <h2 className="text-2xl font-bold font-serif mt-3 leading-snug">
                                {photo.title}
                            </h2>
                        </div>

                        {/* Scrollable Content */}
                        <div className="p-6 overflow-y-auto h-[calc(85vh-200px)] space-y-6">

                            {/* Description */}
                            <div>
                                <p className="text-gray-700 leading-relaxed border-l-4 border-lokmat-red pl-4">
                                    {photo.description}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-100">
                                    <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase">
                                        <Eye size={16} />
                                        दृश्ये
                                    </div>
                                    <div className="text-2xl font-black text-gray-900 mt-2">
                                        {formatNumber(photo.views)}
                                    </div>
                                </div>

                                <div
                                    onClick={() => setIsLiked(!isLiked)}
                                    className="cursor-pointer bg-gradient-to-br from-rose-50 to-pink-50 p-4 rounded-2xl border border-rose-100 transition-all hover:scale-[1.02]"
                                >
                                    <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase">
                                        <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                                        आवडी
                                    </div>
                                    <div className="text-2xl font-black text-gray-900 mt-2">
                                        {formatNumber((photo.likes || 0) + (isLiked ? 1 : 0))}
                                    </div>
                                </div>
                            </div>

                            {/* Metadata */}
                            <div className="space-y-4">
                                {photo.location && (
                                    <MetaCard
                                        icon={<MapPin size={18} />}
                                        label="स्थान"
                                        value={photo.location}
                                    />
                                )}

                                {photo.date && (
                                    <MetaCard
                                        icon={<Calendar size={18} />}
                                        label="तारीख"
                                        value={photo.date}
                                    />
                                )}

                                {photo.photographer && (
                                    <MetaCard
                                        icon={<User size={18} />}
                                        label="छायाचित्रकार"
                                        value={photo.photographer}
                                    />
                                )}
                            </div>

                            {/* Tags */}
                            {(photo.tags?.length ?? 0) > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 mb-2">
                                        <Tag size={14} />
                                        संबंधित विषय
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {photo.tags!.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-xs font-medium text-lokmat-red bg-rose-50 border border-rose-100 rounded-full"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-100 bg-white">
                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-lokmat-red to-orange-500 text-white font-bold rounded-xl hover:scale-[1.02] transition-all">
                                    <Share2 size={18} />
                                    शेअर
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-bold rounded-xl hover:scale-[1.02] transition-all">
                                    <Download size={18} />
                                    सेव्ह
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* Mobile Bottom Nav */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 md:hidden z-[99999]">
                <button onClick={onPrev} className="px-6 py-3 bg-black/60 text-white rounded-full">
                    मागील
                </button>
                <button onClick={onNext} className="px-6 py-3 bg-lokmat-red text-white rounded-full">
                    पुढील
                </button>
            </div>
        </div>
    );
};

export default PhotoLightbox;




// "use client";

// import React, { useEffect, useState } from 'react';
// import { X, ChevronLeft, ChevronRight, Share2, Download, Heart, Eye, MapPin, Calendar, User, Tag, Camera } from 'lucide-react';

// interface Photo {
//     id: string;
//     url: string;
//     title: string;
//     description: string;
//     category: string;
//     views?: number;
//     likes?: number;
//     date?: string;
//     location?: string;
//     photographer?: string;
//     tags?: string[];
//     isFeatured?: boolean;
//     isExclusive?: boolean;
// }

// interface PhotoLightboxProps {
//     photo: Photo | null;
//     isOpen: boolean;
//     onClose: () => void;
//     onNext: () => void;
//     onPrev: () => void;
// }

// const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photo, isOpen, onClose, onNext, onPrev }) => {
//     const [isLiked, setIsLiked] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             if (!isOpen) return;
//             if (e.key === 'Escape') onClose();
//             if (e.key === 'ArrowRight') onNext();
//             if (e.key === 'ArrowLeft') onPrev();
//             if (e.key === ' ') {
//                 e.preventDefault();
//                 onNext();
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, [isOpen, onClose, onNext, onPrev]);

//     useEffect(() => {
//         if (isOpen && photo) {
//             setIsLoading(true);
//             const img = new Image();
//             img.src = photo.url;
//             img.onload = () => setIsLoading(false);
//         }
//     }, [isOpen, photo]);

//     if (!isOpen || !photo) return null;

//     const formatNumber = (num?: number) => {
//         if (!num) return '0';
//         if (num >= 1000) {
//             return `${(num / 1000).toFixed(1)}k`;
//         }
//         return num.toString();
//     };

//     return (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-2xl animate-in fade-in duration-300">
//             {/* Ambient Background Glow */}
//             <div className="absolute inset-0 pointer-events-none overflow-hidden">
//                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lokmat-red/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
//                 <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
//             </div>

//             {/* Close Button */}
//             <button
//                 onClick={onClose}
//                 className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/5 hover:bg-lokmat-red p-3 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90 z-[99999] group border border-white/5 hover:border-transparent"
//                 aria-label="Close"
//             >
//                 <X size={26} className="group-hover:drop-shadow-lg" />
//             </button>

//             {/* Navigation Buttons */}
//             <button
//                 onClick={(e) => { e.stopPropagation(); onPrev(); }}
//                 className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-white/5 hover:bg-lokmat-red p-4 rounded-full transition-all duration-300 hover:scale-110 hidden md:flex border border-white/5 hover:border-transparent z-[99999]"
//                 aria-label="Previous photo"
//             >
//                 <ChevronLeft size={32} />
//             </button>
//             <button
//                 onClick={(e) => { e.stopPropagation(); onNext(); }}
//                 className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-white/5 hover:bg-lokmat-red p-4 rounded-full transition-all duration-300 hover:scale-110 hidden md:flex border border-white/5 hover:border-transparent z-[99999]"
//                 aria-label="Next photo"
//             >
//                 <ChevronRight size={32} />
//             </button>

//             {/* Touch Navigation for Mobile */}
//             <div className="absolute inset-0 flex md:hidden z-[99990]">
//                 <div className="flex-1" onClick={onPrev} />
//                 <div className="flex-1" onClick={onNext} />
//             </div>

//             {/* Main Content */}
//             <div className="relative w-full h-full max-w-[1400px] flex flex-col lg:flex-row p-4 lg:p-8 gap-8 z-[99995]">
//                 {/* Left Column - Image */}
//                 <div className="flex-1 flex items-center justify-center relative group/image">
//                     <div className="relative w-full h-full max-h-[85vh] flex items-center justify-center">
//                         {isLoading ? (
//                             <div className="flex flex-col items-center justify-center gap-4">
//                                 <div className="relative">
//                                     <div className="w-16 h-16 border-4 border-white/10 border-t-lokmat-red rounded-full animate-spin" />
//                                     <div className="absolute inset-0 flex items-center justify-center">
//                                         <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
//                                     </div>
//                                 </div>
//                                 <p className="text-white/40 text-sm font-medium tracking-wider uppercase">लोड होत आहे...</p>
//                             </div>
//                         ) : (
//                             <div className="relative w-full h-full flex items-center justify-center">
//                                 <img
//                                     src={photo.url}
//                                     alt={photo.title}
//                                     className="max-h-[85vh] w-auto object-contain rounded-xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] bg-[#111]"
//                                     onClick={(e) => e.stopPropagation()}
//                                 />

//                                 {/* Badges on Image (Floating) */}
//                                 <div className="absolute top-4 left-4 flex flex-col gap-2 transition-opacity duration-300 opacity-0 group-hover/image:opacity-100">
//                                     <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-lokmat-red/90 backdrop-blur-md rounded-lg shadow-lg">
//                                         {photo.category}
//                                     </span>
//                                     {photo.isFeatured && (
//                                         <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black bg-yellow-400/90 backdrop-blur-md rounded-lg shadow-lg flex items-center gap-1">
//                                             ⭐ विशेष
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Right Column - Details Panel */}
//                 <div className="lg:w-[400px] flex flex-col h-full max-h-[85vh]">
//                     <div className="bg-[#111]/80 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden flex flex-col h-full shadow-2xl">
//                         {/* Scrollable Content */}
//                         <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

//                             {/* Header Info */}
//                             <div className="space-y-4">
//                                 <div className="flex items-center gap-3 text-lokmat-red text-xs font-black tracking-widest uppercase">
//                                     <Camera size={14} />
//                                     <span>Visual Story</span>
//                                 </div>
//                                 <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight font-serif tracking-wide">
//                                     {photo.title}
//                                 </h2>
//                                 <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-white/10 pl-4">
//                                     {photo.description}
//                                 </p>
//                             </div>

//                             {/* Stats Grid */}
//                             <div className="grid grid-cols-2 gap-3">
//                                 <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group">
//                                     <div className="flex items-center gap-2 text-gray-400 group-hover:text-white/80 transition-colors mb-2">
//                                         <Eye size={16} />
//                                         <span className="text-xs font-bold uppercase tracking-wider">दृश्ये</span>
//                                     </div>
//                                     <div className="text-2xl font-black text-white">
//                                         {formatNumber(photo.views)}
//                                     </div>
//                                 </div>
//                                 <div
//                                     className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
//                                     onClick={() => setIsLiked(!isLiked)}
//                                 >
//                                     <div className="flex items-center gap-2 text-gray-400 group-hover:text-white/80 transition-colors mb-2">
//                                         <Heart size={16} className={isLiked ? "text-red-500 fill-red-500" : ""} />
//                                         <span className="text-xs font-bold uppercase tracking-wider">आवडी</span>
//                                     </div>
//                                     <div className="flex items-end gap-2">
//                                         <span className={`text-2xl font-black ${isLiked ? "text-red-500" : "text-white"}`}>
//                                             {formatNumber((photo.likes || 0) + (isLiked ? 1 : 0))}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Meta Lists */}
//                             <div className="space-y-4 py-6 border-t border-b border-white/5">
//                                 {photo.location && (
//                                     <div className="flex items-center gap-4 text-gray-300 group">
//                                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-lokmat-red group-hover:text-white transition-all">
//                                             <MapPin size={14} />
//                                         </div>
//                                         <div className="flex-1">
//                                             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">स्थान</p>
//                                             <p className="text-sm font-medium text-white">{photo.location}</p>
//                                         </div>
//                                     </div>
//                                 )}
//                                 {photo.date && (
//                                     <div className="flex items-center gap-4 text-gray-300 group">
//                                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-lokmat-red group-hover:text-white transition-all">
//                                             <Calendar size={14} />
//                                         </div>
//                                         <div className="flex-1">
//                                             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">तारीख</p>
//                                             <p className="text-sm font-medium text-white">{photo.date}</p>
//                                         </div>
//                                     </div>
//                                 )}
//                                 {photo.photographer && (
//                                     <div className="flex items-center gap-4 text-gray-300 group">
//                                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-lokmat-red group-hover:text-white transition-all">
//                                             <User size={14} />
//                                         </div>
//                                         <div className="flex-1">
//                                             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">छायाचित्रकार</p>
//                                             <p className="text-sm font-medium text-white">{photo.photographer}</p>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Tags */}
//                             {photo.tags && photo.tags.length > 0 && (
//                                 <div>
//                                     <div className="flex items-center gap-2 mb-3 text-gray-500 text-xs font-bold uppercase tracking-wider">
//                                         <Tag size={12} />
//                                         <span>संबंधित विषय</span>
//                                     </div>
//                                     <div className="flex flex-wrap gap-2">
//                                         {photo.tags.map((tag, index) => (
//                                             <span
//                                                 key={index}
//                                                 className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full transition-colors cursor-default"
//                                             >
//                                                 #{tag}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Sticky Action Footer */}
//                         <div className="p-4 bg-[#0a0a0a]/50 backdrop-blur-md border-t border-white/5 grid grid-cols-2 gap-3">
//                             <button className="flex items-center justify-center gap-2 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95">
//                                 <Share2 size={18} />
//                                 <span className="text-sm">शेअर</span>
//                             </button>
//                             <button className="flex items-center justify-center gap-2 py-3 bg-[#1a1a1a] text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all active:scale-95">
//                                 <Download size={18} />
//                                 <span className="text-sm">सेव्ह करा</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom Navigation for Mobile */}
//             <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 md:hidden z-[99999]">
//                 <button
//                     onClick={onPrev}
//                     className="px-6 py-3 bg-black/60 text-white rounded-full backdrop-blur-md border border-white/10 active:scale-95 transition-transform"
//                 >
//                     मागील
//                 </button>
//                 <button
//                     onClick={onNext}
//                     className="px-6 py-3 bg-lokmat-red text-white rounded-full shadow-lg shadow-red-900/20 active:scale-95 transition-transform"
//                 >
//                     पुढील
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PhotoLightbox;
