"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { getCategoryLabel } from "@/components/constants/categories";
import { getAllNews, News } from "@/components/services/newsService";

interface ShortsProps {
  category?: string;
  autoCycle?: boolean;
}


export default function ShortsCard({
  category = "राशी वृत्त",
  autoCycle = true,
}: ShortsProps) {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await getAllNews(category);
        setNewsList(data.slice(0, 10)); // Top 10 for the cycle
      } catch (error) {
        console.warn("Shorts news fetch issue:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [category]);

  useEffect(() => {
    if (autoCycle && newsList.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % newsList.length);
      }, 10000); // 10 seconds refresh
      return () => clearInterval(interval);
    }
  }, [autoCycle, newsList.length]);

  if (loading) {
    return (
      <div className="border-[12px] border-black rounded-[50px] overflow-hidden bg-white shadow-2xl mx-auto w-full h-[450px] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">लोड होत आहे...</p>
      </div>
    );
  }

  if (newsList.length === 0) return null;

  const currentNews = newsList[currentIndex];

  const formattedTime = new Date(currentNews.createdAt).toLocaleDateString("mr-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="pt-2">
      <div className="border-[12px] border-black rounded-[50px] overflow-hidden bg-white shadow-2xl mx-auto w-full">
        <div className="p-5">
          {/* Header (Original Style) */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-pink-600 text-xl font-black font-sans tracking-tighter">
              राशी वृत्त
            </span>
          </div>

          {/* Image Section (Cleanly replaced the Video section) */}
          <div className="relative rounded-2xl overflow-hidden h-64 mb-5 bg-black group">
            <img
              src={currentNews.image?.fullS3URL || currentNews.image?.cdnUrl || "/placeholder.jpg"}
              alt={currentNews.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              key={currentNews._id}
            />
            {/* Cycle Bar Shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div
                className="h-full bg-red-600"
                style={{
                  animation: `shimmer-cycle 10s linear infinite`,
                }}
                key={currentIndex}
              />
            </div>
          </div>

          {/* Content (Original Text Layout) */}
          <Link href={`/news/${currentNews._id}/${currentNews.slug || currentNews._id}`}>
            <h4 className="text-xl font-bold leading-tight mb-3 hover:text-red-600 transition-colors">
              {currentNews.title}
            </h4>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-red-600 font-bold text-xs font-sans uppercase">
                {getCategoryLabel(currentNews.category)}
              </span>
              <span className="text-gray-400 text-xs font-sans">
                {formattedTime}
              </span>
            </div>


          </Link>

        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer-cycle {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}