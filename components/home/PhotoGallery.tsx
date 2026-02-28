"use client";

import React, { useEffect, useState, useRef } from "react";
import { Camera, MoveRight, Loader2 } from "lucide-react";
import Link from "next/link";

import PhotoLightbox from "../photos/PhotoLightbox";
import {
  getAllGalleryItems,
  ApiGalleryItem,
  getGalleryImageUrl,
} from "@/components/services/galleryServices";

const stripHtml = (html?: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
};

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<ApiGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);


  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchPhotos = async () => {
      try {
        const response = await getAllGalleryItems();
        if (response.success) setPhotos(response.data.slice(0, 4));
      } catch (error) {
        console.warn("Gallery fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="my-10 h-64 flex items-center justify-center bg-neutral-900 rounded-2xl">
        <Loader2 className="animate-spin text-red-600" size={32} />
      </div>
    );
  }

  if (!photos.length) return null;

  const spans = [
    { col: 2, row: 2 },
    { col: 1, row: 2 },
    { col: 1, row: 1 },
    { col: 1, row: 1 },
  ];

  return (
    <section className="my-10 md:my-20 bg-gradient-to-b from-neutral-900 to-neutral-600 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/5 p-4 md:p-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 md:mb-16">
        <div className="space-y-3 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-white">
            <Camera size={20} className="text-red-600 animate-pulse" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] opacity-70">
              Visual Stories
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl text-white leading-none">
            खबरनामा <br />
            <span className="text-red-600 underline decoration-4 underline-offset-8">
              फोटो गॅलरी
            </span>
          </h2>
        </div>

        <Link
          href="/photos"
          className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-black text-md uppercase tracking-widest hover:bg-red-600 transition-all group"
        >
          सर्व फोटो पाहा
          <MoveRight className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4 auto-rows-[100px] md:auto-rows-[150px]">
        {photos.map((photo, index) => {
          const span = spans[index];
          return (
            <div
              key={photo._id}
              onClick={() => {
                setCurrentPhotoIndex(index);
                setLightboxOpen(true);
              }}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              style={{
                gridColumnEnd: `span ${span.col}`,
                gridRowEnd: `span ${span.row}`,
              }}
            >
              <img
                src={getGalleryImageUrl(photo.photo)}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <h3 className="text-white text-sm md:text-base font-bold line-clamp-2">
                  {stripHtml(photo.title)}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Component */}
      <PhotoLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={photos.map(p => ({
          id: p._id,
          url: getGalleryImageUrl(p.photo),
          title: p.title,
          description: p.description || "",
          category: p.category,
          views: p.views,
          likes: p.likes,
          date: p.date,
          location: p.location,
          photographer: p.photographerName,
          tags: p.tags
        }))}
        initialIndex={currentPhotoIndex}
      />
    </section>
  );
}