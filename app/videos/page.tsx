"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Play, Calendar, Share2, ChevronRight, Tv, Flame, Clock } from "lucide-react";

const VideosPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("सर्व");
    const [activeVideo, setActiveVideo] = useState(null);
    const videoData = [
        { id: 1, title: "नाशिक: काळाराम मंदिरातील रामोत्सवाची जय्यत तयारी; पाहा खास व्हिडिओ", duration: "05:20", image: "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?q=80&w=1000", slug: "kalaram-mandir", category: "विशेष वार्तांकन", date: "आज" },
        { id: 2, title: "नाशिकच्या द्राक्ष बागांना अवकाळीचा तडाखा; बळीराजा पुन्हा संकटात", duration: "03:45", image: "https://images.unsplash.com/photo-1595034313331-295383560662?q=80&w=1000", slug: "grapes-loss", category: "शेती", date: "१ दिवसापूर्वी" },
        { id: 3, title: "नाशिक-पुणे सेमी हायस्पीड रेल्वे: जमिनीच्या मोजणीला वेग, लवकरच काम सुरू", duration: "04:12", image: "https://images.unsplash.com/photo-1474487585617-9df73aa82417?q=80&w=1000", slug: "railway-update", category: "विकास", date: "२ दिवसापूर्वी" },
        { id: 4, title: "त्र्यंबकेश्वर मंदिर परिसरात भाविकांची तुफान गर्दी; सुरक्षिततेसाठी कडक बंदोबस्त", duration: "02:30", image: "https://images.unsplash.com/photo-1614033463133-1463990494a8?q=80&w=1000", slug: "trimbakeshwar", category: "धर्म-अध्यात्म", date: "२ दिवसापूर्वी" },
        { id: 5, title: "नाशिक मिसळ महोत्सव: खवय्यांची तुफान गर्दी, पाहा सर्वात मोठी मिसळ", duration: "06:15", image: "https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?q=80&w=1000", slug: "misal-festival", category: "मनोरंजन", date: "३ दिवसापूर्वी" },
        { id: 6, title: "नाशिक महानगरपालिका: निवडणुकीच्या हालचालींना वेग, कोण मारणार बाजी?", duration: "08:10", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000", slug: "nmc-election", category: "राजकारण", date: "४ दिवसापूर्वी" },
    ]; const categories = ["सर्व", "मनोरंजन", "विशेष वार्तांकन", "शेती", "विकास", "राजकारण"];

    const filteredVideos = selectedCategory === "सर्व"
        ? videoData
        : videoData.filter(v => v.category === selectedCategory);

    return (
        <div className="bg-[#fcfcfc] dark:bg-zinc-950 min-h-screen font-sans selection:bg-red-100 selection:text-red-600">

            <main className="max-w-7xl mx-auto px-4 py-8">


                <section className="grid lg:grid-cols-12 gap-10 mb-20">
                    <div className="lg:col-span-8 group relative cursor-pointer overflow-hidden bg-zinc-900 shadow-2xl">
                        <div className="relative aspect-video">
                            <img
                                src={videoData[0].image}
                                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-[1.5s]"
                                alt="Main Video"
                            />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 bg-red-600 text-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform duration-500">
                                    <Play fill="currentColor" size={40} className="ml-2" />
                                </div>
                            </div>

                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <span className="bg-red-600 text-white px-4 py-1.5 text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2">
                                    <Flame size={14} fill="white" /> LIVE
                                </span>
                                <span className="text-white/90 text-sm font-bold backdrop-blur-md bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                                    {videoData[0].duration} | {videoData[0].date}
                                </span>
                            </div>
                        </div>
                        <div className="p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                                {videoData[0].title}
                            </h1>
                        </div>
                    </div>


                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-red-600 italic">लोकप्रिय व्हिडिओ</h3>
                            <Share2 size={18} className="text-zinc-400 cursor-pointer hover:text-red-600 transition-colors" />
                        </div>
                        <div className="bg-zinc-100 dark:bg-zinc-900  aspect-square flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-6 group cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all">
                            <p className="text-zinc-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4">Advertisement</p>
                            <span className="text-zinc-400 italic text-center font-medium group-hover:text-zinc-600">नाशिक एक्सप्रेस <br /> विशेष जाहिरात जागा</span>
                        </div>
                    </div>
                </section>


                <nav className="sticky top-15 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-lg mb-16 overflow-hidden">
                    <div className="px-6 flex items-center h-16 gap-8 overflow-x-auto no-scrollbar">
                        <Link href="/videos" className="text-red-600 font-black text-2xl tracking-tighter shrink-0 italic border-r pr-6 border-zinc-200 dark:border-zinc-800">
                            व्हिडिओ
                        </Link>
                        <div className="flex gap-8">
                            {["मनोरंजन", "विशेष वार्तांकन", "खेळ", "शेती", "विकास", "गोष्ट पुण्याची"].map((item) => (
                                <Link key={item} href="#" className="text-zinc-500 dark:text-zinc-400 font-bold text-sm uppercase tracking-widest hover:text-red-600 transition-colors shrink-0">
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-8 w-1.5 bg-red-600 rounded-full"></div>
                        <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                            {selectedCategory === "सर्व" ? "ताज्या घडामोडी" : selectedCategory}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredVideos.map((post) => (
                            <div key={post.id} className="flex flex-col group bg-white dark:bg-zinc-900  overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-800">
                                <div className="relative aspect-video overflow-hidden">
                                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />


                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white transform scale-75 group-hover:scale-100 transition-transform">
                                            <Play fill="white" size={20} className="ml-0.5" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                                        <Clock size={10} /> {post.duration}
                                    </div>
                                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 leading-snug mb-4 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer">
                                        {post.title}
                                    </h3>
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-50 dark:border-zinc-800">
                                        <span className="text-zinc-400 text-[11px] font-bold flex items-center gap-1">
                                            <Calendar size={12} /> {post.date}
                                        </span>
                                        <button className="text-red-600 text-xs font-black flex items-center gap-1 group-hover:gap-2 transition-all">
                                            आता पहा <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <hr className="border-zinc-200 dark:border-zinc-800 my-10" />
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-10 w-2 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
                        <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">नाशिकचे ताजे व्हिडिओ</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {videoData.map((post) => (
                            <div key={post.id} className="flex flex-col group cursor-pointer">
                                <div className="relative aspect-video overflow-hidden  mb-5 shadow-lg group-hover:shadow-red-600/10 transition-all duration-500">
                                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                                    {/* Duration Badge */}
                                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10">
                                        <Clock size={10} /> {post.duration}
                                    </div>

                                    {/* Small Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white">
                                            <Play fill="white" size={24} className="ml-1" />
                                        </div>
                                    </div>
                                </div>

                                <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-100 leading-snug mb-4 line-clamp-2 min-h-[3.5rem] group-hover:text-red-600 transition-colors">
                                    {post.title}
                                </h3>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded-md">{post.category}</span>
                                        <span className="text-zinc-400 text-[11px] font-bold flex items-center gap-1">
                                            <Calendar size={12} /> {post.date}
                                        </span>
                                    </div>
                                    <button className="text-zinc-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="border-zinc-200 dark:border-zinc-800 my-20" />

                <section className="mb-20">
                    <div className="flex items-center justify-between mb-12">
                        <div className="space-y-1">
                            <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-4">
                                आवर्जून बघा
                            </h2>
                            <div className="h-1 w-20 bg-red-600 "></div>
                        </div>
                        <div className="flex gap-3">
                            <button className="w-12 h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors shadow-sm text-zinc-600 dark:text-zinc-400">←</button>
                            <button className="w-12 h-12 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all shadow-lg shadow-zinc-200 dark:shadow-none">→</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {videoData.slice(0, 4).map((post) => (
                            <div key={post.id} className="flex flex-col group">
                                <div className="relative aspect-video overflow-hidden  mb-4 bg-zinc-200 dark:bg-zinc-800">
                                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-3 left-3 flex items-center justify-center w-10 h-10 bg-red-600 rounded-xl text-white shadow-lg transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                                        <Play fill="currentColor" size={20} className="ml-0.5" />
                                    </div>
                                </div>

                                <h3 className="font-bold text-md text-zinc-900 dark:text-zinc-100 leading-tight mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-red-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{post.category} • {post.date}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default VideosPage;