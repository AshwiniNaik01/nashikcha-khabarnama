"use client";

import React, { useEffect, useState } from "react";
import { getAllBreakingNews, ApiBreakingNews } from "@/components/services/breakingNewsService";
import { Loader2 } from "lucide-react";

const BreakingNews = () => {
  const [newsList, setNewsList] = useState<ApiBreakingNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const response = await getAllBreakingNews();
        if (response.success) {

          const activeNews = response.data.filter((news) => news.status === "Active");
          setNewsList(activeNews);
        }
      } catch (error) {
        console.error("ब्रेकिंग न्यूज लोड करताना एरर आली:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreakingNews();
  }, []);

  if (loading) return (
    <div className="h-8 flex items-center justify-center bg-red-50 mx-4 rounded-lg">
      <Loader2 className="animate-spin text-red-600" size={16} />
    </div>
  );

  if (newsList.length === 0) return null;

  return (
    <div className="relative z-10 bg-red-50 border-y border-red-100 overflow-hidden xs:py-1.5 sm:py-2 flex items-center shadow-sm mx-2 xs:mx-3 sm:mx-4 md:mx-6 rounded-md">
      {/* Label */}
      <div className="bg-red-600 text-white text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-black px-2 xs:px-3 sm:px-4 py-0.5 xs:py-1 flex-shrink-0 uppercase italic tracking-tighter shadow-md z-10 whitespace-nowrap">
        ब्रेकिंग न्यूज
      </div>

      {/* Marquee Content */}
      <div className="flex-1 whitespace-nowrap overflow-hidden relative">
        <div className="animate-marquee inline-block pl-3 xs:pl-4 sm:pl-6 md:pl-8 text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-gray-900">
          {newsList.map((item) => (
            <span key={item._id} className="inline-flex items-center">
              <span className="mx-2 xs:mx-3 sm:mx-4 text-red-600 text-[6px] xs:text-[7px] sm:text-[8px]">
                ●
              </span>
              <span className="inline">{item.headline}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;