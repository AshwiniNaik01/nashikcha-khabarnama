// "use client";

// import React from "react";
// import { Quote as QuoteIcon, Sparkle } from "lucide-react";
// import { Quote } from "@/components/services/newsService";

// interface QuoteSectionProps {
//   quotes: Quote[];
// }

// const QuoteSection: React.FC<QuoteSectionProps> = ({ quotes }) => {
//   if (!quotes || !Array.isArray(quotes) || quotes.length === 0) return null;

//   return (
//     <div className="relative my-16 mx-auto max-w-5xl space-y-12">
//       {/* Section Heading */}
//       <div className="mb-8 text-center">
//         <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
//           खास नासिकचा विचार
//         </h2>
//       </div>

//       {quotes.map((quote, index) => {
//         if (!quote || !quote.text) return null;

//         return (
//           <div key={index} className="relative group/quote">
//             {/* Outer Glow / Border */}
//             <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-400 to-red-600 rounded-lg blur opacity-10 transition duration-1000 group-hover/quote:duration-200" />

//             {/* Main Card */}
//             <div className="relative bg-white border border-gray-100 rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row items-stretch h-auto md:h-[250px]">

//               {/* Left Image */}
//               <div className="w-full md:w-[50%] h-[200px] md:h-full bg-gray-50 flex-shrink-0 flex items-center justify-center relative rounded-l-lg overflow-hidden">
//                 {quote.quoteImage?.cdnUrl ? (
//                   <img
//                     src={quote.quoteImage.cdnUrl}
//                     alt={quote.name}
//                     className="w-full h-full object-fit transition-transform duration-700 group-hover/quote:scale-105"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
//                     <QuoteIcon size={120} className="opacity-20 rotate-12 text-red-200" />
//                   </div>
//                 )}
//               </div>

//               {/* Right Content */}
//               <div className="flex-1 p-8 md:p-10 flex flex-col relative overflow-hidden">
//                 {/* Decorative Quote Icon */}
//                 <div className="absolute top-4 right-8 opacity-[0.05] pointer-events-none">
//                   <QuoteIcon size={120} className="text-red-900" />
//                 </div>

//                 <div className="flex-1 flex flex-col justify-center overflow-y-auto custom-scrollbar pr-2">
//                   {/* Header */}
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="flex items-center gap-1 text-red-600 font-bold text-sm uppercase tracking-widest">
//                       <Sparkle size={14} className="animate-pulse" />
//                       नासिकचा खबरनामा विशेष
//                     </div>
//                   </div>

//                   {/* Quote */}
//                   <blockquote className="relative">
//                     <p
//                       className="text-lg md:text-xl font-black text-gray-900 leading-relaxed italic"
//                       dangerouslySetInnerHTML={{ __html: quote.text }}
//                     />
//                   </blockquote>

//                   {/* Signature */}
//                   <div className="mt-6 flex items-center justify-between">
//                     <div className="space-y-1">
//                       <cite className="not-italic text-sm md:text-md">
//                         <span className="block text-red-600 font-black text-md md:text-lg uppercase tracking-tight">
//                           — {quote.name}
//                         </span>
//                       </cite>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Bottom Interactive Bar */}
//               <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-50">
//                 <div className="h-full bg-red-600 w-0 group-hover/quote:w-full transition-all duration-700 ease-in-out" />
//               </div>
//             </div>
//           </div>
//         );
//       })}

//       {/* Background Floating Accents */}
//       <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-100/40 rounded-full blur-[60px] -z-10" />
//       <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-100/40 rounded-full blur-[80px] -z-10" />
//     </div>
//   );
// };

// export default QuoteSection;



"use client";

import React from "react";
import { Quote as QuoteIcon, Sparkle } from "lucide-react";
import { Quote } from "@/components/services/newsService";

interface QuoteSectionProps {
  quotes: Quote[];
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ quotes }) => {
  if (!quotes || !Array.isArray(quotes) || quotes.length === 0) return null;

  return (
    <div className="relative my-16 mx-auto max-w-5xl space-y-12 px-4">
      {/* Section Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center justify-center gap-4">
          <div className="h-[2px] w-12 bg-red-600 hidden md:block" />
          खास नासिकचा विचार
          <div className="h-[2px] w-12 bg-red-600 hidden md:block" />
        </h2>
      </div>

      {quotes.map((quote, index) => {
        if (!quote || !quote.text) return null;
        const hasImage = !!quote.quoteImage?.cdnUrl;

        return (
          <div key={index} className="relative group/quote">
            {/* Outer Glow / Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-400 to-red-600 rounded-xl blur opacity-10 transition duration-1000 group-hover/quote:opacity-20 group-hover/quote:duration-200" />

            {/* Main Card */}
            <div className={`relative bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row items-stretch min-h-[220px] ${hasImage ? 'md:h-[260px]' : 'md:h-auto'}`}>

              {/* Left Image Section - Only shown if image exists */}
              {hasImage && (
                <div className="w-full md:w-[40%] h-[200px] md:h-full bg-gray-50 flex-shrink-0 relative overflow-hidden border-b md:border-b-0 md:border-r border-gray-100">
                  <img
                    src={quote.quoteImage?.cdnUrl}
                    alt={quote.name}
                    className="w-full h-full object-fit transition-transform duration-700 group-hover/quote:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                </div>
              )}

              {/* Content Section - Adapts width and padding if no image */}
              <div className={`flex-1 p-8 md:p-10 flex flex-col relative overflow-hidden justify-center ${!hasImage ? 'bg-gradient-to-br from-red-50/30 to-white py-12' : ''}`}>

                {/* Large Background Quote Icon */}
                <div className={`absolute pointer-events-none transition-transform duration-700 group-hover/quote:scale-110 ${!hasImage ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]' : 'top-4 right-8 opacity-[0.05]'}`}>
                  <QuoteIcon size={!hasImage ? 240 : 120} className="text-red-900" />
                </div>

                <div className={`relative z-10 flex flex-col justify-center ${!hasImage ? 'items-center text-center max-w-3xl mx-auto' : ''}`}>
                  {/* Decorative Label */}
                  <div className={`flex items-center gap-2 mb-4 ${!hasImage ? 'justify-center' : ''}`}>
                    <div className="flex items-center gap-1 text-red-600 font-bold text-[10px] md:text-sm uppercase tracking-[0.2em]">
                      <Sparkle size={14} className="animate-pulse" />
                      विशेष संवाद
                    </div>
                  </div>

                  {/* Quote Text */}
                  <blockquote className="relative">
                    <p
                      className={`${!hasImage ? 'text-xl md:text-3xl' : 'text-lg md:text-xl'} font-black text-gray-900 leading-relaxed italic`}
                      dangerouslySetInnerHTML={{ __html: quote.text }}
                    />
                  </blockquote>

                  {/* Signature / Author */}
                  <div className={`mt-6 flex items-center ${!hasImage ? 'justify-center' : 'justify-start'}`}>
                    <div className="h-[2px] w-6 bg-red-600 mr-3" />
                    <cite className="not-italic">
                      <span className="block text-red-600 font-black text-md md:text-lg uppercase tracking-tight">
                        {quote.name}
                      </span>
                    </cite>
                  </div>
                </div>
              </div>

              {/* Animated Progress-like Hover Bar at Bottom */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-50">
                <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 w-0 group-hover/quote:w-full transition-all duration-1000 ease-out" />
              </div>
            </div>
          </div>
        );
      })}

      {/* Background Accents (Blurred Circles) */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-100/30 rounded-full blur-[100px] -z-10" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-100/30 rounded-full blur-[120px] -z-10" />
    </div>
  );
};

export default QuoteSection; 