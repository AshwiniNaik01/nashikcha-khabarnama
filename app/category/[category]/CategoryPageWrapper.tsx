"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { getNewsPaginated } from "@/components/services/newsService";
import { getCategoryLabel } from "@/components/constants/categories";
import CategoryClient from "./CategoryClient";

const mapNews = (news: any, getCategoryLabel: (k: string) => string) => ({
    title: news.title,
    excerpt: news.shortDescription || (news.content ? news.content.substring(0, 120) + "..." : ""),
    image: news.thumbnailImage?.cdnUrl || news.image?.cdnUrl || "https://via.placeholder.com/800x600",
    id: news._id,
    slug: news.slug || news._id,
    date: new Date(news.createdAt).toLocaleDateString("mr-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }),
    category: getCategoryLabel(news.category),
});

export default function CategoryPageWrapper({ params }: { params: Promise<{ category: string }> }) {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const pageRef = useRef(1);
    const categoryLabelRef = useRef("");

    // Initial load
    useEffect(() => {
        const loadContent = async () => {
            const resolvedParams = await params;
            const categoryKey = resolvedParams.category;
            const label = getCategoryLabel(categoryKey);
            setCategoryName(label);
            categoryLabelRef.current = label;
            pageRef.current = 1;

            try {
                setLoading(true);
                const result = await getNewsPaginated({ category: label, page: 1 });

                const mapped = result.news
                    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((n: any) => mapNews(n, getCategoryLabel));

                setArticles(mapped);
                setHasNextPage(result.pagination.hasNextPage);
                pageRef.current = 2;
            } catch (error) {
                console.warn("Handled category news fetch issue:", error);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [params]);

    // Load more (called by CategoryClient's infinite scroll sentinel)
    const loadMore = useCallback(async () => {
        if (isFetchingMore || !hasNextPage) return;
        setIsFetchingMore(true);
        try {
            const result = await getNewsPaginated({
                category: categoryLabelRef.current,
                page: pageRef.current,
            });

            const mapped = result.news
                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((n: any) => mapNews(n, getCategoryLabel));

            setArticles((prev) => [...prev, ...mapped]);
            setHasNextPage(result.pagination.hasNextPage);
            pageRef.current += 1;
        } catch (error) {
            console.warn("Load more failed:", error);
        } finally {
            setIsFetchingMore(false);
        }
    }, [isFetchingMore, hasNextPage]);

    return (
        <CategoryClient
            categoryName={categoryName}
            articles={articles}
            loading={loading}
            isFetchingMore={isFetchingMore}
            hasNextPage={hasNextPage}
            onLoadMore={loadMore}
        />
    );
}
