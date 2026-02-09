"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Share2, Compass, Maximize2, Camera } from "lucide-react";

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
  const [isHovered, setIsHovered] = useState(false);

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
      // Fallback: Copy to clipboard or simple alert
      navigator.clipboard.writeText(url);
      alert("लिंक कॉपी केली!");
    }
  };

  const handleMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/");
  };

  return (
    <div
      className={`group flex flex-col gap-3 h-full transition-all duration-500 ${spanClasses[aspectRatio]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo Container */}
      <div
        onClick={onClick}
        className="relative overflow-hidden rounded-[2rem] cursor-pointer bg-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
      >
        {/* Modern Gradient Border for Premium feel */}
        <div className="absolute inset-0 p-[2px] rounded-[2rem] bg-gradient-to-br from-white/50 via-transparent to-black/10 z-10 pointer-events-none" />

        {/* Background Glow on hover */}
        <div className={`absolute -inset-10 bg-gradient-to-br from-lokmat-red/20 via-transparent to-lokmat-maroon/20 blur-2xl transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`} />

        {/* Image wrapper with specific height based on aspect ratio if needed, or flexible */}
        <div className={`relative overflow-hidden ${aspectRatio === 'tall' ? 'aspect-[3/4]' : aspectRatio === 'wide' ? 'aspect-video' : 'aspect-square'} bg-gray-200`}>
          <img
            src={url}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)] ${isHovered ? "scale-110" : "scale-100"
              }`}
            loading="lazy"
          />

          {/* Glassmorphism Overlays */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />

          {/* Category Badge - Always visible but more refined */}
          <div className="absolute top-4 left-4 z-20">
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white bg-black/40 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
              <Camera size={12} className="text-white/80" />
              {category}
            </span>
          </div>

          {/* Quick Info Overlay (Shown on hover) */}
          <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 transform ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-white/70 uppercase tracking-widest font-medium">लोकमत फोटो</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-lokmat-red transition-colors">
                  <Maximize2 size={16} className="text-white group-hover:text-inherit" />
                </div>
              </div>
              <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">{title}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Info & Actions Below Image (For better usability) */}
      <div className="px-1 flex flex-col gap-3">
        {/* Title and Description - Hidden when hovered to prioritize image content, or kept for clarity? 
            Let's keep it but make it neat. */}
        <div>
          <h3 className="text-gray-900 font-bold text-lg leading-tight group-hover:text-lokmat-red transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-1 mt-1 font-medium">
            {description}
          </p>
        </div>

        {/* Premium Action Toolbar */}
        <div className="flex items-center gap-2">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`group/btn relative flex-[1.5] flex items-center justify-center gap-2 py-3.5 rounded-2xl transition-all duration-500 overflow-hidden ${isLiked
              ? "bg-lokmat-red text-white shadow-[0_8px_20px_-6px_rgba(237,27,36,0.4)]"
              : "bg-white text-gray-700 border border-gray-100 hover:border-lokmat-red/30 hover:bg-gray-50 shadow-sm"
              }`}
          >
            <div className={`absolute inset-0 bg-white/20 transition-transform duration-500 transform -translate-x-full group-hover/btn:translate-x-full`} />
            <Heart
              size={18}
              fill={isLiked ? "white" : "none"}
              className={`transition-all duration-500 ${isLiked ? "scale-110 active:scale-125" : "group-hover/btn:scale-110"}`}
            />
            <span className="text-xs font-black uppercase tracking-wider">{isLiked ? "आवडले" : "लाईक"}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="group/btn h-[48px] px-5 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-sm hover:shadow-blue-200"
            title="शेअर करा"
          >
            <Share2 size={18} className="transition-transform duration-500 group-hover/btn:rotate-12" />
          </button>

          {/* Explore Button */}
          <button
            onClick={handleMore}
            className="group/btn h-[48px] px-5 flex items-center justify-center rounded-2xl bg-gray-900 text-white hover:bg-black transition-all duration-500 shadow-md hover:shadow-black/20"
            title="अधिक पहा"
          >
            <Compass size={18} className="transition-transform duration-1000 group-hover/btn:rotate-[360deg]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;