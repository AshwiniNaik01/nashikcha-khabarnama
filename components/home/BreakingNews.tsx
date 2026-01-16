import React from "react";

interface BreakingNewsProps {
  newsItems?: string[];
}

const BreakingNews: React.FC<BreakingNewsProps> = ({ newsItems = [] }) => {
  if (!newsItems || newsItems.length === 0) return null;

  return (
    <div className="bg-red-50 border-y border-red-100 overflow-hidden py-1 xs:py-1.5 sm:py-2 flex items-center shadow-sm mx-2 xs:mx-3 sm:mx-4 md:mx-6">
      <div className="bg-lokmat-red text-white text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-black px-2 xs:px-3 sm:px-4 py-0.5 xs:py-1 flex-shrink-0 uppercase italic tracking-tighter shadow-md z-10 whitespace-nowrap">
        ब्रेकिंग न्युज
      </div>
      <div className="flex-1 whitespace-nowrap overflow-hidden relative">
        <div className="animate-marquee inline-block pl-3 xs:pl-4 sm:pl-6 md:pl-8 text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-gray-900">
          {newsItems.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="mx-2 xs:mx-3 sm:mx-4 text-lokmat-red text-[6px] xs:text-[7px] sm:text-[8px]">
                ●
              </span>
              <span className="inline">{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
