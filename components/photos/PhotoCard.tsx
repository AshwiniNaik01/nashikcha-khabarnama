// // components/photos/PhotoCard.tsx
// "use client";

// import React from 'react';
// import { Maximize2, Camera } from 'lucide-react';

// interface PhotoCardProps {
//     id: string;
//     url: string;
//     title: string;
//     description: string;
//     category: string;
//     aspectRatio?: 'square' | 'wide' | 'tall';
//     onClick: () => void;
// }

// const PhotoCard: React.FC<PhotoCardProps> = ({ url, title, description, category, aspectRatio = 'square', onClick }) => {
//     // Dynamic classes based on aspect ratio for grid spanning
//     const spanClasses = {
//         square: 'col-span-1 row-span-1',
//         wide: 'col-span-2 row-span-1 md:col-span-2 md:row-span-2',
//         tall: 'col-span-1 row-span-2',
//     };

//     return (
//         <div
//             onClick={onClick}
//             className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-gray-100 ${spanClasses[aspectRatio]}`}
//         >
//             <img
//                 src={url}
//                 alt={title}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 loading="lazy"
//             />

//             {/* Gradient Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//             {/* Content Content */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                 <div className="flex justify-between items-end">
//                     <div>
//                         <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold uppercase tracking-wider text-white bg-lokmat-red rounded-sm">
//                             {category}
//                         </span>
//                         <h3 className="text-white font-bold text-lg leading-tight mb-1">{title}</h3>
//                         <p className="text-white/80 text-xs line-clamp-2">{description}</p>
//                     </div>
//                     <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-lokmat-red transition-colors">
//                         <Maximize2 size={16} />
//                     </div>
//                 </div>
//             </div>

//             {/* Icon for non-hover state hint */}
//             <div className="absolute top-4 right-4 text-white/50 group-hover:opacity-0 transition-opacity">
//                 <Camera size={16} />
//             </div>
//         </div>
//     );
// };

// export default PhotoCard;


// // components/photos/PhotoCard.tsx
// // "use client";

// // import React, { useState } from 'react';
// // import { Maximize2, Camera, Eye, Heart, MapPin, Calendar } from 'lucide-react';

// // interface PhotoCardProps {
// //     id: string;
// //     url: string;
// //     title: string;
// //     description: string;
// //     category: string;
// //     aspectRatio?: 'square' | 'wide' | 'tall';
// //     views: number;
// //     likes: number;
// //     date: string;
// //     location: string;
// //     photographer: string;
// //     tags: string[];
// //     isFeatured?: boolean;
// //     isExclusive?: boolean;
// //     onClick: () => void;
// // }

// // const PhotoCard: React.FC<PhotoCardProps> = ({
// //     url,
// //     title,
// //     description,
// //     category,
// //     aspectRatio = 'square',
// //     views,
// //     likes,
// //     date,
// //     location,
// //     photographer,
// //     tags,
// //     isFeatured,
// //     isExclusive,
// //     onClick
// // }) => {
// //     const [isLiked, setIsLiked] = useState(false);
// //     const [isHovered, setIsHovered] = useState(false);

// //     // Dynamic classes based on aspect ratio for grid spanning
// //     const spanClasses = {
// //         square: 'col-span-1 row-span-1',
// //         wide: 'col-span-1 md:col-span-2 row-span-1',
// //         tall: 'col-span-1 row-span-1 md:row-span-2'
// //     };

// //     const formatNumber = (num: number) => {
// //         if (num >= 1000) {
// //             return `${(num / 1000).toFixed(1)}k`;
// //         }
// //         return num.toString();
// //     };

// //     return (
// //         <div
// //             className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-gray-900 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${spanClasses[aspectRatio]}`}
// //             onMouseEnter={() => setIsHovered(true)}
// //             onMouseLeave={() => setIsHovered(false)}
// //             onClick={onClick}
// //         >
// //             {/* Image with Loading State */}
// //             <div className="relative w-full h-full overflow-hidden">
// //                 <img
// //                     src={url}
// //                     alt={title}
// //                     className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
// //                     loading="lazy"
// //                     onLoad={() => { }}
// //                 />

// //                 {/* Gradient Overlay */}
// //                 <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-80' : 'opacity-50'}`} />

// //                 {/* Pattern Overlay */}
// //                 <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
// //                     style={{
// //                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
// //                     }}
// //                 />
// //             </div>

// //             {/* Badges */}
// //             <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
// //                 <div className="flex flex-wrap gap-2">
// //                     <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-[#ed1b24] rounded-full">
// //                         {category}
// //                     </span>
// //                     {isFeatured && (
// //                         <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-black bg-yellow-400 rounded-full flex items-center gap-1">
// //                             ⭐ विशेष
// //                         </span>
// //                     )}
// //                     {isExclusive && (
// //                         <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-purple-600 rounded-full">
// //                             🔒 एक्सक्लुझिव
// //                         </span>
// //                     )}
// //                 </div>

// //                 <div className="bg-black/40 backdrop-blur-sm rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
// //                     <Maximize2 size={18} />
// //                 </div>
// //             </div>

// //             {/* Content */}
// //             <div className={`absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-10'}`}>
// //                 <h3 className="text-white font-bold text-xl lg:text-2xl leading-tight mb-3 line-clamp-2 drop-shadow-lg">
// //                     {title}
// //                 </h3>

// //                 <p className="text-white/90 text-sm mb-4 line-clamp-2">
// //                     {description}
// //                 </p>

// //                 {/* Meta Information */}
// //                 <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/20">
// //                     <div className="flex items-center gap-4">
// //                         <div className="flex items-center gap-1.5 text-white/80 text-sm">
// //                             <Eye size={14} />
// //                             <span>{formatNumber(views)}</span>
// //                         </div>
// //                         <button
// //                             onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 setIsLiked(!isLiked);
// //                             }}
// //                             className={`flex items-center gap-1.5 text-sm transition-colors ${isLiked ? 'text-red-400' : 'text-white/80 hover:text-red-400'}`}
// //                         >
// //                             <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
// //                             <span>{formatNumber(likes + (isLiked ? 1 : 0))}</span>
// //                         </button>
// //                     </div>

// //                     <div className="text-white/70 text-xs flex items-center gap-2">
// //                         <div className="flex items-center gap-1">
// //                             <MapPin size={12} />
// //                             <span className="truncate max-w-[100px]">{location}</span>
// //                         </div>
// //                         <div className="flex items-center gap-1">
// //                             <Calendar size={12} />
// //                             <span>{date}</span>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* Tags */}
// //                 {tags.length > 0 && (
// //                     <div className="flex flex-wrap gap-1.5 mt-3">
// //                         {tags.slice(0, 3).map((tag, index) => (
// //                             <span
// //                                 key={index}
// //                                 className="px-2 py-0.5 text-[10px] text-white/70 bg-white/10 rounded-full"
// //                             >
// //                                 #{tag}
// //                             </span>
// //                         ))}
// //                         {tags.length > 3 && (
// //                             <span className="px-2 py-0.5 text-[10px] text-white/70 bg-white/10 rounded-full">
// //                                 +{tags.length - 3}
// //                             </span>
// //                         )}
// //                     </div>
// //                 )}

// //                 {/* Photographer Credit */}
// //                 <div className="mt-3 text-xs text-white/60">
// //                     फोटोग्राफर: <span className="font-medium">{photographer}</span>
// //                 </div>
// //             </div>

// //             {/* Quick View Indicator */}
// //             <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/80 transition-all duration-300 ${isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
// //                 <div className="bg-black/40 backdrop-blur-sm p-3 rounded-full">
// //                     <Camera size={20} />
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default PhotoCard;

// components/photos/PhotoCard.tsx
"use client";

import React, { useState } from "react";
import { Maximize2, Camera, Heart, Share2, Home } from "lucide-react";
import { useRouter } from "next/navigation";

interface PhotoCardProps {
    id: string;
    url: string;
    title: string;
    description: string;
    category: string;
    aspectRatio?: "square" | "wide" | "tall";
    onClick: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
    url,
    title,
    description,
    category,
    aspectRatio = "square",
    onClick,
}) => {
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);

    const spanClasses = {
        square: "col-span-1 row-span-1",
        wide: "col-span-2 row-span-1 md:col-span-2 md:row-span-2",
        tall: "col-span-1 row-span-2",
    };

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({ title, text: description, url });
        } else {
            alert("शेअर करण्यास समर्थ नाही.");
        }
    };

    const handleHome = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push("/");
    };

    return (
        <div
            onClick={onClick}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-gray-100 ${spanClasses[aspectRatio]}`}
        >
            <img
                src={url}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex justify-between items-end">
                    <div>
                        <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold uppercase tracking-wider text-white bg-lokmat-red rounded-sm">
                            {category}
                        </span>
                        <h3 className="text-white font-bold text-lg leading-tight mb-1">
                            {title}
                        </h3>
                        <p className="text-white/80 text-xs line-clamp-2">{description}</p>
                    </div>

                    {/* Maximize Icon */}
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-lokmat-red transition-colors">
                        <Maximize2 size={16} />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-3 flex flex-wrap gap-2 justify-start items-center">
                    {/* Like */}
                    <button
                        type="button"
                        onClick={handleLike}
                        suppressHydrationWarning
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all duration-300 ${isLiked
                            ? "bg-white text-lokmat-red shadow-lg active:scale-95"
                            : "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20"
                            }`}
                    >
                        <Heart size={14} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "animate-pulse" : ""} />
                        लाइक
                    </button>

                    {/* Share */}
                    <button
                        type="button"
                        onClick={handleShare}
                        suppressHydrationWarning
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-[10px] font-black uppercase tracking-wider bg-lokmat-red text-white rounded-xl hover:bg-lokmat-maroon shadow-lg transition-all active:scale-95 border border-lokmat-red/10"
                    >
                        <Share2 size={14} />
                        शेअर
                    </button>

                    {/* Home */}
                    <button
                        type="button"
                        onClick={handleHome}
                        suppressHydrationWarning
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-[10px] font-black uppercase tracking-wider bg-white/10 text-white backdrop-blur-md border border-white/20 rounded-xl hover:bg-white hover:text-black transition-all active:scale-95"
                    >
                        <Home size={14} />
                        अधिक
                    </button>
                </div>
            </div>

            {/* Icon for non-hover state hint */}
            <div className="absolute top-4 right-4 text-white/50 group-hover:opacity-0 transition-opacity">
                <Camera size={16} />
            </div>
        </div>
    );
};

export default PhotoCard;
