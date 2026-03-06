"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, Share2, Compass, Camera, MapPin } from "lucide-react";
import { getCategoryLabel } from "@/components/constants/categories";
import { likeGalleryItem } from "@/components/services/galleryServices";

interface PhotoCardProps {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  location?: string;
  aspectRatio?: "square" | "wide" | "tall";
  onClick: () => void;
  likes?: number;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  id,
  url,
  title,
  description,
  category,
  location,
  aspectRatio = "square",
  onClick,
  likes: initialLikes = 0,
}) => {
  const router = useRouter();


  const [isLiked, setIsLiked] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`like_${id}`) === "true";
    }
    return false;
  });

  const [likes, setLikes] = useState(initialLikes);
  const [isHovered, setIsHovered] = useState(false);


  useEffect(() => {
    setLikes(initialLikes);
  }, [initialLikes]);


  const stripHtml = (text: string) => text?.replace(/<[^>]*>?/gm, "") || "";

  const spanClasses = {
    square: "col-span-1 row-span-1",
    wide: "col-span-2 row-span-1 md:col-span-2 md:row-span-2",
    tall: "col-span-1 row-span-2",
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();


    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);


    if (typeof window !== "undefined") {
      localStorage.setItem(`like_${id}`, newIsLiked.toString());
    }

    try {

      const response = await likeGalleryItem(id);
      if (response.success) {

        setLikes(response.data.likes);
      }
    } catch (error) {
      console.error("Like failed", error);

      setIsLiked(isLiked);
      if (typeof window !== "undefined") {
        localStorage.setItem(`like_${id}`, isLiked.toString());
      }
    }
  };


  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title, text: stripHtml(description), url });
    } else {
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
      <div
        onClick={onClick}
        className="relative overflow-hidden rounded-xl cursor-pointer bg-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
      >
        <div className="absolute inset-0 p-[2px] rounded-[2rem] bg-gradient-to-br from-white/50 via-transparent to-black/10 z-10 pointer-events-none" />
        <div className={`absolute -inset-10 bg-gradient-to-br from-red-600/20 via-transparent to-red-900/20 blur-2xl transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`} />

        <div className={`relative overflow-hidden ${aspectRatio === 'tall' ? 'aspect-[3/4]' : aspectRatio === 'wide' ? 'aspect-video' : 'aspect-square'} bg-gray-200`}>
          <img
            src={url}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)] ${isHovered ? "scale-110" : "scale-100"}`}
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />
          <div className="absolute top-4 left-4 z-20">
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white bg-black/40 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
              <Camera size={12} className="text-white/80" />
              {getCategoryLabel(category)}
            </span>
          </div>
        </div>
      </div>

      <div className="px-1 flex flex-col gap-3">
        <div>
          <h3 className="text-gray-900 font-bold text-lg leading-tight group-hover:text-red-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-1 mt-1 font-medium">
            {stripHtml(description)}
          </p>

          {location && (
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
              <MapPin size={12} />
              {location}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            className={`group/btn relative flex-1 h-[48px] flex items-center justify-center rounded-xl transition-all duration-500 overflow-hidden border ${isLiked
              ? "bg-red-600 border-red-600 text-white shadow-[0_8px_20px_-6px_rgba(237,27,36,0.5)]"
              : "bg-white text-gray-700 border-gray-200 shadow-md hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              }`}
          >
            <div className={`absolute inset-0 bg-white/20 transition-transform duration-500 transform -translate-x-full group-hover/btn:translate-x-full`} />
            <div className="relative inline-flex items-center justify-center">
              <Heart size={22} fill={isLiked ? "white" : "none"} className={`transition-all duration-500 ${isLiked ? "scale-110 active:scale-125" : "group-hover/btn:scale-110"}`} />
              {likes > 0 && (
                <span className={`absolute -top-1 -right-3 min-w-[16px] h-[16px] flex items-center justify-center text-[9px] font-black rounded-full shadow-sm rounded-full px-1 ${isLiked ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                  }`}>
                  {likes > 99 ? '99+' : likes}
                </span>
              )}
            </div>
          </button>

          <button onClick={handleShare} className="group/btn relative flex-1 h-[48px] flex items-center justify-center rounded-xl bg-white text-blue-600 border border-gray-200 shadow-md hover:bg-blue-50 hover:border-blue-300 transition-all duration-500">
            <Share2 size={18} className="transition-transform duration-500 group-hover/btn:rotate-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;