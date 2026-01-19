"use client";

import React from "react";
import { Camera, Maximize2, MoveRight } from "lucide-react";
import Link from "next/link";

interface PhotoItem {
  id: string;
  url: string;
  title: string;
  description: string;
  aspectRatio: "square" | "wide" | "tall";
}

const photos: PhotoItem[] = [
  {
    id: "p1",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    title: "नाशिकचा सुवर्ण काळ",
    description: "रामकुंडावरील दीपोत्सवाचे मनमोहक दृश्य",
    aspectRatio: "wide",
  },
  {
    id: "p2",
    url: "https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg",
    title: "हिरवेगार शिवार",
    description: "द्राक्ष मळ्यातील प्रसन्न सकाळ",
    aspectRatio: "square",
  },
  {
    id: "p3",
    url: "https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg",
    title: "धुक्यातील इगतपुरी",
    description: "सह्याद्रीच्या रांगांत पसरलेले धुके",
    aspectRatio: "tall",
  },
  {
    id: "p4",
    url: "https://static.vecteezy.com/system/resources/thumbnails/070/593/008/small/winter-night-in-urban-park-with-snow-and-soft-glow-of-lights-photo.jpeg",
    title: "रोषणाईने नटलेले शहर",
    description: "स्मार्ट सिटी नाशिकचे रात्रीचे दृश्य",
    aspectRatio: "square",
  },
];

export default function PhotoGallery() {
  return (
    <section className="my-10 md:my-20 bg-gradient-to-b from-neutral-900 to-neutral-600  rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/5 p-4 md:p-8">
      {/* Header: Centered on mobile, spread on desktop */}
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
        {/* Photo 1: Featured (Full width on mobile, 2x2 on desktop) */}
        <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-2xl md:rounded-[2.5rem] cursor-pointer">
          <img
            src={photos[0].url}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            alt={photos[0].title}
          />
          {/* Mobile Overlay is always slightly visible, Desktop hides it until hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 transform md:translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-white text-lg md:text-3xl font-black mb-1 md:mb-2">
              {photos[0].title}
            </h3>
            <p className="text-white/70 text-xs md:text-base font-medium line-clamp-1 md:line-clamp-none">
              {photos[0].description}
            </p>
          </div>
        </div>

        {/* Photo 2: Secondary Square */}
        <div className="col-span-2 md:col-span-1 row-span-1 group relative overflow-hidden rounded-2xl md:rounded-[2rem] cursor-pointer">
          <img
            src={photos[1].url}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            alt={photos[1].title}
          />
          <div className="absolute inset-0 bg-lokmat-red/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
            <span className="text-white font-black uppercase text-[10px] tracking-widest border border-white/40 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-lg">
              ओपन करा
            </span>
          </div>
        </div>

        {/* Photo 3: Tall side image */}
        <div className="col-span-1 md:col-span-1 row-span-2 group relative overflow-hidden rounded-2xl md:rounded-[2rem] cursor-pointer">
          <img
            src={photos[2].url}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            alt={photos[2].title}
          />
          <div className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent">
            <h3 className="text-white text-sm md:text-lg font-black leading-tight">
              {photos[2].title}
            </h3>
          </div>
        </div>

        {/* Photo 4: Small Square */}
        <div className="col-span-1 md:col-span-1 row-span-1 group relative overflow-hidden rounded-2xl md:rounded-[2rem] cursor-pointer">
          <img
            src={photos[3].url}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            alt={photos[3].title}
          />
        </div>
      </div>
    </section>
  );
}
