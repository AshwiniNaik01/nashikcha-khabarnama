"use client";

import React, { useEffect, useState } from "react";
import { Advertisement, getAdImageUrl } from "../services/adService";

interface AdDisplayProps {
  ads: Advertisement[];
  position: "top" | "bottom" | "left" | "right" | "in-between";
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
      // १. दिलेल्या पोझिशननुसार जाहिरात फिल्टर करा
      const filteredAds = ads.filter(
        (ad) => ad.position === position && ad.isActive,
      );

      if (filteredAds.length > 0) {
        // २. जर एकाच पोझिशनला अनेक जाहिराती असतील, तर रँडम एक निवडा
        const randomAd =
          filteredAds[Math.floor(Math.random() * filteredAds.length)];
        setActiveAd(randomAd);
      } else {
        setActiveAd(null);
      }
    }
  }, [ads, position]);

  // जर जाहिरात नसेल तर काहीही दाखवू नका
  if (!activeAd) return null;

  const imageUrl = getAdImageUrl(activeAd.image);

  return (
    <div
      className={`ad-container w-full flex flex-col items-center justify-center my-4 overflow-hidden ${className}`}
      style={{
        animation: `fadeIn ${activeAd.displayDuration || 1}s ease-in-out`,
      }}
    >
      {/* "ADVERTISEMENT" label - न्यूज़ पोर्टलसाठी प्रोफेशनल दिसते */}
      <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
        Advertisement
      </span>

      <a
        href={activeAd.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full transition-transform hover:scale-[1.01]"
      >
        <img
          src={imageUrl}
          alt={activeAd.title}
          className="w-full h-auto object-contain rounded shadow-sm border border-gray-100"
          loading="lazy"
        />
      </a>

      {/* Fade-in Animation CSS */}
      <style jsx>{`
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
