import React from "react";
import RashiGrid from "@/components/rashi/RashiGrid";

export const metadata = {
  title: "राशीभविष्य | नाशिकचा खबरनामा",
  description:
    "तुमचे आजचे राशीभविष्य जाणून घ्या. मेष ते मीन सर्व १२ राशींचे अचूक भविष्य.",
};

/**
 * Rashi Page - Optimized for Display Parity & Visual Hierarchy
 * - Fixed: Background image visibility by adjusting stacking context.
 * - Improved: Blur and opacity for a premium "ethereal" look.
 */
const RashiPage = () => {
  return (
    <div className="text-gray-900 relative min-h-[80vh] overflow-hidden rounded-3xl">
      {/* 
                ZODIAC BACKGROUND LAYER
                - Changed from -z-10 to z-0 to prevent it from sliding behind the main page background.
                - Reduced blur slightly for better performance and actual visibility.
            */}
      <div
        className="fixed inset-0 z-0 opacity-20 filter pointer-events-none"
        style={{
          backgroundImage: "url('https://img.freepik.com/premium-psd/circle-golden-zodiac-signs-capricorn_684888-663.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* MAIN CONTENT LAYER */}
      <div className="py-8 md:py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-10 md:mb-16 relative">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-[0.2em]">
            भाग्य आणि भविष्य
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500">
              राशी
            </span>
            <span className="text-lokmat-red"> भविष्य</span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-700 max-w-2xl mx-auto font-serif italic">
            ग्रह-ताऱ्यांच्या चालीवर आधारित तुमचे आजचे, उद्याचे आणि या आठवड्याचे भविष्य जाणून घ्या.
            <span className="block mt-3 text-lokmat-maroon font-black not-italic">
              तुमचा दिवस शुभ राहो!
            </span>
          </p>
        </div>

        {/* Zodiac Grid */}
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000">
          <RashiGrid />
        </div>

        {/* Footer Message */}
        <div className="mt-20 text-center opacity-50">
          <p className="text-black text-xs font-bold uppercase tracking-widest max-w-md mx-auto">
            टीप: वरील राशीभविष्य हे सामान्य ग्रहमानावर आधारित आहे. अचूक मार्गदर्शनासाठी तज्ज्ञांचा सल्ला घ्या.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RashiPage;
