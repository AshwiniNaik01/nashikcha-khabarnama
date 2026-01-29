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
      className={`group relative overflow-hidden bg-white text-black transition-all duration-500 px-3 flex flex-col h-full
      ${featured
          ? "lg:grid lg:grid-cols-12 gap-6 lg:gap-10 border-b-4 border-red-600 pb-8 lg:pb-12 mb-8 lg:mb-12"
          : "border-b border-zinc-200 pb-6"
        }`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden cursor-pointer shrink-0 w-full
        ${featured
            ? "lg:col-span-7 aspect-video mb-4 lg:mb-0"
            : "aspect-[16/10] mb-4"
          }`}
      >
        <Link href={`/news/${slug}`} className="block w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            priority={featured}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {category && (
          <div className="absolute top-0 left-0 z-10">
            <span className="bg-[#E1261C] text-white px-2.3 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-tighter">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`flex flex-col flex-grow ${featured ? "lg:col-span-5 py-0 lg:py-2" : "w-full"
          }`}
      >
        {/* Meta Section */}
        {date && (
          <div className="flex items-center space-x-1.5 mb-2">
            <svg
              className="w-3 h-3 text-[#E1261C]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              {date}
            </time>
          </div>
        )}

        <h2
          className={`font-bold text-zinc-900 transition-colors duration-300 group-hover:text-[#E1261C] 
    /* 1. Line Height वाढवली (वेलांटीसाठी अत्यंत आवश्यक) */
    leading-[1.5] sm:leading-[1.4] 
    
    /* 2. Vertical Padding (अतिरिक्त जागा जेणेकरून मात्रा कट होणार नाहीत) */
    py-1
    
    /* 3. Font Size Scaling */
    ${featured
              ? "text-xl sm:text-2xl md:text-3xl lg:text-5xl mb-3"
              : "text-base sm:text-lg lg:text-xl mb-2 line-clamp-2"
            } 
    
    /* 4. Rendering Fix */
    antialiased`}
          style={{
            // काही ब्राउझरमध्ये वेलांटी कापली जाऊ नये म्हणून overflow सुरक्षित ठेवणे
            paddingTop: "0.2em",
            paddingBottom: "0.2em",
            lineHeight: "1.5",
          }}
        >
          <Link href={`/news/${slug}`} className="block">
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p
          className={`text-zinc-500 leading-relaxed mb-4 
          ${featured
              ? "text-base sm:text-base lg:text-lg line-clamp-2 lg:line-clamp-4"
              : "text-xs sm:text-sm line-clamp-2"
            }`}
        >
          {excerpt.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim()}
        </p>

        {/* CTA Section */}
        <div className="mt-auto pt-1 border-t border-zinc-100 flex justify-center">
          <Link
            href={`/news/${slug}`}
            className="group/link inline-flex items-center gap-3  text-md font-black text-zinc-900 uppercase tracking-tighter"
          >
            <span className="relative py-1">
              सविस्तर वाचा
              {/* Animated Underline */}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E1261C] scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-center" />
            </span>

            {/* Arrow Icon */}
            <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-50 border border-zinc-100 group-hover/link:bg-[#E1261C] group-hover/link:text-white group-hover/link:border-[#E1261C] transition-all duration-300 shadow-sm">
              <svg
                className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
