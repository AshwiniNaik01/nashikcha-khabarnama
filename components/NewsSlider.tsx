"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Article = {
    title: string;
    excerpt: string;
    image: string;
    id: string; // Added id
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
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    };

    useEffect(() => {
        // Initial check after mount
        updateScrollState();

        // Check on resize
        window.addEventListener("resize", updateScrollState);
        return () => window.removeEventListener("resize", updateScrollState);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const { clientWidth } = scrollRef.current;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -clientWidth : clientWidth,
            behavior: "smooth",
        });
    };

    return (
        <section className="space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-lokmat-red/30">
                <h2 className="text-xl font-black uppercase tracking-wide flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-lokmat-red" />
                    {title}
                </h2>

                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        aria-label="Previous"
                        suppressHydrationWarning
                        className={`p-2 rounded-full border transition-all
              ${canScrollLeft
                                ? "hover:bg-lokmat-red hover:text-white"
                                : "opacity-40 cursor-not-allowed"
                            }`}
                    >
                        <FaChevronLeft size={12} />
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        aria-label="Next"
                        suppressHydrationWarning
                        className={`p-2 rounded-full border transition-all
              ${canScrollRight
                                ? "hover:bg-lokmat-red hover:text-white"
                                : "opacity-40 cursor-not-allowed"
                            }`}
                    >
                        <FaChevronRight size={12} />
                    </button>
                </div>
            </div>

            {/* Slider */}
            <div
                ref={scrollRef}
                onScroll={updateScrollState}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
            >
                {articles.map((article, i) => (
                    <article
                        key={i}
                        className="min-w-[280px] md:min-w-[320px] lg:min-w-[360px] snap-start group"
                    >
                        {/* Image */}
                        <Link href={`/news/${article.id}/${article.slug}`} className="block">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-md shadow-md">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                {article.category && (
                                    <span className="absolute top-2 left-2 bg-lokmat-red text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-wider">
                                        {article.category}
                                    </span>
                                )}
                            </div>
                        </Link>

                        {/* Content */}
                        <div className="pt-3 space-y-2">
                            <h3 className="font-bold text-sm md:text-base leading-snug line-clamp-2 group-hover:text-lokmat-red transition-colors">
                                <Link href={`/news/${article.id}/${article.slug}`}>
                                    {article.title}
                                </Link>
                            </h3>

                            <div className="flex justify-between items-center text-md font-semibold">
                                {article.date && (
                                    <span className="text-gray-400">{article.date}</span>
                                )}
                                <Link
                                    href={`/news/${article.id}/${article.slug}`}
                                    className="uppercase font-black hover:text-lokmat-red hover:underline"
                                >
                                    वाचा »
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default NewsSlider;
