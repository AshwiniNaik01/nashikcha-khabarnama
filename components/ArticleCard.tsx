import Link from "next/link";
import Image from "next/image";
import { HiChevronRight } from "react-icons/hi2";
import { FaRegCalendarAlt } from "react-icons/fa";

type ArticleCardProps = {
  title: string;
  excerpt: string;
  image: string;
  id: string;
  slug: string;
  category?: string;
  date?: string;
  featured?: boolean;
};

export default function ArticleCard({
  title,
  excerpt,
  image,
  id,
  slug,
  category,
  date,
  featured = false,
}: ArticleCardProps) {
  return (
    <article
      className={`group relative flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 ${featured ? "lg:flex-row lg:gap-8 p-4 lg:p-6" : "p-3"
        }`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden shrink-0 rounded-lg transition-all duration-500 ${featured
          ? "lg:w-[60%] aspect-[16/9]"
          : "aspect-[16/10] mb-4"
          }`}
      >
        <Link href={`/news/${id}/${slug}`} className="block w-full h-full relative z-0">
          <Image
            src={image}
            alt={title}
            fill
            priority={featured}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Subtle Inner Shadow for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </Link>

        {category && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-lokmat-red text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg backdrop-blur-sm">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={`flex flex-col flex-grow ${featured ? "justify-center py-4 lg:py-0" : ""}`}>
        {/* Date & Meta */}
        {date && (
          <div className="flex items-center gap-2 mb-3 text-gray-400">
            <FaRegCalendarAlt className="w-3 h-3 text-lokmat-red/70" />
            <time className="text-[10px] font-bold uppercase tracking-widest">
              {date}
            </time>
          </div>
        )}

        {/* Title */}
        <h2
          className={`font-black text-gray-900 group-hover:text-lokmat-red transition-colors duration-300 leading-tight mb-3 ${featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-lg lg:text-xl line-clamp-2"
            }`}
          style={{
            lineHeight: "1.4",
            paddingTop: "0.1em",
            paddingBottom: "0.1em",
          }}
        >
          <Link href={`/news/${id}/${slug}`} className="block">
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p
          className={`text-gray-500 leading-relaxed font-medium mb-5 ${featured ? "text-base lg:text-lg line-clamp-3" : "text-sm line-clamp-2"
            }`}
        >
          {excerpt.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim()}
        </p>

        {/* Action Button */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <Link
            href={`/news/${id}/${slug}`}
            className="inline-flex items-center gap-2 text-lokmat-red font-black text-xs uppercase tracking-widest group/btn"
          >
            <span>सविस्तर वाचा</span>
            <div className="w-6 h-6 rounded-full bg-lokmat-red/5 flex items-center justify-center group-hover/btn:bg-lokmat-red group-hover/btn:text-white transition-all duration-300">
              <HiChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
