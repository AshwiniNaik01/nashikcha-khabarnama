import React from "react";
import Link from "next/link";

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  img: string;
}

export default function RelatedNews({
  news,
  title,
}: {
  news: NewsItem[];
  title: string;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-bold font-sans">{title}</h3>
        <div className="flex-1 border-t-2 border-gray-900" />
      </div>
      {news.map((item, i) => (
        <Link
          key={i}
          href={`/news/${item.id}/${item.slug}`}
          className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 cursor-pointer group"
        >
          <p className="text-sm font-bold flex-1 leading-snug group-hover:text-red-600">
            {item.title}
          </p>
          <div className="w-24 h-16 shrink-0 overflow-hidden">
            <img src={item.img} className="w-full h-full object-cover" alt="" />
          </div>
        </Link>
      ))}
    </div>
  );
}
