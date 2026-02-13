// "use client";

// import React, { useEffect, useState } from "react";
// import { Tiro_Devanagari_Marathi } from "next/font/google";
// import Header from "@/components/Header";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import "./globals.css";
// import AdDisplay from "@/components/advertisement/AdDisplay";
// import {
//   getAdsByCategory,
//   Advertisement as AdType,
// } from "@/components/services/adService";

// const tiroDevanagariMarathi = Tiro_Devanagari_Marathi({
//   subsets: ["devanagari"],
//   weight: ["400"],
//   display: "swap",
//   variable: "--font-marathi",
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [globalAds, setGlobalAds] = useState<AdType[]>([]);

//   useEffect(() => {
//     const fetchGlobalAds = async () => {
//       try {
//         const res = await getAdsByCategory("all");
//         if (res.success) {
//           setGlobalAds(res.data);
//         }
//       } catch (err) {
//         console.error("Layout Ads Fetch Error:", err);
//       }
//     };
//     fetchGlobalAds();
//   }, []);

//   return (
//     <html
//       lang="mr"
//       className={tiroDevanagariMarathi.variable}
//       suppressHydrationWarning
//     >
//       <body
//         className="min-h-screen flex flex-col bg-white text-gray-900 antialiased"
//         suppressHydrationWarning
//       >
//         <Header />
//         <Navbar />
//         <div className="site-layout-wrapper flex justify-center min-h-screen bg-white">
//           <aside className="hidden xl:flex flex-col w-[120px] p-2 border-r border-gray-100/50">
//             <div className="sticky top-[100px] h-[calc(100vh-120px)]">
//               <AdDisplay
//                 ads={globalAds}
//                 position="sticky-left"
//                 className="w-full h-full"
//               />
//             </div>
//           </aside>

//           <main className="site-main-content flex-1 max-w-6xl">
//             <div className="parity-container">{children}</div>
//           </main>

//           <aside className="hidden xl:flex flex-col w-[120px] p-2 border-l border-gray-100/50">
//             <div className="sticky top-[100px] h-[calc(100vh-120px)]">
//               <AdDisplay
//                 ads={globalAds}
//                 position="sticky-right"
//                 className="w-full h-full"
//               />
//             </div>
//           </aside>
//         </div>

//         <Footer />
//       </body>
//     </html>
//   );
// }

import { Metadata } from "next";
import { Tiro_Devanagari_Marathi } from "next/font/google";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LayoutClientWrapper from "../app/LayoutClientWrapper"; // नवीन फाईल
import "./globals.css";

const tiroDevanagariMarathi = Tiro_Devanagari_Marathi({
  subsets: ["devanagari"],
  weight: ["400"],
  display: "swap",
  variable: "--font-marathi",
});


export const metadata: Metadata = {
  title: {
    default: "नाशिकचा खबरनामा | नाशिकच्या ताज्या घडामोडी",
    template: "%s | नाशिकचा खबरनामा",
  },
  description:
    "नाशिक शहर आणि जिल्ह्यातील ताज्या बातम्या, शेती, राजकारण आणि क्राईम अपडेट्स वाचा.",
  metadataBase: new URL("https://nashikchakhabarnama.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "mr_IN",
    url: "https://nashikchakhabarnama.com",
    siteName: "नाशिकचा खबरनामा",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="mr"
      className={tiroDevanagariMarathi.variable}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col bg-white text-gray-900 antialiased"
        suppressHydrationWarning
      >
        <Header />
        <Navbar />

        <LayoutClientWrapper>{children}</LayoutClientWrapper>
        <Footer />
      </body>
    </html>
  );
}
