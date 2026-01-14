


"use client";

import React from "react";
import { Share2, ChevronRight, Play } from "lucide-react";

export default function LoksattaUnifiedUI() {
  const newsList = [
    {
      category: "देश-विदेश",
      title: "इराणमध्ये अराजक! २ हजारांहून अधिक लोकांचा मृत्यू, सरकारने पहिल्यांदाच स्वीकारलं वास्तव",
      summary: "मृतांमध्ये सामान्य नागरिक किती आहेत आणि सुरक्षा दलांचे जवान किती आहेत हे स्पष्ट करण्यात आलेलं नाही.",
      time: "January 13, 2026 21:37 IST",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
      category: "अर्थवृत्त",
      title: "Jerome Powell : मध्यवर्ती बँकांच्या प्रमुखांकडून ‘फेड’च्या पॉवेल यांची पाठराखण...",
      summary: "अमेरिकेचे अध्यक्ष डोनाल्ड ट्रम्प यांच्या दबावा झुगारून फेडरल रिझर्व्हचे अध्यक्ष जेरोम पॉवेल यांच्या पाठीशी जगभरातील अकरा मध्यवर्ती बँकांच्या प्रमुखांनी एकमुखी...",
      time: "January 13, 2026 20:40 IST",
      img: "https://images.unsplash.com/photo-1611974714658-058e11ee9d6f"
    },
    {
      category: "Uncategorized",
      title: "‘ब्लिंकिट’चा महत्त्वाचा निर्णय, १० मिनिटांत घरपोच वस्तू सेवा बंद",
      summary: "ब्लिंकिट या घरपोच वस्तू वितरणारी सेवा प्रदान करणाऱ्या कंपनीने आता ‘१० मिनिटांमध्ये घरपोच वस्तू’ ही सेवा बंद करण्याचा निर्णय घेतला...",
      time: "January 13, 2026 22:10 IST",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    }, {
      category: "देश-विदेश",
      title: "इराणमध्ये अराजक! २ हजारांहून अधिक लोकांचा मृत्यू, सरकारने पहिल्यांदाच स्वीकारलं वास्तव",
      summary: "मृतांमध्ये सामान्य नागरिक किती आहेत आणि सुरक्षा दलांचे जवान किती आहेत हे स्पष्ट करण्यात आलेलं नाही.",
      time: "January 13, 2026 21:37 IST",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    }
  ];
  const latestNews = [
    {
      title: "Mumbai Ahmedabad Flight: मुंबईहून अहमदाबादसाठी उड्डाण केलेल्या विमानाचे लँडिंग दोनदा अपयशी, १५ ते २० मिनिटे चालला थरार",
      img: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3"
    },
    {
      title: "युजवेंद्र चहल एक्स पत्नी धनश्रीबरोबर शोमध्ये एकत्र दिसणार? क्रिकेटपटूने सोडलं मौन, म्हणाला...",
      img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e"
    },
    {
      title: "ट्रम्प यांनी इराणवर लादलेल्या टॅरिफचा भारताला किती फटका बसणार? केंद्र सरकारने दिलं उत्तर",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    }
  ];

  return (
    <div className="bg-white text-black min-h-screen font-serif">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* --- SECTION HEADER --- */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-3xl font-black text-gray-900 font-sans tracking-tight">देश-विदेश</h2>
          <div className="flex-1 border-t-2 border-gray-900" />
        </div>

        <div className="grid grid-cols-12 gap-8">

          {/* --- LEFT CONTENT: NEWS STREAM --- */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            {/* Main Featured Hero */}
            <div className="relative group cursor-pointer mb-10">
              <div className="overflow-hidden rounded-sm h-[480px]">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 w-fit mb-3 font-sans">देश-विदेश</span>
                  <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight drop-shadow-lg">
                    Mumbai Ahmedabad Flight: मुंबईहून अहमदाबादसाठी उड्डाण केलेल्या विमानाचे लँडिंग दोनदा अपयशी, १५ ते २० मिनिटे चालला थरार
                  </h1>
                </div>
              </div>
            </div>

            {/* List News Items */}
            <div className="space-y-10">
              {newsList.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-6 border-b border-dashed border-gray-300 pb-10 group">
                  <div className="flex-1 order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3 font-sans text-xs">
                      <span className="text-red-600 font-bold uppercase">{item.category}</span>
                      <span className="text-gray-400">| Updated: {item.time}</span>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                  <div className="w-full md:w-64 h-40 order-1 md:order-2 shrink-0 overflow-hidden rounded-sm shadow-sm">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
              ))}

              {/* ADVERTISEMENT */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                {/* Advertisement */}
                <div>
                  <p className="text-center text-xs text-gray-500 mb-1">ADVERTISEMENT</p>
                  <img
                    src="https://dummyimage.com/300x250/0aa/fff&text=Advertisement"
                    className="w-full h-50 object-cover"
                  />
                </div>

              </div>
            </div>

          </div>

          {/* --- RIGHT SIDEBAR --- */}
          <div className="col-span-12 lg:col-span-4 space-y-12">

            {/* ADVERTISEMENT */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Advertisement */}
              <div>
                <p className="text-center text-xs text-gray-500 mb-1">ADVERTISEMENT</p>
                <img
                  src="https://dummyimage.com/300x250/0aa/fff&text=Advertisement"
                  className="w-full"
                />
              </div>

            </div>
            {/* TAJYA BATMYA (LATEST NEWS) */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold font-sans">ताज्या बातम्या</h3>
                <div className="flex-1 border-t-2 border-gray-900" />
              </div>
              {latestNews.map((news, i) => (
                <div key={i} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 cursor-pointer group">
                  <p className="text-sm font-bold flex-1 leading-snug group-hover:text-red-600">
                    {news.title}
                  </p>
                  <div className="w-24 h-16 shrink-0 overflow-hidden">
                    <img src={news.img} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
            {/* LOKSATTA SHORTS WITH VIDEO */}
            <div className="pt-2">
              <div className="border-[12px] border-black rounded-[50px] overflow-hidden bg-white shadow-2xl mx-auto w-full">
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-red-600 text-2xl font-black font-sans tracking-tighter">नाशिकचा खबरनामा</span>
                    <span className="text-2xl italic font-light font-sans tracking-tighter">Shorts</span>
                  </div>

                  {/* Video Section - Replacing static images with Video */}
                  <div className="relative rounded-2xl overflow-hidden h-64 mb-5 bg-black group">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                    >

                      <source src="https://youtu.be/TtPXvEcE11E?si=3Cq8R4MMS346ie68" type="video/mp4" />

                    </video>

                    {/* Play Icon Overlay (Optional) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={40} className="text-white fill-current" />
                    </div>
                  </div>

                  {/* Content */}
                  <h4 className="text-xl font-bold leading-tight mb-3">
                    “खूपच भयंकर...”, अभिनेत्रीने सांगितला कास्टिंग काउचचा धक्कादायक अनुभव; म्हणाली, “त्याला...”
                  </h4>

                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-red-600 font-bold text-xs font-sans uppercase">मनोरंजन</span>
                    <span className="text-gray-400 text-xs font-sans">15 hr ago</span>
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-6 font-sans px-1">
                    टीव्ही अभिनेत्री रश्मी देसाईने तिच्या कास्टिंग काउचच्या अनुभवाबद्दल उघडपणे बोलले आहे. १६ वर्षांची असताना तिला ऑडिशनसाठी बोलावण्यात आले होते...
                  </p>

                  {/* Footer Button */}
                  <button className="w-full border-t border-gray-200 pt-5 text-red-600 font-bold text-lg flex items-center justify-center gap-1 hover:underline group">
                    सर्व शॉर्ट्स पाहा
                    <ChevronRight size={22} className="stroke-[3px] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* PHOTO GALLERY */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold font-sans">फोटो गॅलरी</h3>
                <div className="flex-1 border-t-2 border-gray-900" />
              </div>

              <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1563805042-7684c019e1cb" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded flex items-center gap-1 font-sans shadow-md">
                    <Play size={12} fill="currentColor" /> 9 PHOTOS
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-xl font-bold mb-4 leading-tight group-hover:text-red-600 transition-colors">
                    ‘हे’ १० वाफाळलेले भारतीय पदार्थ आरोग्यासाठी फायदेशीर
                  </h4>
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-xs font-sans">11 hours ago</span>
                    <Share2 size={20} className="cursor-pointer hover:text-red-600 transition-colors" />
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
