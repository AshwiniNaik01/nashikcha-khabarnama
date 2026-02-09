import React from "react";
import Link from "next/link";

interface Article {
  title: string;
  excerpt: string;
  image: string;
  id: string;
  slug: string;
  category: string;
  date: string;
}

interface HeroGridProps {
  articles: Article[];
}

const HeroGrid: React.FC<HeroGridProps> = ({ articles }) => {
  if (articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 5);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main News Card */}
      <div className="lg:col-span-2">
        <Link href={`/news/${mainArticle.id}/${mainArticle.slug}`} className="block">
          {/* Image card */}
          <div className="relative group overflow-hidden rounded-sm shadow-xl aspect-[16/10] mb-4">
            <img
              src={mainArticle.image}
              alt={mainArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient overlay (category only) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
              <span className="bg-lokmat-red text-white text-[10px] uppercase font-black px-2 py-0.5 w-fit tracking-wider shadow-sm">
                {mainArticle.category}
              </span>
            </div>
          </div>

          {/* Title BELOW image */}
          <h1 className="mt-12 text-gray-900 text-xl md:text-2xl font-black leading-tight line-clamp-2 hover:text-lokmat-red cursor-pointer transition-all">
            {mainArticle.title}
          </h1>
        </Link>
      </div>

      {/* Side News Stack */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {sideArticles.map((article, i) => (
          <Link
            key={i}
            href={`/news/${article.id}/${article.slug}`}
            className="flex flex-col gap-3 group cursor-pointer border-b border-gray-100 pb-3"
          >
            <div className="relative overflow-hidden aspect-[16/9] rounded-sm">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="text-lokmat-red text-[10px] font-black uppercase tracking-wider">
                {article.category}
              </span>
              <h3 className="text-sm font-bold line-clamp-2 group-hover:text-lokmat-red transition-colors leading-snug mt-1">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HeroGrid;
