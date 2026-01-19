"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  Calendar,
  Share2,
  ChevronRight,
  Flame,
  Clock,
} from "lucide-react";

/**
 * Videos Page
 * - Optimized for "Display RatioParity" across Acer and Lenovo laptops.
 * - Uses fluid container widths to maintain visual structure.
 */
const VideosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("सर्व");

  const videoData = [
    {
      id: 1,
      title: "नाशिक: काळाराम मंदिरातील रामोत्सवाची जय्यत तयारी; पाहा खास व्हिडिओ",
      duration: "05:20",
      image: "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?q=80&w=1000",
      slug: "kalaram-mandir",
      category: "विशेष वार्तांकन",
      date: "आज",
    },
    {
      id: 2,
      title: "नाशिकच्या द्राक्ष बागांना अवकाळीचा तडाखा; बळीराजा पुन्हा संकटात",
      duration: "03:45",
      image: "https://images.unsplash.com/photo-1595034313331-295383560662?q=80&w=1000",
      slug: "grapes-loss",
      category: "शेती",
      date: "१ दिवसापूर्वी",
    },
    {
      id: 3,
      title: "नाशिक-पुणे सेमी हायस्पीड रेल्वे: जमिनीच्या मोजणीला वेग, लवकरच काम सुरू",
      duration: "04:12",
      image: "https://images.unsplash.com/photo-1474487585617-9df73aa82417?q=80&w=1000",
      slug: "railway-update",
      category: "विकास",
      date: "२ दिवसापूर्वी",
    },
    {
      id: 4,
      title: "त्र्यंबकेश्वर मंदिर परिसरात भाविकांची तुफान गर्दी; सुरक्षिततेसाठी कडक बंदोबस्त",
      duration: "02:30",
      image: "https://images.unsplash.com/photo-1614033463133-1463990494a8?q=80&w=1000",
      slug: "trimbakeshwar",
      category: "धर्म-अध्यात्म",
      date: "२ दिवसापूर्वी",
    },
    {
      id: 5,
      title: "नाशिक मिसळ महोत्सव: खवय्यांची तुफान गर्दी, पाहा सर्वात मोठी मिसळ",
      duration: "06:15",
      image: "https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?q=80&w=1000",
      slug: "misal-festival",
      category: "मनोरंजन",
      date: "३ दिवसापूर्वी",
    },
    {
      id: 6,
      title: "नाशिक महानगरपालिका: निवडणुकीच्या हालचालींना वेग, कोण मारणार बाजी?",
      duration: "08:10",
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000",
      slug: "nmc-election",
      category: "राजकारण",
      date: "४ दिवसापूर्वी",
    },
  ];

  const categories = ["सर्व", "मनोरंजन", "विशेष वार्तांकन", "खेळ", "शेती", "विकास", "राजकारण"];

  const filteredVideos =
    selectedCategory === "सर्व"
      ? videoData
      : videoData.filter((v) => v.category === selectedCategory);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-12 md:mb-20">
        <div className="lg:col-span-8 group relative cursor-pointer overflow-hidden bg-zinc-900 shadow-2xl rounded-2xl">
          <div className="relative aspect-video">
            <img
              src={videoData[0].image}
              className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-[1.5s]"
              alt="Main Video"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <Play fill="currentColor" size={30} className="md:size-40 ml-1 md:ml-2" />
              </div>
            </div>
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 flex flex-wrap items-center gap-2 md:gap-3">
              <span className="bg-red-600 text-white px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2">
                <Flame size={12} fill="white" /> LIVE
              </span>
              <span className="text-white/90 text-[10px] md:text-sm font-bold backdrop-blur-md bg-white/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/20">
                {videoData[0].duration} | {videoData[0].date}
              </span>
            </div>
          </div>
          <div className="p-4 md:p-8 bg-gradient-to-b from-neutral-800 to-neutral-500">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-black text-white leading-tight tracking-tighter">
              {videoData[0].title}
            </h1>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-red-600 italic">लोकप्रिय व्हिडिओ</h3>
            <Share2 size={18} className="text-zinc-400 cursor-pointer hover:text-red-600 transition-colors" />
          </div>
          <div className="bg-gray-100 aspect-video lg:aspect-square flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 p-6 group cursor-pointer transition-all rounded-xl text-center">
            <p className="text-zinc-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4">Advertisement</p>
            <span className="text-zinc-400 italic font-medium group-hover:text-zinc-600">
              नाशिक एक्सप्रेस <br /> विशेष जाहिरात जागा
            </span>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="sticky top-4 z-50 bg-white/20  backdrop-blur-xl rounded-xl md:rounded-2xl  dark:border-zinc-800/50 shadow-lg overflow-hidden">
        <div className="px-4 md:px-6 flex items-center h-14 md:h-16 gap-4 md:gap-8 overflow-x-auto no-scrollbar">
          <span className="text-red-600 font-black text-xl md:text-2xl tracking-tighter italic border-r pr-4 md:pr-6 border-zinc-200 dark:border-zinc-800 shrink-0">
            व्हिडिओ
          </span>
          <div className="flex gap-6 md:gap-8 py-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedCategory(item)}
                suppressHydrationWarning
                className={`text-[11px] md:text-sm font-bold uppercase tracking-widest transition-colors shrink-0 ${selectedCategory === item
                  ? "text-red-600"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-red-600"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="space-y-8">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-6 md:h-8 w-1.5 bg-red-600 rounded-full"></div>
          <h2 className="text-2xl md:text-3xl font-black text-black  tracking-tighter">
            {selectedCategory === "सर्व" ? "ताज्या घडामोडी" : selectedCategory}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredVideos.map((post) => (
            <div key={post.id} className="flex flex-col group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 rounded-xl">
              <div className="relative aspect-video overflow-hidden">
                <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="w-14 h-14 bg-red-600 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white">
                    <Play fill="white" size={24} className="ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-base md:text-lg text-black leading-snug mb-4 line-clamp-2">{post.title}</h3>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-50">
                  <span className="text-zinc-400 text-[10px] md:text-[11px] font-bold flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                  <button suppressHydrationWarning className="text-red-600 text-xs font-black uppercase">पहा</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800 my-12" />

      {/* Nashik Fresh Videos Section */}
      <section className="mb-16 md:mb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-8 md:h-10 w-2 bg-red-600 rounded-full shadow-lg shadow-red-600/20"></div>
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tighter">
            नाशिकचे ताजे व्हिडिओ
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {videoData.map((post) => (
            <div key={post.id} className="flex flex-col group cursor-pointer">
              <div className="relative aspect-video overflow-hidden mb-4 shadow-lg rounded-xl transition-all duration-500">
                <img
                  src={post.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={post.title}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10">
                  <Clock size={10} /> {post.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="w-14 h-14 bg-red-600 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white">
                    <Play fill="white" size={24} className="ml-1" />
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-lg md:text-xl text-black leading-snug mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-[9px] md:text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded-md">
                    {post.category}
                  </span>
                  <span className="text-zinc-400 text-[10px] md:text-[11px] font-bold flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                </div>
                <ChevronRight
                  size={20}
                  className="text-zinc-400 group-hover:text-red-600 transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Must Watch Section */}
      <section className="mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-black text-black tracking-tighter">
              आवर्जून बघा
            </h2>
            <div className="h-1 w-16 md:w-20 bg-red-600"></div>
          </div>
          <div className="flex gap-3">
            <button
              suppressHydrationWarning
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-50 text-zinc-600"
            >
              ←
            </button>
            <button
              suppressHydrationWarning
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-red-600 transition-all shadow-lg"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {videoData.slice(0, 4).map((post) => (
            <div key={post.id} className="flex flex-col group">
              <div className="relative aspect-video overflow-hidden mb-4 bg-zinc-200 dark:bg-zinc-800 rounded-xl">
                <img
                  src={post.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={post.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 flex items-center justify-center w-9 h-9 bg-red-600 rounded-lg text-white shadow-lg transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                  <Play fill="currentColor" size={18} className="ml-0.5" />
                </div>
              </div>
              <h3 className="font-bold text-sm md:text-md text-black leading-tight mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-red-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest uppercase">
                {post.category} • {post.date}
              </p>
            </div>
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

export default VideosPage;
