import React, { Suspense } from "react";
import { Metadata } from "next";
import RashiListClient from "./RashiListClient";

export const metadata: Metadata = {
    title: "राशीभविष्य | नाशिकचा खबरनामा",
    description: "तुमचे आजचे राशीभविष्य जाणून घ्या. मेष ते मीन सर्व १२ राशींचे अचूक भविष्य.",
    openGraph: {
        title: "राशीभविष्य | नाशिकचा खबरनामा",
        description: "तुमचे आजचे राशीभविष्य जाणून घ्या. मेष ते मीन सर्व १२ राशींचे अचूक भविष्य.",
        url: "https://nashikchakhabarnama.com/rashi",
        siteName: "नाशिकचा खबरनामा",
        locale: "mr_IN",
        type: "website",
    },
};

export default function RashiPage() {
    return (
        <Suspense fallback={<div className="text-center py-20">लोड होत आहे...</div>}>
            <RashiListClient />
        </Suspense>
    );
}
