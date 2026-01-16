import React from "react";

interface LatestNewsItem {
  title: string;
  img: string;
  time?: string; // वेळ दाखवण्यासाठी ऑप्शनल फील्ड
}

export default function LatestNews({ news }: { news: LatestNewsItem[] }) {
  return (
    <div className="space-y-5 bg-gray-50 p-4 rounded-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-bold font-sans border-l-4 border-red-600 pl-3">
          ताज्या बातम्या
        </h3>
        <div className="flex-1 border-t border-gray-300" />
      </div>

      {/* News List */}
      <div className="divide-y divide-gray-200">
        {news.map((item, i) => (
          <div
            key={i}
            className="flex gap-4 py-4 first:pt-0 last:pb-0 cursor-pointer group"
          >
            <div className="flex-1">
              <p className="text-sm font-bold leading-snug group-hover:text-red-600 transition-colors">
                {item.title}
              </p>
              {item.time && (
                <span className="text-[10px] text-gray-400 font-sans mt-1 block uppercase">
                  {item.time}
                </span>
              )}
            </div>

            {/* Small Square Thumbnail */}
            <div className="w-20 h-14 shrink-0 overflow-hidden rounded-sm">
              <img
                src={item.img}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <button className="w-full mt-2 py-2 text-xs font-bold text-gray-500 hover:text-red-600 border border-gray-200 rounded-sm bg-white transition-colors">
        आणखी बातम्या पाहा
      </button>
    </div>
  );
}
