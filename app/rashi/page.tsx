import React, { Suspense } from "react";
import { Metadata } from "next";
import RashiListClient from "./RashiListClient";

export const metadata: Metadata = {

    icons: "/logo.png",
    title: "आजचे राशीभविष्य | दैनिक राशिफळ - नाशिकचा खबरनामा",
    description: "तुमचे आजचे राशीभविष्य जाणून घ्या. मेष ते मीन सर्व १२ राशींचे अचूक आणि सविस्तर दैनिक राशिफळ फक्त नाशिकचा खबरनामा वर.",
    alternates: {
        canonical: "https://www.nasikchakhabarnama.com/rashi",
    },
    openGraph: {
        title: "आजचे राशीभविष्य | नाशिकचा खबरनामा",
        description: "तुमचे दैनिक राशिफळ वाचा. मेष, वृषभ, मिथुनसह सर्व १२ राशींचे आजचे भविष्य.",
        url: "https://www.nasikchakhabarnama.com/rashi",
        siteName: "नाशिकचा खबरनामा",
        locale: "mr_IN",
        type: "website",
        images: [
            {
                url: "https://img.freepik.com/premium-psd/circle-golden-zodiac-signs-capricorn_684888-663.jpg?w=740",
                width: 1200,
                height: 630,
                alt: "दैनिक राशीभविष्य",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "आजचे राशीभविष्य | नाशिकचा खबरनामा",
        description: "तुमचे आजचे भविष्य जाणून घेण्यासाठी क्लिक करा.",
        images: ["https://img.freepik.com/premium-psd/circle-golden-zodiac-signs-capricorn_684888-663.jpg?w=740"],
    },
};

export default function RashiPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">

                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xl font-bold font-marathi">राशीभविष्य लोड होत आहे...</p>
                </div>
            </div>
        }>
            <RashiListClient />
        </Suspense>
    );
}