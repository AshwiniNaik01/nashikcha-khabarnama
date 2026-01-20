import React from "react";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";

interface Article {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  category: string;
  date: string;
}

interface CategoryBlockProps {
  title: string;
  articles: Article[];
  href: string;
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({
  title,
  articles,
  href,
}) => {
  return (
    <div className="border-t-2 border-lokmat-red pt-4">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-xl font-black uppercase border-l-4 border-lokmat-red pl-3 tracking-wide">
          {title}
        </h2>
        <Link
          href={href}
          className="text-xs font-black text-black hover:text-lokmat-red transition-all uppercase flex items-center gap-1 group"
        >
          आणखी पहा{" "}
          <span className="group-hover:translate-x-1 transition-transform">
            »
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article, i) => (
          <ArticleCard key={i} {...article} />
        ))}
      </div>
    </div>
  );
};

export default CategoryBlock;
