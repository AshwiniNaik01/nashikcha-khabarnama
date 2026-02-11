"use client";

import React, { useEffect, useState } from "react";
import { Advertisement, getAdImageUrl } from "../services/adService";

interface AdDisplayProps {
  ads: Advertisement[];
  position:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "in-between"
    | "sticky-right"
    | "sticky-left";
  className?: string;
}

const AdDisplay: React.FC<AdDisplayProps> = ({
  ads,
  position,
  className = "",
}) => {
  const [activeAd, setActiveAd] = useState<Advertisement | null>(null);

  useEffect(() => {
    if (ads && ads.length > 0) {
      const filteredAds = ads.filter(
        (ad) => ad.position === position && ad.isActive,
      );

      if (filteredAds.length > 0) {
        const randomAd =
          filteredAds[Math.floor(Math.random() * filteredAds.length)];
        setActiveAd(randomAd);
      } else {
        setActiveAd(null);
      }
    }
  }, [ads, position]);

  const isSticky = position === "sticky-left" || position === "sticky-right";

  if (!activeAd && !isSticky) return null;

  const imageUrl = activeAd ? getAdImageUrl(activeAd.image) : null;

  return (
    <div
      className={`ad-container flex flex-col items-center group ${
        isSticky ? "h-full w-full" : "w-full my-4"
      } ${className}`}
    >
      <p className="w-full text-center text-[10px] font-black tracking-widest text-gray-800 bg-gray-100 py-1 mb-2 uppercase border border-gray-200">
        जाहिरात
      </p>

      {/* Main Content Area */}
      <div
        className={`relative w-full overflow-hidden transition-all duration-700 border-2 border-gray-500 rounded-md flex items-center justify-center bg-gray-50 ${
          isSticky ? "flex-1" : "h-auto"
        }`}
      >
        {activeAd ? (
          <a
            href={activeAd.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <img
              src={imageUrl!}
              alt={activeAd.title}
              className={`w-full h-full transition-all duration-700 ${
                isSticky
                  ? "object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
                  : "object-contain"
              }`}
              loading="lazy"
            />
          </a>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-gray-50 to-gray-200">
            <span className="text-gray-900 font-bold text-xs rotate-90 whitespace-nowrap tracking-[0.2em] uppercase opacity-50 group-hover:opacity-100 transition-opacity">
              नासिकचा खबरनामा विशेष
            </span>
          </div>
        )}
      </div>

      {/* Fade-in Animation CSS */}
      <style jsx>{`
        .ad-container {
          animation: fadeIn ${activeAd?.displayDuration || 1}s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdDisplay;
