"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GridNewsScroller() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const allItems = [
        { category: "निवडणूक", title: "नागपुरात काँग्रेस उमेदवाराचं कार्यालय जाळलं; भाजपकडे संशयाचं बोट; आरोप-प्रत्यारोपांनी राजकारण तापलं!" },
        { category: "राजकारण", title: "छत्रपती संभाजीनगरमध्ये भाजपच्या अतुल सावेंच्या वडिलांचे नाव मतदार यादीत, निवडणूक आयोगाचा भोंगळ..." },
        { category: "निवडणूक", title: "मुंबईत ठाकरेंचा 'भगवा गार्ड' पोलिसांना नडला, दुबार मतदारांना हेरण्यासाठी मतदान केंद्राबाहेर उभा!" },
        { category: "करमणूक", title: "तमन्ना भाटिया ते अक्षय कुमार; सेलिब्रिटींनी बजावला मतदानाचा हक्क" },
        { category: "पुणे", title: "मला राजकारण कळत नाही; भाजपचे आमदार सुभाष देशमुख नाराज?" },
        { category: "राजकारण", title: "मोठी बातमी: मुंबईत मतदारांच्या बोटावरील शाई पुसली" },
        { category: "भविष्य", title: "जानेवारीचा तिसरा आठवडा भाग्याचा की टेन्शनचा?" },
        { category: "निवडणूक", title: "मुंबई जिंकणं मराठी माणसाची पहिली लढाई" },
        { category: "नाशिक", title: "प्रभाग १२ मध्ये राष्ट्रवादी काँग्रेसची गोंधळात भर" },

        { category: "निवडणूक", title: "नागपुरात काँग्रेस उमेदवाराचं कार्यालय जाळलं; भाजपकडे संशयाचं बोट; आरोप-प्रत्यारोपांनी राजकारण तापलं!" },
        { category: "राजकारण", title: "छत्रपती संभाजीनगरमध्ये भाजपच्या अतुल सावेंच्या वडिलांचे नाव मतदार यादीत, निवडणूक आयोगाचा भोंगळ..." },
        { category: "निवडणूक", title: "मुंबईत ठाकरेंचा 'भगवा गार्ड' पोलिसांना नडला, दुबार मतदारांना हेरण्यासाठी मतदान केंद्राबाहेर उभा!" },
        { category: "करमणूक", title: "तमन्ना भाटिया ते अक्षय कुमार; सेलिब्रिटींनी बजावला मतदानाचा हक्क" },
        { category: "नाशिक", title: "मला राजकारण कळत नाही; भाजपचे आमदार सुभाष देशमुख नाराज?" },
        { category: "राजकारण", title: "मोठी बातमी: मुंबईत मतदारांच्या बोटावरील शाई पुसली" },
        { category: "भविष्य", title: "जानेवारीचा तिसरा आठवडा भाग्याचा की टेन्शनचा?" },
        { category: "निवडणूक", title: "मुंबई जिंकणं मराठी माणसाची पहिली लढाई" },
        { category: "नाशिक", title: "प्रभाग १२ मध्ये राष्ट्रवादी काँग्रेसची गोंधळात भर" },

    ];

    const chunkedSlides = [];
    for (let i = 0; i < allItems.length; i += 9) {
        chunkedSlides.push(allItems.slice(i, i + 9));
    }

    const scroll = (dir: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

            scrollRef.current.scrollTo({
                left: scrollTo,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="bg-white py-5">
            <div className="max-w-[1200px] mx-auto px-4 relative group">

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
                >
                    {chunkedSlides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            className="min-w-full grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-x-12 gap-y-8 snap-start"
                        >
                            {slide.map((item, i) => (
                                <div key={i} className="flex flex-col group/item cursor-pointer">
                                    <span className="text-red-600 text-[14px] font-bold mb-1">
                                        {item.category}
                                    </span>
                                    <h3 className="text-[#222] text-[16px] font-medium leading-[1.45] group-hover/item:text-red-600 transition-colors line-clamp-3">
                                        {item.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll("left")}
                    className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hidden group-hover:block"
                >
                    <ChevronLeft size={22} />
                </button>

                <button
                    onClick={() => scroll("right")}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hidden group-hover:block"
                >
                    <ChevronRight size={22} />
                </button>

                <div className="flex justify-center gap-2 mt-8">
                    <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                    <div className="h-1 w-6 bg-gray-400 rounded-full"></div>
                </div>

            </div>

            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
}
