// "use client";

// import React, { useEffect, useState } from "react";
// import { getAllBreakingNews, ApiBreakingNews } from "@/components/services/breakingNewsService";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";

// const BreakingNews = () => {
//   const [newsList, setNewsList] = useState<ApiBreakingNews[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBreakingNews = async () => {
//       try {
//         const response = await getAllBreakingNews();
//         if (response.success) {

//           const activeNews = response.data.filter((news) => news.status === "Active");
//           setNewsList(activeNews);
//         }
//       } catch (error) {
//         console.error("ब्रेकिंग न्यूज लोड करताना एरर आली:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBreakingNews();
//   }, []);

//   if (loading) return (
//     <div className="h-8 flex items-center justify-center bg-red-50 mx-4 rounded-lg">
//       <Loader2 className="animate-spin text-red-600" size={16} />
//     </div>
//   );

//   if (newsList.length === 0) return null;

//   const stripHtml = (html: string) => {
//     return html.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim();
//   };

//   return (
//     <div className="relative z-10 bg-red-50 border-y border-red-100 overflow-hidden xs:py-1.5 sm:py-2 flex items-center shadow-sm mx-2 xs:mx-3 sm:mx-4 md:mx-6 rounded-md">
//       {/* Label */}
//       <div className="bg-red-600 text-white text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-black px-2 xs:px-3 sm:px-4 py-0.5 xs:py-1 flex-shrink-0 uppercase italic tracking-tighter shadow-md z-10 whitespace-nowrap">
//         ब्रेकिंग न्यूज
//       </div>

//       {/* Marquee Content */}
//       <div className="flex-1 whitespace-nowrap overflow-hidden relative">
//         <div className="animate-marquee inline-block pl-3 xs:pl-4 sm:pl-6 md:pl-8 text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-gray-900">
//           {newsList.map((item) => (
//             <Link key={item._id} href={`/news/${item._id}/${item._id}`} className="inline-flex items-center hover:text-red-700 transition-colors">
//               <span className="mx-2 xs:mx-3 sm:mx-4 text-red-600 text-[6px] xs:text-[7px] sm:text-[8px]">
//                 ●
//               </span>
//               <span className="inline">{stripHtml(item.headline)}</span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BreakingNews;


"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import {
  getAllBreakingNews,
  ApiBreakingNews,
} from "@/components/services/breakingNewsService";

/* -------------------- Typewriter Hook -------------------- */
function useTypewriter(
  texts: string[],
  speed: number = 80,
  pause: number = 1500,
  isPaused: boolean = false
) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!texts.length || isPaused) return;

    if (!deleting && subIndex === texts[index].length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const t = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(t);
  }, [texts, index, subIndex, deleting, speed, pause, isPaused]);

  return {
    text: texts[index]?.substring(0, subIndex) || "",
    index,
  };
}

/* -------------------- Component -------------------- */
const BreakingNews = () => {
  const [newsList, setNewsList] = useState<ApiBreakingNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const response = await getAllBreakingNews();
        if (response.success) {
          const activeNews = response.data.filter(
            (news) => news.status === "Active"
          );
          setNewsList(activeNews);
        }
      } catch (error) {
        console.error("ब्रेकिंग न्यूज लोड करताना एरर आली:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreakingNews();
  }, []);

  const stripHtml = (html: string) =>
    html.replace(/<[^>]*>?/gm, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

  // ✅ ALWAYS create headlines (safe default) - Memoized to prevent frequent recalculations
  const headlines = React.useMemo(() =>
    newsList.length > 0
      ? newsList.map((item) => stripHtml(item.headline))
      : [],
    [newsList]
  );

  // ✅ ALWAYS call the hook
  const { text: currentText, index: currentIndex } =
    useTypewriter(headlines, 80, 1500, isHovered);

  // ⬇️ Now conditional returns are SAFE
  if (loading) {
    return (
      <div className="h-8 flex items-center justify-center bg-red-50 mx-4 rounded-lg">
        <Loader2 className="animate-spin text-red-600" size={16} />
      </div>
    );
  }

  if (newsList.length === 0) return null;

  const currentNews = newsList[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative z-10 bg-red-50 border-y border-red-100 mb-4 overflow-hidden xs:py-1.5 sm:py-2 flex items-center shadow-sm mx-2 xs:mx-3 sm:mx-4 md:mx-6 rounded-md group cursor-pointer"
    >

      {/* Label */}
      <div className="bg-red-600 text-white text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-black px-2 xs:px-3 sm:px-4 py-0.5 xs:py-1 flex-shrink-0 uppercase italic tracking-tighter shadow-md z-10 whitespace-nowrap group-hover:bg-red-700 transition-colors">
        ब्रेकिंग न्यूज
      </div>

      {/* Typewriter Content */}
      <div className="flex-1 px-3 xs:px-4 sm:px-6 md:px-8  overflow-hidden">
        <Link
          href={`/news/${currentNews?.newsId || currentNews?._id}/${currentNews?.slug || currentNews?.newsId || currentNews?._id}`}
          className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 hover:text-red-700 transition-colors"
        >
          {currentText}
          <span className={`ml-1 text-red-600 ${isHovered ? 'opacity-100' : 'animate-pulse'}`}>|</span>
        </Link>
      </div>
    </div>
  );
};

export default BreakingNews;
