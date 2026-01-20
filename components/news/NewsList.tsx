import React from "react";

interface NewsItem {
  category: string;
  title: string;
  summary: string;
  time: string;
  img: string;
}

export default function NewsList({ news }: { news: NewsItem[] }) {
  return (
    <div className="space-y-10">
      {news.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col md:flex-row gap-6 border-b border-dashed border-gray-300 pb-10 group cursor-pointer"
        >
          <div className="flex-1 order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors leading-snug">
              {item.title}
            </h3>
            <div className="flex items-center gap-2 mb-3 font-sans text-xs">
              <span className="text-red-600 font-bold uppercase">
                {item.category}
              </span>
              <span className="text-gray-400">| Updated: {item.time}</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed line-clamp-2">
              {item.summary}
            </p>
          </div>
          <div className="w-full md:w-64 h-40 order-1 md:order-2 shrink-0 overflow-hidden rounded-sm">
            <img
              src={item.img}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt={item.title}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
