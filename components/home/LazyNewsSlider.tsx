"use client";

import React, { useEffect, useState, useRef } from "react";
import NewsSlider from "@/components/NewsSlider";
import { getAllNews } from "@/components/services/newsService";
import { getCategoryLabel } from "@/components/constants/categories";

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

export default function LazyNewsSlider({ categoryTitle, categoryValue }: { categoryTitle: string, categoryValue?: string }) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [hasFired, setHasFired] = useState(false);
    const [loading, setLoading] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || hasFired) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setHasFired(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "300px" } // Load slightly before it comes into view
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [hasFired]);

    useEffect(() => {
        if (hasFired) {
            setLoading(true);
            // We use the same fetch logic as HomeClient but specific to the category
            getAllNews(categoryValue || categoryTitle)
                .then((newsData) => {
                    if (newsData && newsData.length > 0) {
                        const mappedArticles: Article[] = newsData.map((news: any) => ({
                            title: news.title,
                            excerpt: news.shortDescription || (news.content ? news.content.substring(0, 120) + "..." : ""),
                            image: news.thumbnailImage?.cdnUrl || news.image?.cdnUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
                            id: news._id,
                            slug: news.slug || news._id,
                            category: getCategoryLabel(news.category),
                            date: new Date(news.createdAt).toLocaleDateString("mr-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }),
                            views: "०",
                            isBreaking: false,
                        }));
                        setArticles(mappedArticles);
                    }
                })
                .catch(err => console.warn("Failed to load category slider", err))
                .finally(() => setLoading(false));
        }
    }, [hasFired, categoryTitle, categoryValue]);

    if (!hasFired || loading) {
        return (
            <div ref={ref} className="w-full min-h-[300px] flex items-center justify-center bg-gray-50/50 rounded-2xl animate-pulse">
                <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (articles.length === 0) {
        return null;
    }

    return <NewsSlider articles={articles} title={categoryTitle} />;
}
