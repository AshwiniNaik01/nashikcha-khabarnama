"use client";

import React from "react";
import { Play, Share2 } from "lucide-react";

// Components Imports
import HeroSection from "@/components/news/HeroSection";
import NewsList from "@/components/news/NewsList";
import RelatedNews from "@/components/news/RelatedNews";
import LatestNews from "@/components/news/LatestNews";
import Advertisement from "@/components/news/Advertisement";
import FlightDescription from "@/components/news/FlightDescription";
import NewsCard from "@/components/news/NewsCard";
import ShortsCard from "@/components/news/ShortsCard";

export default function LoksattaUnifiedUI() {
  const newsList = [
    {
      category: "देश-विदेश",
      title:
        "इराणमध्ये अराजक! २ हजारांहून अधिक लोकांचा मृत्यू, सरकारने पहिल्यांदाच स्वीकारलं वास्तव",
      summary:
        "मृतांमध्ये सामान्य नागरिक किती आहेत आणि सुरक्षा दलांचे जवान किती आहेत हे स्पष्ट करण्यात आलेलं नाही.",
      time: "January 13, 2026 21:37 IST",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
      category: "अर्थवृत्त",
      title:
        "Jerome Powell : मध्यवर्ती बँकांच्या प्रमुखांकडून ‘फेड’च्या पॉवेल यांची पाठराखण...",
      summary:
        "अमेरिकेचे अध्यक्ष डोनाल्ड ट्रम्प यांच्या दबावा झुगारून फेडरल रिझर्व्हचे अध्यक्ष जेरोम पॉवेल यांच्या पाठीशी जगभरातील अकरा मध्यवर्ती बँकांच्या प्रमुखांनी एकमुखी...",
      time: "January 13, 2026 20:40 IST",
      img: "https://images.unsplash.com/photo-1611974714658-058e11ee9d6f",
    },
    {
      category: "Uncategorized",
      title: "‘ब्लिंकिट’चा महत्त्वाचा निर्णय, १० मिनिटांत घरपोच वस्तू सेवा बंद",
      summary:
        "ब्लिंकिट या घरपोच वस्तू वितरणारी सेवा प्रदान करणाऱ्या कंपनीने आता ‘१० मिनिटांमध्ये घरपोच वस्तू’ ही सेवा बंद करण्याचा निर्णय घेतला...",
      time: "January 13, 2026 22:10 IST",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      category: "देश-विदेश",
      title:
        "इराणमध्ये अराजक! २ हजारांहून अधिक लोकांचा मृत्यू, सरकारने पहिल्यांदाच स्वीकारलं वास्तव",
      summary:
        "मृतांमध्ये सामान्य नागरिक किती आहेत आणि सुरक्षा दलांचे जवान किती आहेत हे स्पष्ट करण्यात आलेलं नाही.",
      time: "January 13, 2026 21:37 IST",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
  ];

  const latestNews = [
    {
      title:
        "Mumbai Ahmedabad Flight: मुंबईहून अहमदाबादसाठी उड्डाण केलेल्या विमानाचे लँडिंग दोनदा अपयशी, १५ ते २० मिनिटे चालला थरार",
      img: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3",
    },
    {
      title:
        "युजवेंद्र चहल एक्स पत्नी धनश्रीबरोबर शोमध्ये एकत्र दिसणार? क्रिकेटपटूने सोडलं मौन, म्हणाला...",
      img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
    },
    {
      title:
        "ट्रम्प यांनी इराणवर लादलेल्या टॅरिफचा भारताला किती फटका बसणार? केंद्र सरकारने दिलं उत्तर",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      title:
        "ट्रम्प यांनी इराणवर लादलेल्या टॅरिफचा भारताला किती फटका बसणार? केंद्र सरकारने दिलं उत्तर",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
  ];

  const relatedNewsData = [
    {
      title:
        "Makar Sankranti 2026: मकर संक्रांतीनिमित्त प्रियजनांना पाठवा या खास मराठी शुभेच्छा!",
      img: "https://images.unsplash.com/photo-1590011221312-320d398d5771",
    },
    {
      title:
        "Mumbai Ahmedabad Flight: मुंबईहून अहमदाबादसाठी उड्डाण केलेल्या विमानाचे लँडिंग दोनदा अपयशी...",
      img: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3",
    },
    {
      title:
        "युजवेंद्र चहल एक्स पत्नी धनश्रीबरोबर शोमध्ये एकत्र दिसणार? क्रिकेटपटूने सोडलं मौन...",
      img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
    },
    {
      title:
        "ट्रम्प यांनी इराणवर लादलेल्या टॅरिफचा भारताला किती फटका बसणार? केंद्र सरकारने दिलं उत्तर",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      title:
        "युजवेंद्र चहल एक्स पत्नी धनश्रीबरोबर शोमध्ये एकत्र दिसणार? क्रिकेटपटूने सोडलं मौन...",
      img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
    },
    {
      title:
        "ट्रम्प यांनी इराणवर लादलेल्या टॅरिफचा भारताला किती फटका बसणार? केंद्र सरकारने दिलं उत्तर",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="py-2">
        <div className="group mb-8">
          <div className="flex items-center gap-4 mb-3">
            <span className="bg-gray-900 text-white px-3 py-1 text-sm font-bold uppercase tracking-widest">
              देश-विदेश
            </span>
            <div className="flex-1 h-[2px] bg-gray-200 group-hover:bg-red-600 transition-colors duration-300" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight hover:text-red-600 transition-colors cursor-pointer">
            Mumbai Ahmedabad Flight:{" "}
            <span className="text-red-600">मुंबईहून अहमदाबादसाठी</span> उड्डाण
            केलेल्या विमानाचे लँडिंग दोनदा अपयशी
          </h1>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* --- LEFT CONTENT: MAIN STREAM --- */}
          <div className="col-span-12 lg:col-span-8 space-y-10">
            <HeroSection
              category="देश-विदेश"
              title="Mumbai Ahmedabad Flight: विमानाचे लँडिंग दोनदा अपयशी; १५ ते २० मिनिटे चालला थरार"
              img="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            />

            <Advertisement />
            <FlightDescription />
            <NewsCard />
            <NewsList news={newsList} />
            <Advertisement />
          </div>

          {/* --- RIGHT SIDEBAR --- */}
          <div className="col-span-12 lg:col-span-4 space-y-12">
            <Advertisement />

            <RelatedNews title="संबंधित बातम्या" news={relatedNewsData} />

            <Advertisement />

            <LatestNews news={latestNews} />

            {/* --- SHORTS SECTION --- */}
            <ShortsCard
              title="“खूपच भयंकर...”, अभिनेत्रीने सांगितला कास्टिंग काउचचा अनुभव"
              category="मनोरंजन"
              time="15 hr ago"
            />

            {/* --- PHOTO GALLERY SECTION --- */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold font-sans">फोटो गॅलरी</h3>
                <div className="flex-1 border-t-2 border-gray-900" />
              </div>

              <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden group">
                <div className="relative h-64 overflow-hidden cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1563805042-7684c019e1cb"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Gallery"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded flex items-center gap-1 font-sans shadow-md">
                    <Play size={12} fill="currentColor" /> 9 PHOTOS
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-xl font-bold mb-4 leading-tight group-hover:text-red-600 transition-colors cursor-pointer">
                    ‘हे’ १० वाफाळलेले भारतीय पदार्थ आरोग्यासाठी फायदेशीर
                  </h4>
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-xs font-sans">11 hours ago</span>
                    <Share2
                      size={20}
                      className="cursor-pointer hover:text-red-600 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
