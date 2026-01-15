"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
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
}

interface PhotoLightboxProps {
  photos: Photo[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

/* ---------------- Component ---------------- */
const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  initialIndex = 0,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<0 | 1 | -1>(0); // 1 for next, -1 for prev
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync index when initialIndex changes or when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setDirection(0);
      setIsTransitioning(false);
    }
  }, [isOpen, initialIndex]);

  const currentPhoto = photos?.[currentIndex];

  /* ---------------- Load Image ---------------- */
  useEffect(() => {
    if (!currentPhoto) return;
    setIsLoading(true);
    setIsLiked(false);
    const img = new Image();
    img.src = currentPhoto.url;
    img.onload = () => setIsLoading(false);
  }, [currentPhoto]);

  /* ---------------- Navigation Logic ---------------- */
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

    // Calculate new index
    let newIndex = currentIndex;
    if (direction === 1) {
      newIndex = (currentIndex + 1) % photos.length;
    } else if (direction === -1) {
      newIndex = (currentIndex - 1 + photos.length) % photos.length;
    }

    setCurrentIndex(newIndex);
    setDirection(0);
    setIsTransitioning(false);
  };

  /* ---------------- Keyboard Navigation ---------------- */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !currentPhoto) return null;

  /* ---------------- Format Numbers ---------------- */
  const formatNumber = (n?: number) =>
    !n ? "0" : n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();

  /* ---------------- Photo Card Content ---------------- */
  const renderCardContent = (photo: Photo) => (
    <div className="relative w-full h-full rounded-lg lg:rounded-lg overflow-hidden bg-white shadow-2xl flex flex-col md:flex-row border border-white/20">
      {/* Background Glow */}
      <div className="absolute -inset-24 bg-black/90 blur-[120px] pointer-events-none" />

      {/* Image Section */}
      <div className="relative w-full md:w-[60%] lg:w-[65%] h-[40%] md:h-full bg-black/5 flex items-center justify-center overflow-hidden">
        {/* Ambient background for the image */}
        <div
          className="absolute inset-0 opacity-30 blur-3xl scale-110"
          style={{
            backgroundImage: `url(${photo.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        <img
          src={photo.url}
          alt={photo.title}
          className="relative z-10 max-w-full max-h-full object-contain transition-transform duration-1000 hover:scale-105 p-4 lg:p-8"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 lg:top-8 lg:left-8 space-y-2 z-20">
          <span className="inline-block px-4 py-1.5 text-xs font-black bg-lokmat-red text-white rounded-full shadow-xl tracking-wider uppercase">
            {photo.category}
          </span>
          {photo.isFeatured && (
            <span className="block px-4 py-1.5 text-xs font-black bg-yellow-400 text-black rounded-full shadow-lg">
              ⭐ FEATURED
            </span>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="w-full md:w-[40%] lg:w-[35%] h-[60%] md:h-full bg-white/95 backdrop-blur-xl border-l border-gray-100 flex flex-col relative z-20">
        <div className="p-6 lg:p-8 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          {/* Title & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lokmat-red font-bold text-xs uppercase tracking-[0.2em]">
              <Camera size={16} />
              Visual Story
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold font-serif text-gray-900 leading-tight">
              {photo.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
              {photo.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 group transition-all hover:bg-lokmat-red/5">
              <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                <Eye size={14} /> Views
              </div>
              <div className="text-xl font-black text-gray-900 mt-1">
                {formatNumber(photo.views)}
              </div>
            </div>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] active:scale-95 text-left ${isLiked
                ? "bg-rose-50 border-rose-100"
                : "bg-gray-50 border-gray-100 hover:bg-rose-50/50"
                }`}
            >
              <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${isLiked ? "text-rose-600" : "text-gray-500"}`}>
                <Heart size={14} className={isLiked ? "fill-rose-600 text-rose-600" : ""} /> Likes
              </div>
              <div className="text-xl font-black text-gray-900 mt-1">
                {formatNumber((photo.likes || 0) + (isLiked ? 1 : 0))}
              </div>
            </button>
          </div>

          {/* Metadata */}
          <div className="space-y-4 pt-4 border-t border-gray-50">
            {photo.location && (
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-lokmat-red group-hover:text-white transition-colors">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</div>
                  <div className="text-sm font-semibold text-gray-800">{photo.location}</div>
                </div>
              </div>
            )}
            {photo.date && (
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-lokmat-red group-hover:text-white transition-colors">
                  <Calendar size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</div>
                  <div className="text-sm font-semibold text-gray-800">{photo.date}</div>
                </div>
              </div>
            )}
            {photo.photographer && (
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-lokmat-red group-hover:text-white transition-colors">
                  <User size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Photographer</div>
                  <div className="text-sm font-semibold text-gray-800">{photo.photographer}</div>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          {photo.tags && photo.tags.length > 0 && (
            <div className="pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                <Tag size={12} /> Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {photo.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-semibold text-lokmat-red bg-lokmat-red/5 border border-lokmat-red/10 rounded-full hover:bg-lokmat-red/10 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 lg:p-8 border-t border-gray-100 bg-white flex justify-center items-center">
          <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-lokmat-gradient text-white font-black text-sm uppercase tracking-widest hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-lokmat-red/20 transition-all active:translate-y-0 active:scale-95 shadow-xl shadow-lokmat-red/10 border border-lokmat-red/10">
            <Share2 size={20} /> शेअर करा
          </button>
        </div>
      </div>
    </div>
  );

  // Indexes for sliding
  const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
  const nextIndex = (currentIndex + 1) % photos.length;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-3xl flex items-center justify-center overflow-hidden">
      {/* Top Header Actions */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[100000] pointer-events-none">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto">
          <span className="text-white font-black text-sm">{currentIndex + 1}</span>
          <span className="text-white/40 text-xs">/</span>
          <span className="text-white/60 text-xs font-bold">{photos.length}</span>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 transition-all hover:bg-lokmat-red hover:rotate-90 hover:scale-110 pointer-events-auto shadow-2xl"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation Controls (Desktop) */}
      <button
        onClick={handlePrev}
        disabled={isTransitioning}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex p-5 rounded-full bg-white/5 backdrop-blur text-white border border-white/10 transition-all hover:bg-lokmat-red hover:scale-110 z-[100000] disabled:opacity-30 group"
      >
        <ChevronLeft size={36} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <button
        onClick={handleNext}
        disabled={isTransitioning}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex p-5 rounded-full bg-white/5 backdrop-blur text-white border border-white/10 transition-all hover:bg-lokmat-red hover:scale-110 z-[100000] disabled:opacity-30 group"
      >
        <ChevronRight size={36} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Sliding Viewport */}
      <div className="relative w-full h-full max-w-[1400px] max-h-[90vh] flex items-center justify-center p-4">
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          {/* Slider Track */}
          <div
            ref={containerRef}
            className={`flex w-full h-full ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
            style={{
              transform: `translateX(${(-1 - direction) * 100}%)`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {/* Previous slide */}
            <div className="w-full h-full flex-shrink-0 px-4">
              {renderCardContent(photos[prevIndex])}
            </div>

            {/* Current slide */}
            <div className="w-full h-full flex-shrink-0 px-4">
              {renderCardContent(photos[currentIndex])}
            </div>

            {/* Next slide */}
            <div className="w-full h-full flex-shrink-0 px-4">
              {renderCardContent(photos[nextIndex])}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 lg:hidden z-[100000]">
        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className="px-8 py-3 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10 font-bold active:scale-95 disabled:opacity-30"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="px-8 py-3 bg-lokmat-red text-white rounded-full font-bold active:scale-95 shadow-xl disabled:opacity-30"
        >
          Next
        </button>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 38, 38, 0.2);
        }
      `}</style>
    </div>
  );
};

export default PhotoLightbox;
