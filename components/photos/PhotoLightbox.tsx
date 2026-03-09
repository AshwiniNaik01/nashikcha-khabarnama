"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Share2, Heart, Eye, MapPin, Calendar, User, Tag, Camera } from "lucide-react";
import { getCategoryLabel } from "@/components/constants/categories";
import { viewGalleryItem, likeGalleryItem } from "@/components/services/galleryServices";

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
}

interface PhotoLightboxProps {
  photos: Photo[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photos, initialIndex = 0, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<0 | 1 | -1>(0);

  // स्थानिक स्टेट: रिफ्रेश झाल्यावर लाईक स्थिती टिकवण्यासाठी localStorage वापरा
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const stripHtml = (text: string) => text?.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ") || "";

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('mr-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setDirection(0);
      setIsTransitioning(false);

      // १. लाईक स्टेट लोड करा आणि लाईक काउंट सेट करा
      const currentPhoto = photos[initialIndex];
      setLikeCount(currentPhoto.likes || 0);
      if (typeof window !== "undefined") {
        setIsLiked(localStorage.getItem(`like_${currentPhoto.id}`) === "true");
      }

      // २. Lightbox उघडल्यावर View Count अपडेट करा
      viewGalleryItem(currentPhoto.id).catch(console.error);
    }
  }, [isOpen, initialIndex, photos]);

  const handleNext = useCallback(() => {
    if (isTransitioning || photos.length <= 1) return;
    setDirection(1);
    setIsTransitioning(true);
  }, [isTransitioning, photos.length]);

  const handlePrev = useCallback(() => {
    if (isTransitioning || photos.length <= 1) return;
    setDirection(-1);
    setIsTransitioning(true);
  }, [isTransitioning, photos.length]);

  const handleTransitionEnd = () => {
    if (!isTransitioning) return;
    let newIndex = currentIndex;
    if (direction === 1) newIndex = (currentIndex + 1) % photos.length;
    else if (direction === -1) newIndex = (currentIndex - 1 + photos.length) % photos.length;

    setCurrentIndex(newIndex);
    setDirection(0);
    setIsTransitioning(false);


    const nextPhoto = photos[newIndex];
    viewGalleryItem(nextPhoto.id).catch(console.error);
    setLikeCount(nextPhoto.likes || 0);
    if (typeof window !== "undefined") {
      setIsLiked(localStorage.getItem(`like_${nextPhoto.id}`) === "true");
    }
  };


  const handleLike = async () => {
    const currentPhoto = photos[currentIndex];
    const newIsLiked = !isLiked;


    setIsLiked(newIsLiked);
    setLikeCount(prev => newIsLiked ? prev + 1 : prev - 1);

    if (typeof window !== "undefined") {
      localStorage.setItem(`like_${currentPhoto.id}`, newIsLiked.toString());
    }

    try {
      await likeGalleryItem(currentPhoto.id);
    } catch (error) {
      console.error("Like failed", error);

      setIsLiked(isLiked);
      setLikeCount(currentPhoto.likes || 0);
    }
  };

  const handleShareClick = (photo: Photo) => {
    if (navigator.share) {
      navigator.share({
        title: photo.title,
        text: stripHtml(photo.description),
        url: photo.url
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(photo.url);
      alert("लिंक कॉपी केली!");
    }
  };

  if (!isOpen || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  const renderCardContent = (photo: Photo) => (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-white shadow-2xl flex flex-col md:flex-row border border-white/20">
      <div className="absolute -inset-24 bg-black/90 blur-[120px] pointer-events-none" />
      <div className="relative w-full md:w-[60%] lg:w-[65%] h-[40%] md:h-full bg-black/5 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30 blur-3xl scale-110" style={{ backgroundImage: `url(${photo.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <img src={photo.url} alt={photo.title} className="relative z-10 w-full h-full object-contain p-0" />
        <div className="absolute top-4 left-4 lg:top-8 lg:left-8 space-y-2 z-20">
          <span className="inline-block px-4 py-1.5 text-xs font-black bg-red-600 text-white rounded-full shadow-xl tracking-wider uppercase"> {getCategoryLabel(photo.category)}</span>
        </div>
      </div>

      <div className="w-full md:w-[40%] lg:w-[35%] h-[60%] md:h-full bg-white/95 backdrop-blur-xl border-l border-gray-100 flex flex-col relative z-20">
        <div className="p-6 lg:p-8 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-[0.2em]"><Camera size={16} /> Visual Story</div>
            <h2 className="text-2xl lg:text-3xl font-bold font-serif text-gray-900 leading-tight">{photo.title}</h2>
            <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
              {stripHtml(photo.description)}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            {photo.location && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin size={18} className="text-red-500" />
                <span>{photo.location}</span>
              </div>
            )}
            {photo.date && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar size={18} className="text-red-500" />
                <span>{formatDate(photo.date)}</span>
              </div>
            )}
            {photo.photographer && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <User size={18} className="text-red-500" />
                <span>{photo.photographer}</span>
              </div>
            )}
            {photo.tags && photo.tags.length > 0 && (
              <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                <Tag size={18} className="text-red-500" />
                {photo.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded text-xs">#{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest"><Eye size={14} /> Views</div>
              <div className="text-xl font-black text-gray-900 mt-1">{photo.views || 0}</div>
            </div>


            <div className={`p-4 rounded-2xl border transition-all ${isLiked ? "bg-rose-50 border-rose-100" : "bg-gray-50 border-gray-100"}`}>
              <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${isLiked ? "text-rose-600" : "text-gray-500"}`}><Heart size={14} className={isLiked ? "fill-rose-600" : ""} /> Likes</div>
              <div className="text-xl font-black text-gray-900 mt-1">{photo.likes || 0}</div>
            </div>
          </div>
        </div>
        <div className="p-6 lg:p-8 border-t border-gray-100 bg-white">
          <button onClick={() => handleShareClick(photo)} className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-red-600/20 hover:bg-red-700 transition">
            <Share2 size={20} /> शेअर करा
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-3xl flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[100000]">
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white font-black text-sm">
          {currentIndex + 1} / {photos.length}
        </div>
        <button onClick={onClose} className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white transition-all hover:bg-red-600">
          <X size={24} />
        </button>
      </div>

      <button onClick={handlePrev} className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex p-5 rounded-full bg-white/5 text-white hover:bg-red-600 z-[100000]">
        <ChevronLeft size={36} />
      </button>

      <button onClick={handleNext} className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex p-5 rounded-full bg-white/5 text-white hover:bg-red-600 z-[100000]">
        <ChevronRight size={36} />
      </button>

      <div className="relative w-full h-full max-w-[1400px] max-h-[90vh] flex items-center justify-center p-4">
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ perspective: '1000px' }}>
          <div
            ref={containerRef}
            className={`flex w-full h-full ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
            style={{ transform: `translateX(${(-1 - direction) * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            <div className="w-full h-full flex-shrink-0 px-4">{renderCardContent(photos[(currentIndex - 1 + photos.length) % photos.length])}</div>
            <div className="w-full h-full flex-shrink-0 px-4">{renderCardContent(photos[currentIndex])}</div>
            <div className="w-full h-full flex-shrink-0 px-4">{renderCardContent(photos[(currentIndex + 1) % photos.length])}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoLightbox;