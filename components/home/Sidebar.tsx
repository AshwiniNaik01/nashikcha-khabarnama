import React from "react";
import Link from "next/link";

interface TrendingItem {
  id: string; // Changed to string (Article ID)
  title: string;
  slug: string;
}

interface SidebarProps {
  trendingItems: TrendingItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ trendingItems }) => {
  return (
    <div className="space-y-8">
      {/* Trending Section - Phone UI Style */}
      <div className="relative mx-auto max-w-[280px] bg-white rounded-[2.5rem] border-8 border-gray-900 shadow-2xl overflow-hidden aspect-[9/18] flex flex-col">
        {/* Phone Notch/Speaker */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-xl z-20 flex items-center justify-center">
          <div className="w-8 h-1 bg-gray-700 rounded-full"></div>
        </div>

        {/* Phone Content */}
        <div className="flex-1 flex flex-col pt-6 overflow-hidden">
          {/* App Header in Phone */}
          <div className="bg-lokmat-maroon p-4 flex flex-col items-center border-b border-lokmat-maroon">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-6 brightness-0 invert mb-1"
            />
            <span className="text-[10px] text-white/80 font-black uppercase tracking-widest">
              ट्रेन्डिंग
            </span>
          </div>

          {/* Trending List */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gray-50">
            <h2 className="text-sm font-black text-gray-800 mb-4 border-b border-gray-200 pb-2">
              आजच्या महत्वाच्या
            </h2>
            <div className="space-y-4">
              {trendingItems.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}/${item.slug}`}
                  className="flex gap-3 items-start group cursor-pointer border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-xl font-black text-lokmat-red/20 group-hover:text-lokmat-red transition-colors duration-300">
                    {index + 1}
                  </span>
                  <p className="text-[11px] font-bold line-clamp-3 leading-snug text-gray-800 group-hover:text-lokmat-red transition-colors duration-300">
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Phone Home Indicator */}
          <div className="h-6 bg-gray-50 flex items-center justify-center">
            <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
