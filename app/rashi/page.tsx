import React from "react";
import RashiGrid from "@/components/rashi/RashiGrid";

export const metadata = {
    title: "राशीभविष्य | नाशिकचा खबरनामा",
    description: "तुमचे आजचे राशीभविष्य जाणून घ्या. मेष ते मीन सर्व १२ राशींचे अचूक भविष्य.",
};

const RashiPage = () => {
    return (
        <main className="min-h-screen bg-[#0f0c29] text-white overflow-hidden relative font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-90 -z-10" />

            {/* Animated Stars (CSS only for now, can be enhanced) */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse -z-10"></div>

            {/* Ambient Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lokmat-red/20 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-16 relative">
                    <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-yellow-300 text-sm font-bold tracking-widest uppercase backdrop-blur-md">
                        ✨ आजचे नक्षत्र भाकीत
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-100 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] font-serif mb-6">
                        राशीभविष्य
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        ग्रह-ताऱ्यांच्या चालीवर आधारित तुमचे आजचे, उद्याचे आणि या आठवड्याचे भविष्य जाणून घ्या.
                        <span className="block mt-2 text-lokmat-red font-semibold">तुमचा दिवस शुभ राहो!</span>
                    </p>
                </div>

                {/* Grid */}
                <RashiGrid />

                {/* Footer Message */}
                <div className="mt-20 text-center">
                    <p className="text-white/40 text-sm max-w-md mx-auto">
                        टीप: वरील राशीभविष्य हे सामान्य ग्रहमानावर आधारित आहे.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default RashiPage;
