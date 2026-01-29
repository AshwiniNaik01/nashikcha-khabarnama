"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export default function GridNewsScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const allItems = [
    {
      id: "1",
      category: "निवडणूक",
      title:
        "नागपुरात काँग्रेस उमेदवाराचं कार्यालय जाळलं; भाजपकडे संशयाचं बोट; आरोप-प्रत्यारोपांनी राजकारण तापलं!",
    },
    {
      id: "2",
      category: "राजकारण",
      title:
        "छत्रपती संभाजीनगरमध्ये भाजपच्या अतुल सावेंच्या वडिलांचे नाव मतदार यादीत, आयोगाचा भोंगळ कारभार...",
    },
    {
      id: "3",
      category: "निवडणूक",
      title:
        "मुंबईत ठाकरेंचा 'भगवा गार्ड' पोलिसांना नडला, दुबार मतदारांना हेरण्यासाठी केंद्राबाहेर उभा!",
    },
    {
      id: "4",
      category: "करमणूक",
      title: "तमन्ना भाटिया ते अक्षय कुमार; सेलिब्रिटींनी बजावला मतदानाचा हक्क",
    },
    {
      id: "5",
      category: "पुणे",
      title: "मला राजकारण कळत नाही; भाजपचे आमदार सुभाष देशमुख नाराज?",
    },
    {
      id: "6",
      category: "राजकारण",
      title: "मोठी बातमी: मुंबईत मतदारांच्या बोटावरील शाई पुसली",
    },
    {
      id: "7",
      category: "भविष्य",
      title: "जानेवारीचा तिसरा आठवडा भाग्याचा की टेन्शनचा?",
    },
    { id: "8", category: "निवडणूक", title: "मुंबई जिंकणं मराठी माणसाची पहिली लढाई" },
    {
      id: "9",
      category: "नाशिक",
      title: "प्रभाग १२ मध्ये राष्ट्रवादी काँग्रेसची गोंधळात भर",
    },
    {
      id: "10",
      category: "निवडणूक",
      title:
        "नागपुरात काँग्रेस उमेदवाराचं कार्यालय जाळलं; भाजपकडे संशयाचं बोट; आरोप-प्रत्यारोपांनी राजकारण तापलं!",
    },
    {
      id: "11",
      category: "राजकारण",
      title:
        "छत्रपती संभाजीनगरमध्ये भाजपच्या अतुल सावेंच्या वडिलांचे नाव मतदार यादीत, आयोगाचा भोंगळ कारभार...",
    },
    {
      id: "12",
      category: "निवडणूक",
      title:
        "मुंबईत ठाकरेंचा 'भगवा गार्ड' पोलिसांना नडला, दुबार मतदारांना हेरण्यासाठी केंद्राबाहेर उभा!",
    },
    {
      id: "13",
      category: "करमणूक",
      title: "तमन्ना भाटिया ते अक्षय कुमार; सेलिब्रिटींनी बजावला मतदानाचा हक्क",
    },
    {
      id: "14",
      category: "पुणे",
      title: "मला राजकारण कळत नाही; भाजपचे आमदार सुभाष देशमुख नाराज?",
    },
    {
      id: "15",
      category: "राजकारण",
      title: "मोठी बातमी: मुंबईत मतदारांच्या बोटावरील शाई पुसली",
    },
    {
      id: "16",
      category: "भविष्य",
      title: "जानेवारीचा तिसरा आठवडा भाग्याचा की टेन्शनचा?",
    },
    { id: "17", category: "निवडणूक", title: "मुंबई जिंकणं मराठी माणसाची पहिली लढाई" },
    {
      id: "18",
      category: "नाशिक",
      title: "प्रभाग १२ मध्ये राष्ट्रवादी काँग्रेसची गोंधळात भर",
    },
  ];

  const chunkedSlides = [];
  for (let i = 0; i < allItems.length; i += 9) {
    chunkedSlides.push(allItems.slice(i, i + 9));
  }

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });

      // Update dot index
      if (dir === "left" && activeIndex > 0) setActiveIndex(activeIndex - 1);
      if (dir === "right" && activeIndex < chunkedSlides.length - 1)
        setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <div className="bg-[#fcfcfc] py-8 font-sans">
      <div className="max-w-[1240px] mx-auto px-6 relative group">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <TrendingUp size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
              महत्त्वाच्या घडामोडी
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              suppressHydrationWarning
              className="p-2.5 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 shadow-sm"
              disabled={activeIndex === 0}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              suppressHydrationWarning
              className="p-2.5 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 shadow-sm"
              disabled={activeIndex === chunkedSlides.length - 1}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory gap-4"
        >
          {chunkedSlides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 snap-start px-1"
            >
              {slide.map((item, i) => (
                <Link
                  key={i}
                  href={`/news/${item.id}`}
                  className="group/card relative flex flex-col cursor-pointer border-b border-gray-50 pb-4 hover:border-red-200 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    <span className="text-red-600 text-[16px] font-black uppercase tracking-widest">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-[#1a1a1a] text-[17px] font-bold leading-[1.5] transition-colors duration-300 line-clamp-3 mb-2">
                    {item.title}
                  </h3>

                  <div className="mt-auto flex items-center text-gray-400 group-hover/card:text-red-600 transition-all opacity-0 group-hover/card:opacity-100">
                    <span className="text-[11px] font-bold uppercase tracking-tighter">
                      सविस्तर वाचा
                    </span>
                    <ArrowUpRight size={14} className="ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Custom Pagination Indicators */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {chunkedSlides.map((_, i) => (
            <button
              key={i}
              suppressHydrationWarning
              className={`transition-all duration-500 rounded-full ${activeIndex === i
                ? "w-10 h-2 bg-red-600"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              onClick={() => {
                const scrollAmount = i * (scrollRef.current?.clientWidth || 0);
                scrollRef.current?.scrollTo({
                  left: scrollAmount,
                  behavior: "smooth",
                });
                setActiveIndex(i);
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
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
}
