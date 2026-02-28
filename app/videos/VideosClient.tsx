

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Play, Calendar, Share2, Flame, Loader2 } from "lucide-react";
// import { getAllNews, News } from "@/components/services/newsService";

// const VideosClient = () => {
//   const [videos, setVideos] = useState<News[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const data = await getAllNews("व्हिडीओ");
//         setVideos(
//           data.sort(
//             (a, b) =>
//               new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
//           ),
//         );
//       } catch (error) {
//         console.warn("Handled video news fetch issue:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideos();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
//         <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
//         <p className="text-gray-500 font-medium">व्हिडीओ लोड होत आहेत...</p>
//       </div>
//     );
//   }

//   if (videos.length === 0) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center text-gray-500 font-bold text-xl">
//         सध्या कोणतेही व्हिडीओ उपलब्ध नाहीत.
//       </div>
//     );
//   }

//   const featured = videos[0];

//   return (
//     <div className="space-y-12 animate-in fade-in duration-700">
//       <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-12 md:mb-20">
//         <div className="lg:col-span-8 group relative cursor-pointer overflow-hidden bg-zinc-900 shadow-2xl rounded-2xl">
//           <Link href={`/news/${featured._id}/${featured.slug || featured._id}`}>
//             <div className="relative aspect-video">
//               <img
//                 src={
//                   featured.image?.cdnUrl ||
//                   "https://via.placeholder.com/1200x675"
//                 }
//                 className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-[1.5s]"
//                 alt="Main Video"
//               />
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="w-16 h-16 md:w-24 md:h-24 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
//                   <Play
//                     fill="currentColor"
//                     size={30}
//                     className="ml-1 md:ml-2"
//                   />
//                 </div>
//               </div>
//               <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 flex flex-wrap items-center gap-2 md:gap-3">
//                 <span className="bg-red-600 text-white px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2">
//                   <Flame size={12} fill="white" /> LIVE
//                 </span>
//                 <span className="text-white/90 text-[10px] md:text-sm font-bold backdrop-blur-md bg-white/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/20">
//                   {new Date(featured.createdAt).toLocaleDateString("mr-IN")}
//                 </span>
//               </div>
//             </div>
//             <div className="p-4 md:p-8 bg-gradient-to-b from-neutral-800 to-neutral-500">
//               <h1 className="text-xl md:text-3xl lg:text-5xl font-black text-white leading-tight tracking-tighter">
//                 {featured.title}
//               </h1>
//             </div>
//           </Link>
//         </div>

//         <div className="lg:col-span-4 flex flex-col gap-6">
//           <div className="flex items-center justify-between border-b border-zinc-200  pb-4">
//             <h3 className="text-sm font-black uppercase tracking-widest text-red-600 italic">
//               लोकप्रिय व्हिडिओ
//             </h3>
//             <Share2
//               size={18}
//               className="text-zinc-400 cursor-pointer hover:text-red-600 transition-colors"
//             />
//           </div>
//           <div className="bg-gray-100 aspect-video lg:aspect-square flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 p-6 group cursor-pointer transition-all rounded-xl text-center">
//             <p className="text-zinc-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4">
//               Advertisement
//             </p>
//             <span className="text-zinc-400 italic font-medium group-hover:text-zinc-600">
//               नाशिक एक्सप्रेस <br /> विशेष जाहिरात जागा
//             </span>
//           </div>
//         </div>
//       </section>

//       <section className="space-y-8">
//         <div className="flex items-center gap-3 md:gap-4">
//           <div className="h-6 md:h-8 w-1.5 bg-red-600 rounded-full"></div>
//           <h2 className="text-2xl md:text-3xl font-black text-black tracking-tighter">
//             ताज्या घडामोडी
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           {videos.slice(1).map((post) => (
//             <Link
//               key={post._id}
//               href={`/news/${post._id}/${post.slug || post._id}`}
//               className="flex flex-col group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 rounded-xl"
//             >
//               <div className="relative aspect-video overflow-hidden">
//                 <img
//                   src={
//                     post.image?.cdnUrl || "https://via.placeholder.com/800x450"
//                   }
//                   className="w-full h-full object-fit group-hover:scale-110 transition-transform duration-700"
//                   alt={post.title}
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
//                   <div className="w-14 h-14 bg-red-600 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white">
//                     <Play fill="white" size={24} className="ml-1" />
//                   </div>
//                 </div>
//               </div>
//               <div className="p-4 md:p-5 flex flex-col flex-grow">
//                 <h3 className="font-bold text-base md:text-lg text-black leading-snug mb-4 line-clamp-2">
//                   {post.title}
//                 </h3>
//                 <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-50">
//                   <span className="text-zinc-400 text-[10px] md:text-[11px] font-bold flex items-center gap-1">
//                     <Calendar size={12} />{" "}
//                     {new Date(post.createdAt).toLocaleDateString("mr-IN")}
//                   </span>
//                   <span className="text-red-600 text-xs font-black uppercase">
//                     पहा
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       <style jsx global>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VideosClient;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Play, Calendar, Share2, Flame, Loader2 } from "lucide-react";
import {
    getAllVideos,
    getVideoById,
    getYoutubeThumbnail,
    ApiVideoItem,
} from "@/components/services/videoServices";
import { getCategoryLabel } from "@/components/constants/categories";

const VideosClient = () => {
    const [videos, setVideos] = useState<ApiVideoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [featured, setFeatured] = useState<ApiVideoItem | null>(null);

    const fetchVideoById = async (id: string) => {
        try {
            const res = await getVideoById(id);
            return res.data;
        } catch (error) {
            console.warn("Handled video news fetch by id issue:", error);
        }
    };

    const handleVideoSelect = async (id: string) => {
        const video = await fetchVideoById(id);
        if (video) setFeatured(video);
    };

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await getAllVideos();
                if (res.success) {
                    const sorted = res.data.sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                    );
                    setVideos(sorted);
                    if (sorted.length > 0) setFeatured(sorted[0]);
                }
            } catch (error) {
                console.warn("Handled video news fetch issue:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
                <p className="text-gray-500 font-medium">व्हिडीओ लोड होत आहेत...</p>
            </div>
        );
    }

    if (videos.length === 0 || !featured) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-gray-500 font-bold text-xl">
                सध्या कोणतेही व्हिडीओ उपलब्ध नाहीत.
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-12 md:mb-20">
                {/* ── Featured video ── */}
                <div className="lg:col-span-8 group relative cursor-pointer overflow-hidden bg-zinc-900 shadow-2xl rounded-2xl">
                    <Link href={`/videos/${featured._id}`} className="block relative w-full h-full min-h-[300px] md:min-h-[400px]">
                        <img
                            src={
                                getYoutubeThumbnail(featured.videoUrl) ||
                                "https://via.placeholder.com/1200x675"
                            }
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[1.5s]"
                            alt={featured.title}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 md:w-24 md:h-24 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                <Play
                                    fill="currentColor"
                                    size={30}
                                    className="ml-1 md:ml-2"
                                />
                            </div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end pt-32">
                            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                <span className="bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2 shadow-lg">
                                    <Flame size={12} fill="white" /> LIVE
                                </span>
                                <span className="text-white/90 text-[10px] md:text-sm font-bold backdrop-blur-md bg-black/20 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/20 shadow-lg">
                                    {new Date(featured.createdAt).toLocaleDateString("mr-IN")}
                                </span>
                                <span className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
                                    {getCategoryLabel(featured.category)}
                                </span>
                            </div>
                            <h1 className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tighter drop-shadow-lg">
                                {featured.title}
                            </h1>
                        </div>
                    </Link>
                </div>

                {/* ── Sidebar ── */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                        <h3 className="text-sm font-black uppercase tracking-widest text-red-600 italic">
                            लोकप्रिय व्हिडिओ
                        </h3>
                        <Share2
                            size={18}
                            className="text-zinc-400 cursor-pointer hover:text-red-600 transition-colors"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        {videos
                            .slice(1, 4)
                            .map((video) => (
                                <Link
                                    key={`popular-${video._id}`}
                                    href={`/videos/${video._id}`}
                                    className="flex gap-4 group bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="relative w-32 shrink-0 aspect-video rounded-lg overflow-hidden">
                                        <img
                                            src={getYoutubeThumbnail(video.videoUrl) || "https://via.placeholder.com/300x168"}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            alt={video.title}
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                            <div className="w-8 h-8 rounded-full bg-red-600/90 text-white flex items-center justify-center backdrop-blur-sm shadow-lg">
                                                <Play fill="white" size={14} className="ml-0.5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h4 className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                                            {video.title}
                                        </h4>
                                        <span className="text-red-600 text-[10px] uppercase font-black tracking-tighter mt-1">
                                            {getCategoryLabel(video.category)}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-bold mt-1.5 uppercase flex items-center gap-1">
                                            <Calendar size={10} />
                                            {new Date(video.createdAt).toLocaleDateString("mr-IN")}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>

            {/* ── Grid ── */}
            <section className="space-y-8 ">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="h-6 md:h-8 w-1.5 bg-red-600 rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl font-black text-black tracking-tighter">
                        ताज्या घडामोडी
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {videos.slice(1).map((post) => (
                        <Link
                            key={post._id}
                            href={`/videos/${post._id}`}
                            className="flex flex-col group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 rounded-xl cursor-pointer"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={
                                        getYoutubeThumbnail(post.videoUrl) ||
                                        "https://via.placeholder.com/800x450"
                                    }
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    alt={post.title}
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    <div className="w-14 h-14 bg-red-600 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white">
                                        <Play fill="white" size={24} className="ml-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 md:p-5 flex flex-col flex-grow">
                                <h3 className="font-bold text-base md:text-lg text-black leading-snug mb-4 line-clamp-2">
                                    {post.title}
                                </h3>
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-50">
                                    <span className="text-zinc-400 text-[10px] md:text-[11px] font-bold flex items-center gap-1">
                                        <Calendar size={12} />{" "}
                                        {new Date(post.createdAt).toLocaleDateString("mr-IN")}
                                        <span className="mx-0.5">•</span>
                                        <span className="text-red-500 uppercase">  {getCategoryLabel(post.category)}</span>
                                    </span>
                                    <span className="text-red-600 text-xs font-black uppercase">
                                        पहा
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};

export default VideosClient;