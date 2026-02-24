// "use client";

// import React, { useEffect, useState } from "react";
// import { Advertisement, getAdImageUrl } from "../services/adService";

// interface AdDisplayProps {
//   ads: Advertisement[];
//   position:
//   | "top"
//   | "bottom"
//   | "left"
//   | "right"
//   | "in-between"
//   | "sticky-right"
//   | "sticky-left";
//   className?: string;
// }

// const AdDisplay: React.FC<AdDisplayProps> = ({
//   ads,
//   position,
//   className = "",
// }) => {
//   const [filteredAds, setFilteredAds] = useState<Advertisement[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     if (ads && ads.length > 0) {
//       const active = ads.filter(
//         (ad) => ad.position === position && ad.isActive,
//       );
//       setFilteredAds(active);
//       setCurrentIndex(0);
//     }
//   }, [ads, position]);

//   useEffect(() => {
//     if (filteredAds.length > 1) {
//       const currentAd = filteredAds[currentIndex];

//       const durationInSeconds = currentAd?.displayDuration || 10;
//       const durationInMs = durationInSeconds * 1000;

//       const timer = setTimeout(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredAds.length);
//       }, durationInMs);

//       return () => clearTimeout(timer);
//     }
//   }, [currentIndex, filteredAds]);

//   const activeAd = filteredAds[currentIndex] || null;
//   const isSticky = position === "sticky-left" || position === "sticky-right";

//   if (!activeAd && !isSticky) return null;

//   const imageUrl = activeAd ? getAdImageUrl(activeAd.image) : null;

//   const animFadeTime = 0.8;

//   return (
//     <div
//       className={`ad-container flex flex-col items-center group ${isSticky ? "h-full w-full" : "w-full my-4"
//         } ${className}`}
//     >
//       <p className="w-full text-center text-[9px] font-black tracking-[0.2em] text-gray-400 py-1 mb-1 uppercase border-b border-gray-100">
//         जाहिरात{" "}
//         {filteredAds.length > 1 &&
//           `(${currentIndex + 1}/${filteredAds.length})`}
//       </p>

//       <div
//         className={`relative w-full overflow-hidden border border-gray-200 rounded-lg flex items-center justify-center bg-white shadow-sm ${isSticky ? "flex-1" : "h-auto min-h-[80px]"
//           }`}
//       >
//         {activeAd ? (
//           <a
//             key={activeAd._id}
//             href={activeAd.link || "#"}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block w-full h-full animate-fade"
//           >
//             <img
//               src={imageUrl!}
//               alt={activeAd.title}
//               className={`w-full h-full transition-all duration-500 ${isSticky
//                 ? "object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
//                 : "object-contain"
//                 }`}
//               loading="lazy"
//             />
//           </a>
//         ) : (
//           <div className="flex items-center justify-center w-full h-full bg-gray-50 p-4">
//             <span className="text-gray-300 font-bold text-[10px] rotate-90 whitespace-nowrap tracking-widest uppercase">
//               खबरनामा विशेष
//             </span>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .animate-fade {
//           animation: fadeEffect ${animFadeTime}s ease-in-out;
//         }
//         @keyframes fadeEffect {
//           from {
//             opacity: 0.5;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdDisplay;
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
  const [filteredAds, setFilteredAds] = useState<Advertisement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (ads && ads.length > 0) {
      const active = ads.filter(
        (ad) => ad.position === position && ad.isActive,
      );
      setFilteredAds(active);
      setCurrentIndex(0);
    }
  }, [ads, position]);

  useEffect(() => {
    if (filteredAds.length > 1) {
      const currentAd = filteredAds[currentIndex];

      const durationInSeconds = currentAd?.displayDuration || 10;
      const durationInMs = durationInSeconds * 1000;

      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredAds.length);
      }, durationInMs);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, filteredAds]);


  const handleAdClick = (ad: Advertisement) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "ad_click", {
        ad_title: ad.title || "Untitled Ad",
        ad_position: position,
        ad_id: ad._id,
        ad_link: ad.link,
      });
    }
  };

  const activeAd = filteredAds[currentIndex] || null;
  const isSticky = position === "sticky-left" || position === "sticky-right";

  if (!activeAd && !isSticky) return null;

  const imageUrl = activeAd ? getAdImageUrl(activeAd.image) : null;
  const animFadeTime = 0.8;

  return (
    <div
      className={`ad-container flex flex-col items-center group ${isSticky ? "h-full w-full" : "w-full my-4"
        } ${className}`}
    >
      <p className="w-full text-center text-[9px] font-black tracking-[0.2em] text-gray-400 py-1 mb-1 uppercase border-b border-gray-100">
        जाहिरात{" "}
        {filteredAds.length > 1 &&
          `(${currentIndex + 1}/${filteredAds.length})`}
      </p>

      <div
        className={`relative w-full overflow-hidden border border-gray-200 rounded-lg flex items-center justify-center bg-white shadow-sm ${isSticky ? "flex-1" : "h-auto min-h-[80px]"
          }`}
      >
        {activeAd ? (
          <a
            key={activeAd._id}
            href={activeAd.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleAdClick(activeAd)}
            className="block w-full h-full animate-fade"
          >
            <img
              src={imageUrl!}
              alt={activeAd.title}
              className={`w-full h-full transition-all duration-500 ${isSticky
                ? "object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
                : "object-contain"
                }`}
              loading="lazy"
            />
          </a>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-50 p-4">
            <span className="text-gray-300 font-bold text-[10px] rotate-90 whitespace-nowrap tracking-widest uppercase">
              खबरनामा विशेष
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fade {
          animation: fadeEffect ${animFadeTime}s ease-in-out;
        }
        @keyframes fadeEffect {
          from {
            opacity: 0.5;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AdDisplay;