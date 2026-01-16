"use client";

import React, { useState } from "react";
import { Play, ChevronRight, Video } from "lucide-react";
import Link from "next/link";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
}

const videos: VideoItem[] = [
  {
    id: "v1",
    title: "नाशिकमधील रामकुंडावर दीपोत्सव: पाहा डोळ्यांचे पारणे फेडणारे दृश्य",
    thumbnail:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    duration: "०३:४५",
    category: "विशेष",
  },
  {
    id: "v2",
    title: "द्राक्ष पंढरीतील निर्यात कशी चालते? विशेष ग्राऊंड रिपोर्ट",
    thumbnail:
      "https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg",
    duration: "०५:२०",
    category: "शेती",
  },
  {
    id: "v3",
    title: "नाशिक-पुणे हायस्पीड रेल्वे: कसा असेल तुमचा प्रवास?",
    thumbnail:
      "https://static.vecteezy.com/system/resources/thumbnails/070/593/008/small/winter-night-in-urban-park-with-snow-and-soft-glow-of-lights-photo.jpeg",
    duration: "०२:१५",
    category: "विकास",
  },
  {
    id: "v4",
    title: "इगतपुरीत बर्फाची चादर? थंडीचा कडाका वाढला",
    thumbnail:
      "https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg",
    duration: "०१:३०",
    category: "नाशिक",
  },
];

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <section className="bg-gradient-to-b from-neutral-900 to-neutral-600 rounded-xl overflow-hidden shadow-2xl border border-white/5 my-12">
      <div className="p-8 md:p-12">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-lokmat-red rounded-full flex items-center justify-center animate-pulse">
              <Video className="text-white w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                व्हिडीओ गॅलरी
              </h2>
              <p className="text-lokmat-red text-xs font-bold tracking-widest uppercase mt-1">
                Video Spotlight
              </p>
            </div>
          </div>

          <Link
            href="/videos"
            className="hidden md:flex items-center gap-2 text-white hover:text-red-600 transition-colors text-sm font-bold uppercase tracking-widest group"
          >
            सर्व व्हिडीओ पाहा
            <ChevronRight
              size={16}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Video */}
          <div className="lg:col-span-2 group cursor-pointer relative">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-inner border-4 border-lokmat-maroon">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-lokmat-red rounded-full flex items-center justify-center text-white shadow-2xl transform transition-all duration-500 group-hover:scale-125 group-hover:bg-white group-hover:text-lokmat-red">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-lokmat-red text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-widest mb-3 inline-block">
                  {activeVideo.category}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight line-clamp-2">
                  {activeVideo.title}
                </h3>
                <div className="flex items-center gap-4 mt-3 text-white/50 text-xs font-bold">
                  <span>समय: {activeVideo.duration}</span>
                  <span>•</span>
                  <span>HD Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist items */}
          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
            {videos.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`flex gap-4 p-3 rounded-xl transition-all duration-300 cursor-pointer border ${
                  activeVideo.id === video.id
                    ? "bg-white/10 border-white/20"
                    : "hover:bg-white/5 border-transparent"
                }`}
              >
                <div className="relative w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0 border-4 border-lokmat-maroon">
                  <img
                    src={video.thumbnail}
                    className="w-full h-full object-cover opacity-80"
                    alt=""
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={14} className="text-white fill-white/50" />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/80 text-[8px] text-white px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-xs font-bold leading-snug line-clamp-2 mb-1 group-hover:text-lokmat-red">
                    {video.title}
                  </h4>
                  <span className="text-lokmat-red text-[10px] uppercase font-black tracking-tighter">
                    {video.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View All */}
      <div className="md:hidden p-6 pt-0">
        <Link
          href="/videos"
          className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-black text-md uppercase tracking-widest hover:bg-lokmat-red transition-all group"
        >
          सर्व व्हिडीओ पाहा
          <ChevronRight
            size={16}
            className="transform group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </section>
  );
}
