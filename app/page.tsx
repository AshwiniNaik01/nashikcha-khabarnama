"use client";

import React, { useEffect, useState } from "react";
import NewsSlider from "@/components/NewsSlider";
import BreakingNews from "@/components/home/BreakingNews";
import HeroGrid from "@/components/home/HeroGrid";
import CategoryBlock from "@/components/home/CategoryBlock";
import Sidebar from "@/components/home/Sidebar";
import LiveNewsWidget from "@/components/home/LiveNewsWidget";
import WeatherWidget from "@/components/home/WeatherWidget";
import VideoGallery from "@/components/home/VideoGallery";
import PhotoGallery from "@/components/home/PhotoGallery";
import { getAllNews, News, NEWS_IMAGE_BASE_URL } from "@/components/services/newsService";
import { Loader2 } from "lucide-react";
import { getCategoryLabel } from "@/components/constants/categories";
import Advertisement from "@/components/news/Advertisement";
// import Advertisement from "@/components/home/Add";

interface Article {
  title: string;
  excerpt: string;
  image: string;
  id: string;
  slug: string;
  category: string;
  date: string;
  views?: string;
  isBreaking?: boolean;
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getAllNews();
        const mappedArticles: Article[] = newsData.map((news) => ({
          title: news.title,
          excerpt: news.shortDescription || (news.content ? news.content.substring(0, 120) + "..." : ""),
          image: news.image?.cdnUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
          id: news._id,
          slug: news.slug || news._id, // Use actual slug if exists, fallback to _id
          category: getCategoryLabel(news.category),
          date: new Date(news.createdAt).toLocaleDateString('mr-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          views: '०',
          isBreaking: false
        }));
        setArticles(mappedArticles);
      } catch (error) {
        console.warn("Handled news fetch issue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const trendingItems = articles.slice(0, 5).map((a, i) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    views: '१२.३k'
  }));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-lokmat-red animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">मुख्य बातम्या लोड होत आहेत...</p>
      </div>
    );
  }

  return (
    <>
      <BreakingNews />
      <div className="space-y-12 animate-in fade-in duration-700">

        <Advertisement className="w-full" />


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">


          <div className="lg:col-span-2 space-y-12">


            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-lokmat-red pb-2">
                <h2 className="text-xl font-bold uppercase border-l-4 border-lokmat-red pl-3">मुख्य बातम्या</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-red-50 text-lokmat-dark px-2 py-1 rounded-full">लाईव्ह</span>
                  <span className="text-xs text-gray-500">आत्ताच अपडेट</span>
                </div>
              </div>
              <HeroGrid articles={articles} />
            </div>

            {/* Maharashtra Category Block */}
            <CategoryBlock
              title="महाराष्ट्र"
              articles={articles.filter(a => a.category === "महाराष्ट्र").slice(0, 4)}
              href="/category/maharashtra"
            />
          </div>

          {/* RIGHT: Sidebar Widgets */}
          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-fit">
            <LiveNewsWidget />
            <WeatherWidget />
            <Sidebar trendingItems={trendingItems} />
          </aside>
        </div>

        {/* BOTTOM SECTION: Full Width Categories & Galleries */}
        <div className="space-y-16 w-full">
          {articles.filter(a => a.category === "देश-विदेश").length > 0 && (
            <NewsSlider articles={articles.filter(a => a.category === "देश-विदेश")} title="देश-विदेश" />
          )}

          <div className="space-y-12">
            {articles.filter(a => a.category === "महाराष्ट्र").length > 0 && (
              <NewsSlider articles={articles.filter(a => a.category === "महाराष्ट्र")} title="महाराष्ट्र" />
            )}

            {/* NEW: Cinematic Video Gallery */}
            {/* <VideoGallery /> */}
          </div>

          {articles.filter(a => a.category === "राजकारण").length > 0 && (
            <NewsSlider articles={articles.filter(a => a.category === "राजकारण")} title="राजकारण" />
          )}

          {articles.filter(a => a.category === "नासिक शहर").length > 0 && (
            <NewsSlider articles={articles.filter(a => a.category === "नासिक शहर")} title="नासिक शहर" />
          )}

          <div className="space-y-12">
            {articles.filter(a => a.category === "नासिक ग्रामीण").length > 0 && (
              <NewsSlider articles={articles.filter(a => a.category === "नासिक ग्रामीण")} title="नासिक ग्रामीण" />
            )}

            {/* NEW: Asymmetric Photo Gallery */}
            {/* <PhotoGallery /> */}
          </div>

          {articles.filter(a => a.category === "क्राईम").length > 0 && (
            <NewsSlider articles={articles.filter(a => a.category === "क्राईम")} title="क्राईम" />
          )}

          {articles.filter(a => a.category === "शेती").length > 0 && (
            <NewsSlider articles={articles.filter(a => a.category === "शेती")} title="शेती" />
          )}

          {articles.filter(a => a.category === "क्रीडा").length > 0 && (
            <NewsSlider articles={articles.filter(a => a.category === "क्रीडा")} title="क्रीडा" />
          )}
        </div>

      </div>
    </>
  );
}
