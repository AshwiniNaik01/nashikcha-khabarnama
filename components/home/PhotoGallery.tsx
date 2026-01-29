"use client";

import React, { useEffect, useState } from "react";
import { Camera, MoveRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { getAllGalleryItems, ApiGalleryItem, getGalleryImageUrl } from "@/components/services/galleryServices";

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<ApiGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await getAllGalleryItems();
        if (response.success) {
          setPhotos(response.data);
        }
      } catch (error) {
        console.warn("Handled gallery fetch issue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="my-10 h-64 flex items-center justify-center bg-neutral-900 rounded-2xl">
        <Loader2 className="animate-spin text-lokmat-red" size={32} />
      </div>
    );
  }

  if (photos.length === 0) return null;

  return (
    <section className="my-10 md:my-20 bg-gradient-to-b from-neutral-900 to-neutral-600 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/5 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 md:mb-16">
        <div className="space-y-3 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-white">
            <Camera size={20} className="text-lokmat-red animate-pulse" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] opacity-70">
              Visual Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-white text-white leading-none">
            द खबरनामा <br />
            <span className="text-lokmat-red underline decoration-4 underline-offset-8">
              गॅलरी
            </span>
          </h2>
        </div>

        <Link
          href="/photos"
          className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-black text-md uppercase tracking-widest hover:bg-lokmat-red transition-all group"
        >
          सर्व फोटो पाहा
          <MoveRight className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      {/* Grid: Bento Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 auto-rows-[180px] md:auto-rows-[250px]">
        {/* Photo 1: Featured */}
        {photos[0] && (
          <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-2xl md:rounded-[2.5rem] cursor-pointer">
            <img
              src={getGalleryImageUrl(photos[0].photo)}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              alt={photos[0].title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 transform md:translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-white text-lg md:text-3xl font-black mb-1 md:mb-2 line-clamp-2">
                {photos[0].title}
              </h3>
              <p className="text-white/70 text-xs md:text-base font-medium line-clamp-1 md:line-clamp-none">
                {photos[0].description}
              </p>
            </div>
          </div>
        )}

        {/* Photo 2 */}
        {photos[1] && (
          <div className="col-span-2 md:col-span-1 row-span-1 group relative overflow-hidden rounded-2xl md:rounded-[2rem] cursor-pointer">
            <img
              src={getGalleryImageUrl(photos[1].photo)}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              alt={photos[1].title}
            />
            <div className="absolute inset-0 bg-lokmat-red/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
              <span className="text-white font-black uppercase text-[10px] tracking-widest border border-white/40 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-lg">
                ओपन करा
              </span>
            </div>
          </div>
        )}

        {/* Photo 3 */}
        {photos[2] && (
          <div className="col-span-1 md:col-span-1 row-span-2 group relative overflow-hidden rounded-2xl md:rounded-[2rem] cursor-pointer">
            <img
              src={getGalleryImageUrl(photos[2].photo)}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              alt={photos[2].title}
            />
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent">
              <h3 className="text-white text-sm md:text-lg font-black leading-tight line-clamp-3">
                {photos[2].title}
              </h3>
            </div>
          </div>
        )}

        {/* Photo 4 */}
        {photos[3] && (
          <div className="col-span-1 md:col-span-1 row-span-1 group relative overflow-hidden rounded-2xl md:rounded-[2rem] cursor-pointer">
            <img
              src={getGalleryImageUrl(photos[3].photo)}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              alt={photos[3].title}
            />
          </div>
        )}
      </div>
    </section>
  );
}
