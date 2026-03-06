"use client";

import React from "react";
import ArticleCard from "@/components/ArticleCard";
import { Loader2 } from "lucide-react";

interface CategoryClientProps {
    categoryName: string;
    articles: any[];
    loading: boolean;
}

export default function CategoryClient({ categoryName, articles, loading }: CategoryClientProps) {
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
            <div className="border-b-4 border-lokmat-red pb-2 mb-8">
                <h1 className="text-3xl font-black tracking-tight text-gray-900">
                    {categoryName} <span className="text-lokmat-red">न्युज</span>
                </h1>
            </div>

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
