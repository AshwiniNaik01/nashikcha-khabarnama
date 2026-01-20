
import RashiBhavishyaCard from "@/components/horoscope/RashiBhavishyaCard";
import React from "react";
// import RashiBhavishyaCard from "../components/RashiBhavishyaCard";

const horoscopeData = [
    {
        rashi: "Aries",
        dateRange: "Mar 21 - Apr 19",
        prediction:
            "Today is a great day to focus on your personal growth. Opportunities may arise unexpectedly.",
        color: "bg-red-500",
    },
    {
        rashi: "Taurus",
        dateRange: "Apr 20 - May 20",
        prediction:
            "Patience will bring rewards today. Avoid rushing decisions and stay grounded.",
        color: "bg-green-500",
    },
    {
        rashi: "Gemini",
        dateRange: "May 21 - Jun 20",
        prediction:
            "Your creativity shines. Connect with friends for inspiration and fun.",
        color: "bg-yellow-500",
    },
    {
        rashi: "Cancer",
        dateRange: "Jun 21 - Jul 22",
        prediction:
            "Emotional balance is key. Take time to nurture yourself and loved ones.",
        color: "bg-blue-500",
    },
    // Add more rashis here...
];

const RashiBhavishyaPage: React.FC = () => {
    return (
        <div className="min-h-screen py-16 px-4 md:px-16">
            <h1 className="text-5xl font-heading text-center text-primary mb-12">
                Rashibhavishya 🔮
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {horoscopeData.map((item, index) => (
                    <RashiBhavishyaCard
                        key={index}
                        rashi={item.rashi}
                        dateRange={item.dateRange}
                        prediction={item.prediction}
                        color={item.color}
                    />
                ))}
            </div>
        </div>
    );
};

export default RashiBhavishyaPage;
