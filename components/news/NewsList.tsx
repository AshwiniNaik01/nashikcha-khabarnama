// import React from "react";

// interface NewsItem {
//   category: string;
//   title: string;
//   summary: string;
//   time: string;
//   img: string;
// }

// export default function NewsList({ news }: { news: NewsItem[] }) {
//   return (
//     <div className="space-y-10">
//       {news.map((item, idx) => (
//         <div
//           key={idx}
//           className="flex flex-col md:flex-row gap-6 border-b border-dashed border-gray-300 pb-10 group cursor-pointer"
//         >
//           <div className="flex-1 order-2 md:order-1">
//             <h3 className="text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors leading-snug">
//               {item.title}
//             </h3>
//             <div className="flex items-center gap-2 mb-3 font-sans text-xs">
//               <span className="text-red-600 font-bold uppercase">
//                 {item.category}
//               </span>
//               <span className="text-gray-400">| Updated: {item.time}</span>
//             </div>
//             <p className="text-gray-600 text-lg leading-relaxed line-clamp-2">
//               {item.summary}
//             </p>
//           </div>
//           <div className="w-full md:w-64 h-40 order-1 md:order-2 shrink-0 overflow-hidden rounded-sm">
//             <img
//               src={item.img}
//               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//               alt={item.title}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import React from "react";
import { News, NEWS_IMAGE_BASE_URL } from "@/components/services/newsService";
import Link from "next/link";

interface Props {
  news: News[];
}

export default function NewsList({ news }: Props) {
  return (
    <div className="space-y-10">
      {news.map((item) => (
        <div
          key={item._id}
          className="flex flex-col md:flex-row gap-6 border-b border-dashed border-gray-300 pb-10 group cursor-pointer"
        >
          <div className="flex-1 order-2 md:order-1">
            <Link href={`/news/${item._id}/${item.slug}`}>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors leading-snug">
                {item.title}
              </h3>
            </Link>

            <div className="flex items-center gap-2 mb-3 font-sans text-xs">
              <span className="text-red-600 font-bold uppercase">
                {item.category}
              </span>
              <span className="text-gray-400">
                | Updated:{" "}
                {new Date(item.createdAt).toLocaleString("mr-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <Link href={`/news/${item._id}/${item.slug}`}>
              <p className="text-gray-600 text-lg leading-relaxed line-clamp-2">
                {item.shortDescription?.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim()}
              </p>
            </Link>
          </div>

          <Link href={`/news/${item._id}/${item.slug}`} className="w-full md:w-64 h-40 order-1 md:order-2 shrink-0 overflow-hidden rounded-sm">
            <img
              src={
                item.image?.cdnUrl || "https://img.freepik.com/free-psd/3d-rendering-ui-icon_23-2149182289.jpg?t=st=1770375637~exp=1770379237~hmac=26e2df5a765bcce5a35efd84e1a2942bd17fbecc876c17ad88830c3885149494&w=1480://images.unsplash.com/photo-1542291026-7eec264c27ff"
              }
              className="w-full h-full object-fit group-hover:scale-110 transition-transform duration-700"
              alt={item.title}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
