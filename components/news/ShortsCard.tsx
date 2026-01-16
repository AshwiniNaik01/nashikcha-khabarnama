import React from "react";
import { Play, ChevronRight } from "lucide-react";

interface ShortsProps {
  title?: string;
  category?: string;
  time?: string;
  description?: string;
  videoSrc?: string;
  posterImg?: string;
}

export default function ShortsCard({
  title = "“खूपच भयंकर...”, अभिनेत्रीने सांगितला कास्टिंग काउचचा धक्कादायक अनुभव; म्हणाली, “त्याला...”",
  category = "मनोरंजन",
  time = "15 hr ago",
  description = "टीव्ही अभिनेत्री रश्मी देसाईने तिच्या कास्टिंग काउचच्या अनुभवाबद्दल उघडपणे बोलले आहे. १६ वर्षांची असताना तिला ऑडिशनसाठी बोलावण्यात आले होते...",
  videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4", // YouTube थेट व्हिडिओ टॅगमध्ये चालत नाही, MP4 लिंक वापरावी लागते
  posterImg = "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
}: ShortsProps) {
  return (
    <div className="pt-2">
      <div className="border-[12px] border-black rounded-[50px] overflow-hidden bg-white shadow-2xl mx-auto w-full">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-red-600 text-2xl font-black font-sans tracking-tighter">
              नाशिकचा खबरनामा
            </span>
            <span className="text-2xl italic font-light font-sans tracking-tighter">
              Shorts
            </span>
          </div>

          {/* Video Section */}
          <div className="relative rounded-2xl overflow-hidden h-64 mb-5 bg-black group">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={posterImg}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>

            {/* Play Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Play size={40} className="text-white fill-current" />
            </div>
          </div>

          {/* Content */}
          <h4 className="text-xl font-bold leading-tight mb-3 hover:text-red-600 cursor-pointer transition-colors">
            {title}
          </h4>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-red-600 font-bold text-xs font-sans uppercase">
              {category}
            </span>
            <span className="text-gray-400 text-xs font-sans">{time}</span>
          </div>

          <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-6 font-sans px-1">
            {description}
          </p>

          {/* Footer Button */}
          <button className="w-full border-t border-gray-200 pt-5 text-red-600 font-bold text-lg flex items-center justify-center gap-1 hover:underline group transition-all">
            सर्व शॉर्ट्स पाहा
            <ChevronRight
              size={22}
              className="stroke-[3px] group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
