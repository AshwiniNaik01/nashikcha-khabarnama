import React from "react";

interface HeroProps {
  category: string;
  title: string;
  img: string;
}

export default function HeroSection({ category, title, img }: HeroProps) {
  return (
    <div className="relative group cursor-pointer mb-10">
      <div className="overflow-hidden rounded-sm h-[480px] relative">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 w-fit mb-3 font-sans">
            {category}
          </span>
          <h1 className="text-white text-3xl md:text-xl font-bold leading-tight drop-shadow-lg mb-3">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
