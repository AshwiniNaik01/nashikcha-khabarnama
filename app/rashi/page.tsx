import React from "react";
import RashiGrid from "@/components/rashi/RashiGrid";

export const metadata = {
    title: "राशीभविष्य | नाशिकचा खबरनामा",
    description: "तुमचे आजचे राशीभविष्य जाणून घ्या. मेष ते मीन सर्व १२ राशींचे अचूक भविष्य.",
};
const RashiPage = () => {
    return (
        <main className="min-h-screen text-gray-900 overflow-hidden relative font-sans bg-[#faf9f6]">

            {/* Zodiac Background Image */}
            <div
                className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[0.1] z-5"
                style={{
                    backgroundImage:
                        "url('https://img.freepik.com/premium-psd/circle-golden-zodiac-signs-capricorn_684888-663.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80')",
                }}
            />

            {/* Soft Gradient Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fffaf0] to-[#f7f4ef] -z-10" /> */}

            {/* Ambient Golden Glows */}
            {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-300/20 rounded-full blur-[140px] -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-300/20 rounded-full blur-[140px] -z-10" /> */}

            <div className="container mx-auto px-4 py-2 md:py-6 relative z-10">

                {/* Hero Section */}
                <div className="text-center mb-6 relative">
                    {/* <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-700 text-sm font-bold tracking-widest uppercase">
                        ✨ आजचे नक्षत्र भाकीत
                    </div> */}

                    <h1 className="text-2xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500  mb-2">
                        राशीभविष्य
                    </h1>

                    <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
                        ग्रह-ताऱ्यांच्या चालीवर आधारित तुमचे आजचे, उद्याचे आणि या आठवड्याचे भविष्य जाणून घ्या.
                        <span className="block mt-2 text-lokmat-red font-semibold">
                            तुमचा दिवस शुभ राहो!
                        </span>
                    </p>
                </div>

                {/* Grid */}
                <RashiGrid />

                {/* Footer Message */}
                <div className="mt-20 text-center">
                    <p className="text-gray-500 text-sm max-w-md mx-auto">
                        टीप: वरील राशीभविष्य हे सामान्य ग्रहमानावर आधारित आहे.
                    </p>
                </div>
            </div>
        </main>
    );
};



export default RashiPage;
