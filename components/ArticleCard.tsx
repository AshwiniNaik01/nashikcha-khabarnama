

import Link from "next/link";
import Image from "next/image";

type ArticleCardProps = {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  category?: string;
  date?: string;
  featured?: boolean;
};

export default function ArticleCard({
  title,
  excerpt,
  image,
  slug,
  category,
  date,
  featured = false,
}: ArticleCardProps) {
  return (
    <article
      className={`group relative overflow-hidden bg-white text-black transition-all duration-500 flex flex-col h-full
      ${featured
          ? "lg:grid lg:grid-cols-12 gap-0 lg:gap-10 border-b-4 border-red-600 pb-12 mb-12"
          : "border-b border-zinc-200 dark:border-zinc-800 pb-8"
        }`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden cursor-pointer shrink-0
        ${featured ? "lg:col-span-7 aspect-[16/9]" : "w-full aspect-[16/10] mb-6"}`}
      >
        <Link href={`/news/${slug}`} className="block w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            priority={featured}
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 60vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
        </Link>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-0 left-0 z-10">
            <span className="bg-red-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter shadow-lg">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`flex flex-col flex-grow
        ${featured ? "lg:col-span-5 py-6 lg:py-2" : "w-full"}`}
      >
        {/* Meta */}
        {date && (
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center text-red-600">
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
              </svg>
            </div>

            <time className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
              {date}
            </time>
          </div>
        )}

        {/* Title */}
        <h2
          className={`font-bold text-zinc-900 dark:text-zinc-50 leading-[1.3] transition-colors
          ${featured
              ? "text-3xl lg:text-5xl"
              : "text-xl min-h-[3.5rem] line-clamp-2"
            }`}
        >
          <Link
            href={`/news/${slug}`}
            className="text-black hover:text-red-600 focus:outline-none focus:text-red-600 transition-colors"
          >
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p
          className={`text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6
          ${featured
              ? "text-lg line-clamp-3 min-h-[4.5rem]"
              : "text-sm line-clamp-2 min-h-[2.5rem]"
            }`}
        >
          {excerpt}
        </p>

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-2">
          <Link
            href={`/news/${slug}`}
            className="group/link flex items-center gap-3 text-sm font-bold text-zinc-900 "
          >
            <span className="relative">
              सविस्तर वाचा
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-red-600 scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left" />
            </span>

            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover/link:bg-red-600 group-hover/link:text-white transition-all duration-300">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
