

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
          : "border-b border-zinc-200 pb-6" // pb-8 वरून pb-6 केले जेणेकरून खालची जागा कमी होईल
        }`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden cursor-pointer shrink-0
    ${featured ? "lg:col-span-7 aspect-[16/9]" : "w-full aspect-[16/10] mb-4"}`} // mb-6 वरून mb-4 केले
      >
        <Link href={`/news/${slug}`} className="block w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            priority={featured}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {category && (
          <div className="absolute top-0 left-0 z-10">
            <span className="bg-[#E1261C] text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-grow ${featured ? "lg:col-span-5 py-2" : "w-full"}`}>
        {/* Meta Section */}
        {date && (
          <div className="flex items-center space-x-1.5 mb-2">
            {/* Calendar SVG Icon */}
            <svg
              className="w-3 h-3 text-[#E1261C]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              {date}
            </time>
          </div>
        )}

        {/* Title */}
        <h2 className={`font-bold text-zinc-900 leading-[1.2] mb-2 ${featured ? "text-3xl lg:text-5xl" : "text-lg line-clamp-2"}`}>
          <Link href={`/news/${slug}`} className="hover:text-[#E1261C] transition-colors">
            {title}
          </Link>
        </h2>

        {/* Excerpt - Space Removed */}
        <p className={`text-zinc-500 leading-snug mb-4 ${featured ? "text-lg line-clamp-3" : "text-sm line-clamp-2"}`}>
          {excerpt}
        </p>

        {/* CTA - Space and Gap Reduced */}
        <div className="mt-auto pt-3 border-t border-zinc-100">
          <Link
            href={`/news/${slug}`}
            className="group/link flex items-center gap-1.5 text-xs font-black text-zinc-900 uppercase tracking-tight"
          >
            <span className="relative">
              सविस्तर वाचा
              <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[#E1261C] scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left" />
            </span>

            {/* Small Arrow Icon */}
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-100 group-hover/link:bg-[#E1261C] group-hover/link:text-white transition-all duration-300">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
