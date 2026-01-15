"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Article = {
    title: string;
    excerpt: string;
    image: string;
    slug: string;
    category?: string;
    date?: string;
};

type Props = {
    articles: Article[];
    title: string;
};

const NewsSlider: React.FC<Props> = ({ articles, title }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end border-b-2 border-lokmat-red pb-2 mb-4">
                <h2 className="text-xl font-black uppercase border-l-4 border-lokmat-red pl-3 tracking-wide">
                    {title}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 bg-gray-100 hover:bg-lokmat-red hover:text-white transition-all rounded-full shadow-sm"
                        aria-label="Previous"
                        suppressHydrationWarning
                    >
                        <FaChevronLeft size={12} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 bg-gray-100 hover:bg-lokmat-red hover:text-white transition-all rounded-full shadow-sm"
                        aria-label="Next"
                        suppressHydrationWarning
                    >
                        <FaChevronRight size={12} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {articles.map((article, i) => (
                    <div
                        key={i}
                        className="min-w-[280px] md:min-w-[320px] lg:min-w-[350px] snap-start group"
                    >
                        <div className="relative overflow-hidden aspect-[16/9] rounded-sm mb-3 shadow-md">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {article.category && (
                                <span className="absolute top-2 left-2 bg-lokmat-red text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-wider shadow-sm">
                                    {article.category}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-sm md:text-md line-clamp-2 leading-snug group-hover:text-lokmat-red transition-colors">
                                <Link href={`/news/${article.slug}`}>{article.title}</Link>
                            </h3>
                            <div className="flex justify-between items-center pt-1">
                                {article.date && <span className="text-[10px] text-gray-400 font-semibold">{article.date}</span>}
                                <Link href={`/news/${article.slug}`} className="text-[10px] font-black text-black uppercase hover:text-lokmat-red hover:underline transition-colors">
                                    वाचा »
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsSlider;
