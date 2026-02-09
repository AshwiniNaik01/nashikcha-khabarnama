"use client";

import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { getAllNews, NEWS_IMAGE_BASE_URL } from "@/components/services/newsService";
import { getCategoryLabel } from "@/components/constants/categories";
import { Loader2 } from "lucide-react";

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const loadContent = async () => {
      const resolvedParams = await params;
      const categoryKey = resolvedParams.category;
      const label = getCategoryLabel(categoryKey);
      setCategoryName(label);

      try {
        setLoading(true);
        // This will call the API directly from the browser (Client-side)
        // It uses your getAllNews which converts the label to an English slug
        const newsData = await getAllNews(label);

        const mapped = newsData
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((news: any) => ({
            title: news.title,
            excerpt: news.shortDescription || (news.content ? news.content.substring(0, 120) + "..." : ""),
            image: news.image?.cdnUrl || "https://via.placeholder.com/800x600",
            id: news._id,
            slug: news.slug || news._id,
            date: new Date(news.createdAt).toLocaleDateString('mr-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            category: getCategoryLabel(news.category)
          }));

        setArticles(mapped);
      } catch (error) {
        console.warn("Handled category news fetch issue:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [params]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-lokmat-red animate-spin" />
        <p className="text-gray-500 font-medium">बातम्या लोड होत आहेत...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-marathi">
      {/* Header */}
      <div className="border-b-4 border-lokmat-red pb-2 mb-8">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">
          {categoryName} <span className="text-lokmat-red">न्युज</span>
        </h1>
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-xl font-bold">या श्रेणीतील बातम्या उपलब्ध नाहीत.</p>
          <p className="mt-2 text-sm italic">श्रेणी: {categoryName}</p>
        </div>
      )}
    </div>
  );
}
