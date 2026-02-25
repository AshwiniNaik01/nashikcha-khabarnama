"use client";

import React, { useEffect, useState } from "react";
import { getAllNews } from "@/components/services/newsService";
import { getCategoryLabel } from "@/components/constants/categories";
import CategoryClient from "./CategoryClient";

export default function CategoryPageWrapper({ params }: { params: Promise<{ category: string }> }) {
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

    return <CategoryClient categoryName={categoryName} articles={articles} loading={loading} />;
}
