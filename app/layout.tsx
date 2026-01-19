// app/layout.tsx
import type { Metadata } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import BreakingNews from "@/components/home/BreakingNews";
import Advertisement from '@/components/news/Advertisement';

/* ----------------------------------------
   Fonts
----------------------------------------- */
const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-marathi",
});

/* ----------------------------------------
   Metadata (SEO safe)
----------------------------------------- */
export const metadata: Metadata = {
  title: {
    default: "Newsup Clone",
    template: "%s | Newsup Clone",
  },
  description: "Next.js + TypeScript + Tailwind news website",
};

/* ----------------------------------------
   Root Layout
----------------------------------------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mr"
      className={notoSansDevanagari.variable}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col bg-white text-gray-900 antialiased selection:bg-lokmat-red/10 selection:text-lokmat-red"
        suppressHydrationWarning
      >
        <Header />
        <Navbar />
        <BreakingNews
          newsItems={[
            "नाशिकला थंडीचा कडाका वाढला: तापमान ६.२°C",
            "सिंहस्थ कुंभमेळ्यासाठी प्रशासनाची जय्यत तयारी सुरू",
            "बाजार समितीत द्राक्षांची आवक वाढली, भाव स्थिर",
          ]}
        />

        {/* 
            Display Ratio Optimized Layout Wrapper 
            - Center column for the main content
            - Fluid max-width based on common laptop display ratios
        */}
        <div className="flex-1 relative flex justify-center w-full overflow-x-hidden">
          {/* Left Advertisement Column - Sticky & Display-Ratio Aware */}
          <aside className="hidden xl:flex flex-col w-40 p-4 sticky top-0 h-screen border-r border-gray-50">
            <Advertisement className="flex-1 w-full h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
          </aside>

          {/* Main Content Area - Capped at 1280px (xl) to maintain consistent ratio */}
          <main className="flex-1 w-full max-w-7xl xl:max-w-6xl px-4 py-6 md:px-8 lg:px-12 transition-all duration-300">
            {children}
          </main>

          {/* Right Advertisement Column - Sticky & Display-Ratio Aware */}
          <aside className="hidden xl:flex flex-col w-40 p-4 sticky top-0 h-screen border-l border-gray-50">
            <Advertisement className="flex-1 w-full h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
          </aside>
        </div>

        <Footer />
      </body>
    </html>
  );
}
