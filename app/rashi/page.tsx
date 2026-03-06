import React, { Suspense } from "react";
import { Metadata } from "next";
import RashiListClient from "./RashiListClient";

export const metadata: Metadata = {
    icons: "./logo.png",
    title: "राशीभविष्य | नाशिकचा खबरनामा",
    description: "तुमचे राशीभविष्य जाणून घ्या. मेष ते मीन सर्व १२ राशींचे अचूक भविष्य.",
    openGraph: {
        title: "राशीभविष्य | नाशिकचा खबरनामा",
        description: "तुमचे राशीभविष्य जाणून घ्या. मेष ते मीन सर्व १२ राशींचे अचूक भविष्य.",
        url: "https://www.nasikchakhabarnama.com/rashi",
        siteName: "नाशिकचा खबरनामा",
        locale: "mr_IN",
        type: "website",
        images: [
            {
                url: "https://img.freepik.com/premium-psd/circle-golden-zodiac-signs-capricorn_684888-663.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80",
                width: 1200,
                height: 630,
                alt: "राशीभविष्य",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "राशीभविष्य | नाशिकचा खबरनामा",
        description: "तुमचे राशीभविष्य जाणून घ्या. मेष ते मीन सर्व १२ राशींचे अचूक भविष्य.",
        images: ["https://img.freepik.com/premium-psd/circle-golden-zodiac-signs-capricorn_684888-663.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80"],
    },
};

export default function RashiPage() {
    return (
        <Suspense fallback={<div className="text-center py-20">लोड होत आहे...</div>}>
            <RashiListClient />
        </Suspense>
    );
}
