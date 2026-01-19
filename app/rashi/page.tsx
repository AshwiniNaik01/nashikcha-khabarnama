import React from "react";
import RashiGrid from "@/components/rashi/RashiGrid";

export const metadata = {
    title: "राशीभविष्य | नाशिकचा खबरनामा",
    description: "तुमचे आजचे राशीभविष्य जाणून घ्या. मेष ते मीन सर्व १२ राशींचे अचूक भविष्य.",
};
const RashiPage = () => {
    return (
        <div className="text-gray-900 relative">
            {/* Zodiac Background Image */}
            <div
                className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[0.05] -z-1"
                style={{
                    backgroundImage:
                        "url('https://img.freepik.com/premium-psd/circle-golden-zodiac-signs-capricorn_684888-663.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80')",
                    backgroundAttachment: 'fixed',
                }}
            />

            <div className="py-2 md:py-6 relative z-10">

                {/* Hero Section */}
                <div className="text-center mb-6 relative">
                    {/* <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-700 text-sm font-bold tracking-widest uppercase">
                        ✨ आजचे नक्षत्र भाकीत
                    </div> */}

                    <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter leading-none">

                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500">
                            राशी
                        </span>

                        <span className="text-[#E1261C]">
                            भविष्य
                        </span>
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
        </div>
    );
};



export default RashiPage;
