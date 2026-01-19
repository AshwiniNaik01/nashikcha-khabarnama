"use client";
import React, { useState } from "react";
import Image from "next/image";
function FlightDescription() {
  const [showMore, setShowMore] = useState(false);

  const shortDesc =
    "मुंबईहून अहमदाबादला जाणाऱ्या विमानाने लँडिंगसाठी दोनदा प्रयत्न केले पण दोन्ही वेळा अपयश आले. सुमारे २० मिनिटे प्रवाशांचा जीव टांगणीला लागला होता.";

  const paragraphs = [
    "मुंबई विमानतळावरून उड्डाण केलेल्या या विमानाला अहमदाबादच्या सरदार वल्लभभाई पटेल आंतरराष्ट्रीय विमानतळावर उतरताना निसर्गाच्या कोपाचा सामना करावा लागला. पहिल्या प्रयत्नावेळी धावपट्टीच्या अगदी जवळ पोहोचलेले असताना अचानक हवेचा दाब बदलला आणि दृश्यता (Visibility) कमालीची कमी झाली. सुरक्षिततेचा उपाय म्हणून पायलटने क्षणाचाही विलंब न लावता पुन्हा 'गो-अराउंड' करण्याचा निर्णय घेतला आणि विमान पुन्हा हवेत झेपावले.",
    "दुसऱ्या प्रयत्नात परिस्थिती अधिकच बिकट झाली. जोरदार वाऱ्यांमुळे (Crosswinds) विमानाचे संतुलन बिघडत होते. विमानाला हवेत धक्के बसू लागल्याने आत बसलेल्या प्रवाशांमध्ये भीतीचे वातावरण पसरले होते. तांत्रिक भाषेत याला 'विंड शीअर' (Wind Shear) म्हटले जाते. या कठीण परिस्थितीतही पायलटने कमालीचे संयम राखले आणि दुसऱ्यांदा लँडिंग रद्द करून सुरक्षित उंची गाठली.",
    "हवेतील तब्बल १५ ते २० मिनिटांच्या थरारानंतर, जेव्हा हवामान थोडे स्थिर झाले, तेव्हा तिसऱ्या प्रयत्नात पायलटने अतिशय कौशल्याने विमानाचे सुरक्षित लँडिंग केले. विमान जमिनीला टेकताच प्रवाशांनी टाळ्या वाजवून वैमानिकाचे आभार मानले. सोशल मीडियावर सध्या या घटनेचे व्हिडिओ व्हायरल होत असून, पायलटने घेतलेल्या धाडसी निर्णयाचे सर्वत्र कौतुक केले जात आहे.",
  ];

  return (
    <div className="mt-4 px-2 max-w-3xl mx-auto">
      {/* Description Area */}
      <div className="relative">
        <div
          className={`text-gray-800 text-base md:text-lg leading-relaxed transition-all duration-500 ${
            !showMore ? "line-clamp-2" : ""
          }`}
        >
          <span className="font-bold text-red-600 italic">थोडक्यात:</span>{" "}
          <span className="font-medium">{shortDesc}</span>
          {showMore && (
            <div className="mt-5 border-l-4 border-red-600 pl-5 py-2 bg-gray-50 text-gray-700 animate-in fade-in slide-in-from-top-2 duration-700">
              {/* Mapping through detailed paragraphs */}
              {paragraphs.map((para, index) => (
                <p key={index} className="mb-4 text-justify leading-loose">
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Improved Gradient Fade */}
        {!showMore && (
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white via-white/50 to-transparent" />
        )}
      </div>

      {/* Modern Action Button */}
      <button
        onClick={() => setShowMore(!showMore)}
        className="mt-6 flex items-center gap-3 group transition-all"
      >
        <div className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest group-hover:bg-black transition-all duration-300 shadow-lg transform group-active:scale-95">
          {showMore ? "कमी माहिती वाचा ↑" : "पूर्ण बातमी वाचा ↓"}
        </div>

        {/* Animated Line Effect */}
        <div className="h-[1px] w-16 bg-gray-300 group-hover:w-24 group-hover:bg-red-600 transition-all duration-500 hidden md:block"></div>
      </button>

      {/* Decorative Footer Line */}
      <div className="mt-10 border-b border-gray-100"></div>
    </div>
  );
}

export default FlightDescription;
