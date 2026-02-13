"use client";

import React, { useEffect, useState } from "react";
import { Calendar, User, Link as LinkIcon, Check, Share2, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAdsByCategory, Advertisement as AdType } from "@/components/services/adService";
import { getCategoryLabel } from "@/components/constants/categories";
import { News } from "@/components/services/newsService";

interface NewsDetailClientProps {
  initialNews: News;
  initialNewsList: News[];
  id: string;
  slug: string;
}

export default function NewsDetailClient({ initialNews, initialNewsList, id, slug }: NewsDetailClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [news] = useState<News>(initialNews);
  const [ads, setAds] = useState<AdType[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchAds = async () => {
      try {
        const adsResponse = await getAdsByCategory(news.category || "all");
        if (adsResponse.success) setAds(adsResponse.data);
      } catch (err) { console.error("Ads Fetch Error:", err); }
    };
    fetchAds();
  }, [news]);

  const baseUrl = "https://www.nasikchakhabarnama.com";
  const shareUrl = `${baseUrl}/news/${id}/${slug}`;

  const shareOnWhatsApp = () => {
    const message = `*${news.title}*\n\nबातमी वाचण्यासाठी खालील लिंकवर क्लिक करा:\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isMounted) return null;

  const formattedDate = new Date(news.createdAt).toLocaleDateString("mr-IN", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div className="py-2">
        <div className="group mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-red-600 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm">
              {getCategoryLabel(news.category)}
            </span>
            <div className="flex-1 h-[1px] bg-gray-200" />
          </div>

          <h1 className="text-xl md:text-3xl font-black text-gray-900 leading-tight mb-6">
            {news.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm border-y border-gray-100 py-4 mb-8">
            <div className="flex items-center gap-2">
              <User size={16} className="text-red-600" />
              <span className="font-semibold">{news.reporterName || "प्रतिनिधी"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-red-600" />
              <span>{formattedDate}</span>
            </div>

            <div className="hidden md:flex items-center gap-3 ml-auto">
              <button onClick={shareOnWhatsApp} className="flex items-center gap-2 bg-[#25D366] text-black px-4 py-2 rounded-full text-xs font-bold hover:shadow-md transition-all">
                <MessageCircle size={14} fill="currentColor" /> व्हॉट्सअ‍ॅप
              </button>
              <button onClick={shareOnFacebook} className="flex items-center gap-2 bg-[#1877F2] text-black px-4 py-2 rounded-full text-xs font-bold hover:shadow-md transition-all">
                <Share2 size={14} fill="currentColor" /> फेसबुक
              </button>
              <button onClick={copyToClipboard} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${copied ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                {copied ? <Check size={14} /> : <LinkIcon size={14} />}
                {copied ? "कॉपी झाली" : "लिंक कॉपी"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-10">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl mb-8">
              <img src={news.image?.cdnUrl || "/placeholder.jpg"} alt={news.title} className="w-full h-full object-cover" />
            </div>
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-10 right-6 flex flex-col gap-4 z-50 md:hidden">
        <button onClick={shareOnFacebook} className="w-14 h-14 bg-[#1877F2] text-black rounded-full flex items-center justify-center shadow-2xl active:scale-90 border-2 border-white">
          <Share2 size={24} fill="currentColor" />
        </button>
        <button onClick={shareOnWhatsApp} className="w-14 h-14 bg-[#25D366] text-black rounded-full flex items-center justify-center shadow-2xl active:scale-90 border-2 border-white">
          <MessageCircle size={28} fill="currentColor" />
        </button>
        <button onClick={copyToClipboard} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl active:scale-90 border-2 border-white ${copied ? "bg-green-600 text-white" : "bg-white text-gray-800"}`}>
          {copied ? <Check size={28} /> : <LinkIcon size={28} />}
        </button>
      </div>
    </div>
  );
}