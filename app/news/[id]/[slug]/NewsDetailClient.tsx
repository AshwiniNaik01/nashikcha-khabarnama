

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Calendar, User, Check, Play, X } from "lucide-react";
import Link from "next/link";
import { FaShare } from "react-icons/fa";
import { getCategoryLabel } from "@/components/constants/categories";
import { News, incrementNewsViews } from "@/components/services/newsService";
import { Advertisement as AdType } from "@/components/services/adService";

import RelatedNews from "@/components/news/RelatedNews";
import LatestNews from "@/components/news/LatestNews";
import NewsList from "@/components/news/NewsList";
import QuoteSection from "@/components/news/QuoteSection";
import AdDisplay from "@/components/advertisement/AdDisplay";
import ShortsCard from "@/components/news/ShortsCard";

interface NewsDetailClientProps {
  initialNews: News;
  initialNewsList: News[];
  initialAds: AdType[];
  id: string;
  slug: string;
}

export default function NewsDetailClient({
  initialNews,
  initialNewsList,
  initialAds,
  id,
  slug,
}: NewsDetailClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [news] = useState<News>(initialNews);
  const [newsList] = useState<News[]>(initialNewsList);
  const [ads] = useState<AdType[]>(initialAds);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [viewCount, setViewCount] = useState<number>(news.views || 0);

  const hasTrackedView = useRef(false);

  useEffect(() => {
    // १. बदलले आहे: localhost ऐवजी तुमची वेबसाईटची मूळ URL वापरा
    const BASE_URL = "https://www.nasikchakhabarnama.com";
    const currentShareUrl = `${BASE_URL}/news/${id}/${slug}`;
    setShareUrl(currentShareUrl);

    setIsMounted(true);
    window.scrollTo({ top: 0, behavior: "instant" });

    // View tracking logic तसेच राहील
    const trackView = async () => {
      if (!hasTrackedView.current) {
        hasTrackedView.current = true;
        try {
          await incrementNewsViews(id);
          setViewCount((prev) => prev + 1);
        } catch (error) {
          hasTrackedView.current = false;
          console.warn("View tracking error:", error);
        }
      }
    };
    trackView();

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "view_news", {
        news_title: news.title,
        news_category: news.category,
        news_id: id,
        page_location: currentShareUrl,
      });
    }
  }, [id, slug, news.title, news.category]);

  const handleShare = async () => {
    const isShareSupported = typeof navigator.share !== "undefined";

    // २. बदलले आहे: WhatsApp मेसेज अधिक आकर्षक बनवला
    const shareMessage = `*${news.title}*\n\nसविस्तर बातमी वाचण्यासाठी खालील लिंकवर क्लिक करा:\n${shareUrl}`;

    if (isShareSupported) {
      try {
        await navigator.share({
          title: news.title,
          text: news.title,
          url: shareUrl,
        });
      } catch (error) { console.log("Error sharing:", error); }
    } else {
      // मेसेज कॉपी करण्यासाठी सुधारणा
      navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isMounted) return null;

  const formattedDate = new Date(news.createdAt).toLocaleDateString("mr-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-marathi relative">
      <div className="py-2">
        <div className="group mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-red-600 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm shadow-sm">
              {getCategoryLabel(news.category)}
            </span>
            <div className="flex-1 h-[1px] bg-gray-200" />
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-6">
            {news.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-gray-100 py-6 ">
            <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <User size={20} className="text-red-600" />
                <span className="font-bold text-gray-900">
                  {news.reporterName || "प्रतिनिधी"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-red-600" />
                <span>{formattedDate}</span>
              </div>

            </div>
            <div className="hidden md:flex items-center gap-2">
              {/* Facebook Share with Tracking */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  (window as any).gtag?.("event", "share", {
                    method: "Facebook",
                    content_id: id,
                  })
                }
                className="w-10 h-10 bg-[#1877F2] text-white flex items-center justify-center rounded-md hover:opacity-90 transition-opacity"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* WhatsApp Share with Tracking */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(news.title + " " + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  (window as any).gtag?.("event", "share", {
                    method: "WhatsApp",
                    content_id: id,
                  })
                }
                className="w-10 h-10 bg-[#25D366] text-white flex items-center justify-center rounded-md hover:opacity-90 transition-opacity"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              <button
                onClick={handleShare}
                type="button"
                className="!w-10 !h-10 !p-0 flex items-center justify-center bg-yellow-600 text-white rounded-md hover:opacity-90 transition-all shadow-sm border-none"
              >
                <FaShare size={20} style={{ color: "white" }} />
              </button>
            </div>
          </div>
          {news.tags && news.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-3 pb-2">
              <span className="text-sm font-bold text-gray-500 mr-1">टॅग्स:</span>
              {news.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/news/tags/${encodeURIComponent(tag)}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-8 space-y-10">
            <div
              className="relative aspect-video rounded-xl overflow-hidden shadow-xl bg-gray-100 cursor-pointer group"
              onClick={() => setIsPreviewOpen(true)}
            >
              <img
                src={news.image?.cdnUrl || "/placeholder.png"}
                alt={news.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <article className="prose prose-lg max-w-none prose-p:text-gray-800">
              {news.shortDescription && (
                <div className="text-xl font-bold italic mb-8 border-l-4 border-red-600 pl-6 py-4 bg-red-50/50 rounded-r-lg">
                  <div
                    dangerouslySetInnerHTML={{ __html: news.shortDescription }}
                  />
                </div>
              )}
              <div
                className="rich-content text-gray-800 leading-relaxed space-y-5"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </article>



            {news.quotes && news.quotes.length > 0 && (
              <QuoteSection quotes={news.quotes} />
            )}

            <AdDisplay ads={ads} position="in-between" />

            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-gray-900">
                <span className="w-2 h-8 bg-red-600 rounded-full" /> आणखी
                बातम्या
              </h3>
              <NewsList news={newsList.filter(n => n.category !== "राशी वृत्त" && n.category !== "rashi-vrutta").slice(0, 4)} />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-12 lg:sticky lg:top-8 self-start">
            <AdDisplay ads={ads} position="top" />

            <RelatedNews
              title="संबंधित बातम्या"
              news={newsList
                .filter(
                  (n) => n._id !== news._id && n.category === news.category,
                )
                .slice(0, 6)
                .map((n) => ({
                  title: n.title,
                  img: n.thumbnailImage?.cdnUrl || n.image?.cdnUrl || "/placeholder.png",
                  id: n._id,
                  slug: n.slug,
                }))}
            />

            <AdDisplay ads={ads} position="bottom" />

            <LatestNews
              news={newsList
                .filter(n => n.category !== "राशी वृत्त" && n.category !== "rashi-vrutta")
                .slice(0, 5)
                .map((n) => ({
                  title: n.title,
                  img: n.thumbnailImage?.cdnUrl || n.image?.cdnUrl || "/placeholder.png",
                  id: n._id,
                  slug: n.slug,
                }))}
            />

            {newsList[0] && (
              <ShortsCard category="राशी वृत्त" />
            )}

            <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black">फोटो गॅलरी</h3>
                <div className="flex-1 border-t-2 border-red-600" />
              </div>

              <div className="relative h-64 overflow-hidden rounded-xl cursor-pointer group">
                <img
                  src="https://images.unsplash.com/photo-1563805042-7684c019e1cb"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Gallery"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Play size={12} fill="currentColor" /> ९ फोटो
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-lg font-bold leading-tight line-clamp-2">
                    'हे' १० वाफाळलेले भारतीय पदार्थ आरोग्यासाठी फायदेशीर
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Buttons with Tracking */}
      <div className="fixed bottom-10 right-6 flex flex-col gap-3 z-[100] md:hidden">
        <button
          onClick={handleShare}
          type="button"
          className="w-10 h-10 !p-0 flex items-center justify-center bg-yellow-600 text-white rounded-md shadow-lg active:scale-90 transition-all border-none cursor-pointer"
        >
          {copied ? (
            <Check size={20} className="text-white" />
          ) : (
            <FaShare size={20} className="text-white" />
          )}
        </button>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            (window as any).gtag?.("event", "share", {
              method: "Facebook_Mobile",
              content_id: id,
            })
          }
          className="w-10 h-10 bg-[#1877F2] text-white flex items-center justify-center rounded-md shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(news.title + " " + shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            (window as any).gtag?.("event", "share", {
              method: "WhatsApp_Mobile",
              content_id: id,
            })
          }
          className="w-10 h-10 bg-[#25D366] text-white flex items-center justify-center rounded-md shadow-lg"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setIsPreviewOpen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPreviewOpen(false);
            }}
            className="absolute top-6 right-6 p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors z-[210]"
          >
            <X size={28} />
          </button>

          <img
            src={news.image?.cdnUrl || "/placeholder.png"}
            alt={news.title}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[90vh] object-contain rounded-lg relative z-[205] shadow-2xl"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
