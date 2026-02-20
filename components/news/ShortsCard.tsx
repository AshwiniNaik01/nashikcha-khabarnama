"use client";

import React, { useEffect, useRef } from "react";
import { Play, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getCategoryLabel } from "@/components/constants/categories";


interface ShortsProps {
  id?: string;
  slug?: string;
  title?: string;
  category?: string;
  time?: string;
  description?: string;
  videoSrc?: string;
}

export default function ShortsCard({
  id,
  slug,
  title = "“खूपच भयंकर...”, अभिनेत्रीने सांगितला कास्टिंग काउचचा धक्कादायक अनुभव; म्हणाली, “त्याला...”",
  category = "मनोरंजन",
  time = "15 hr ago",
  description = "",
  videoSrc = "/video.mp4",
}: ShortsProps) {

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {

      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;

      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay was prevented by browser:", error);
        });
      }
    }
  }, [videoSrc]);

  const content = (
    <>
      <h4 className="text-xl font-bold leading-tight mb-3 hover:text-red-600 transition-colors">
        {title}
      </h4>

      <div className="flex items-center gap-2">
        <span className="text-red-600 font-bold text-xs font-sans uppercase">
          {getCategoryLabel(category)}
        </span>
        <span className="text-gray-400 text-xs font-sans">{time}</span>
      </div>

      <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-6 font-sans px-1">
        {description}
      </p>
    </>
  );

  return (
    <div className="pt-2">
      <div className="border-[12px] border-black rounded-[50px] overflow-hidden bg-white shadow-2xl mx-auto w-full">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-pink-600 text-xl font-black font-sans tracking-tighter">
              नासिकचा खबरनामा
            </span>
            <span className="text-2xl italic font-light font-sans tracking-tighter">

            </span>
          </div>

          {/* Video Section */}
          <div className="relative rounded-2xl overflow-hidden h-64 mb-5 bg-black group">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              autoPlay
              preload="auto"
              key={videoSrc} // src बदलल्यास व्हिडिओ रिफ्रेश होईल
            >
              <source src={videoSrc} type="video/mp4" />
              तुमचा ब्राउझर व्हिडिओ सपोर्ट करत नाही.
            </video>

            {/* Play Icon Overlay */}
            {/* <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Play size={40} className="text-white fill-current" />
            </div> */}
          </div>

          {/* Content Link Logic */}
          {id ? (
            <Link href={`/news/${id}/${slug || id}`}>{content}</Link>
          ) : (
            content
          )}

          {/* Footer Button */}

        </div>
      </div>
    </div>
  );
}