"use client";

import React, { useEffect, useState } from "react";
import { Play, Share2, Loader2, Calendar, User, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Components Imports
import HeroSection from "@/components/news/HeroSection";
import NewsList from "@/components/news/NewsList";
import RelatedNews from "@/components/news/RelatedNews";
import LatestNews from "@/components/news/LatestNews";
import Advertisement from "@/components/news/Advertisement";
import ShortsCard from "@/components/news/ShortsCard";
import { getNewsById, getAllNews, News } from "@/components/services/newsService";
import { getCategoryLabel } from "@/components/constants/categories";
import QuoteSection from "@/components/news/QuoteSection";

export default function NewsDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const slug = params.slug as string;

    const [news, setNews] = useState<News | null>(null);
    const [newsList, setNewsList] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                setLoading(true);
                setError(null);

                // 1. Fetch the specific news item using only the ID
                const singleNewsData = await getNewsById(id);

                if (singleNewsData) {
                    setNews(singleNewsData);
                    // Verify slug matches for SEO, if not redirect to correct URL
                    // But we keep the ID-first approach for the API
                    if (singleNewsData.slug && singleNewsData.slug !== slug) {
                        router.replace(`/news/${id}/${singleNewsData.slug}`);
                    }
                } else {
                    setError("बातमी सापडली नाही.");
                }

                // 2. Fetch all news for the sidebar/related sections
                const allNewsItems = await getAllNews();
                setNewsList(allNewsItems);

            } catch (err: any) {
                console.error("News Detail Fetch Error:", err);
                setError("बातमी उघडताना अडचण आली.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, slug, router]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
                <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
                <p className="text-gray-500 font-medium">बातमी लोड होत आहे...</p>
            </div>
        );
    }

    if (error || !news) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800">{error || "बातमी सापडली नाही"}</h2>
                <Link
                    href="/"
                    className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
                >
                    <ArrowLeft size={18} /> मुख्य पृष्ठावर जा
                </Link>
            </div>
        );
    }

    // Format dates and data for components
    const formattedDate = new Date(news.createdAt).toLocaleDateString('mr-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const relatedNewsData = newsList
        .filter(item => item._id !== news._id && item.category === news.category)
        .slice(0, 6)
        .map(item => ({
            title: item.title,
            img: item.image?.cdnUrl || "https://via.placeholder.com/400x300",
            id: item._id,
            slug: item.slug
        }));

    const latestNewsData = newsList
        .slice(0, 5)
        .map(item => ({
            title: item.title,
            img: item.image?.cdnUrl || "https://via.placeholder.com/400x300",
            id: item._id,
            slug: item.slug
        }));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <div className="py-2">
                {/* Breadcrumb & Category */}
                <div className="group mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-red-600 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm shadow-sm">
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
                        <div className="flex items-center gap-2 ml-auto">
                            <Share2 size={18} className="cursor-pointer hover:text-red-600 transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8 lg:gap-12">
                    {/* --- LEFT CONTENT: MAIN STREAM --- */}
                    <div className="col-span-12 lg:col-span-8 space-y-10">
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl mb-8">
                            <img
                                src={news.image?.cdnUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff"}
                                alt={news.title}
                                className="w-full h-full object-fit"
                            />
                        </div>

                        <div className="prose prose-lg max-w-none prose-headings:font-black prose-p:text-gray-700 prose-p:leading-relaxed">
                            <div className="rich-description prose prose-xl max-w-none prose-p:text-gray-800 prose-p:font-bold prose-p:italic mb-8 border-l-4 border-red-600 pl-6 py-2 bg-red-50/30 rounded-r-lg">
                                <div dangerouslySetInnerHTML={{ __html: news.shortDescription || "" }} />
                            </div>
                            <div
                                className="rich-content space-y-6"
                                dangerouslySetInnerHTML={{ __html: news.content }}
                            />
                        </div>

                        {news.quotes && news.quotes.length > 0 && (
                            <QuoteSection quotes={news.quotes} />
                        )}

                        <Advertisement />

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-red-600 rounded-full" />
                                आणखी बातम्या
                            </h3>
                            <NewsList news={newsList.slice(0, 4)} />
                        </div>
                    </div>

                    {/* --- RIGHT SIDEBAR --- */}
                    <div className="col-span-12 lg:col-span-4 space-y-12">
                        <Advertisement />

                        <RelatedNews title="संबंधित बातम्या" news={relatedNewsData} />

                        <Advertisement />

                        <LatestNews news={latestNewsData} />

                        {newsList[0] && (
                            <ShortsCard
                                id={newsList[0]._id}
                                slug={newsList[0].slug}
                                title={newsList[0].title}
                                category={newsList[0].category}
                                time={new Date(newsList[0].createdAt).toLocaleTimeString()}
                                posterImg={newsList[0].image?.cdnUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"}
                            />
                        )}

                        {/* --- PHOTO GALLERY WIDGET --- */}
                        <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <h3 className="text-2xl font-black">फोटो गॅलरी</h3>
                                <div className="flex-1 border-t-2 border-red-600" />
                            </div>

                            <div className="relative h-64 overflow-hidden rounded-xl cursor-pointer group">
                                <img
                                    src="https://images.unsplash.com/photo-1563805042-7684c019e1cb"
                                    className="w-full h-full object-fit group-hover:scale-110 transition-transform duration-700"
                                    alt="Gallery"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
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
        </div>
    );
}

