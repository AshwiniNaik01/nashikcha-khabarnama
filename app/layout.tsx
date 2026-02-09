// // app/layout.tsx
// import type { Metadata } from "next";
// import { Tiro_Devanagari_Marathi } from "next/font/google";
// import Header from "@/components/Header";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import "./globals.css";
// import BreakingNews from "@/components/home/BreakingNews";
// import Add from "@/components/home/Add";
// /* ----------------------------------------
//    Fonts - Tiro Devanagari Marathi
//    Specifically designed for Marathi language
//    Provides excellent rendering of Maharashtra
//    and all Marathi words
// ----------------------------------------- */
// const tiroDevanagariMarathi = Tiro_Devanagari_Marathi({
//   subsets: ["devanagari"],
//   weight: ["400"],
//   display: "swap",
//   variable: "--font-marathi",
// });
// /* ----------------------------------------
//    Metadata (SEO safe)
// ----------------------------------------- */
// export const metadata: Metadata = {
//   title: {
//     default: "Nashikcha Khabarnama",
//     template: "%s | Nashikcha Khabarnama",
//   },
//   description:
//     "नाशिक व महाराष्ट्रातील ताज्या बातम्या, राजकारण, गुन्हे, क्रीडा, मनोरंजन आणि स्थानिक घडामोडी वाचा – Nashikcha Khabarnama.",
//   icons: {
//     icon: "/favicon.png",
//   },
// };
// /* ----------------------------------------
//    Root Layout
// ----------------------------------------- */
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="mr"
//       className={tiroDevanagariMarathi.variable}
//       suppressHydrationWarning
//     >
//       <body
//         className="min-h-screen flex flex-col bg-white text-gray-900 antialiased selection:bg-lokmat-red/10 selection:text-lokmat-red"
//         suppressHydrationWarning
//       >
//         <Header />
//         <Navbar />

//         <div className="site-layout-wrapper">
//           {/* Left Gutter - Sticky Advertisements (Now active on most laptops) */}
//           <aside className="hidden xl:flex flex-col w-24 p-2 sticky top-0 h-screen border-r border-gray-100/50">
//             <Add className="flex-1 w-full h-full grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-[1.2s]" />
//           </aside>
//           {/*
//               Global Content Container
//               - Optimized for "5-6xl" width
//               - Centered between two advertisement sidebars
//           */}
//           <main className="site-main-content">
//             <div className="parity-container">{children}</div>
//           </main>
//           {/* Right Gutter - Sticky Advertisements (Now active on most laptops) */}
//           <aside className="hidden xl:flex flex-col w-24 p-4 sticky top-0 h-screen border-l border-gray-100/50">
//             <Add className="flex-1 w-full h-full grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-[1.2s]" />
//           </aside>
//         </div>
//         {/* Global Floating Actions (WhatsApp) */}
//         {/* <div className="fixed bottom-8 right-8 z-50">
//           <a
//             href="https://whatsapp.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center"
//             suppressHydrationWarning
//           >
//             <span className="text-xl group-hover:rotate-12 block" aria-hidden="true">:speech_balloon:</span>
//             <span className="absolute right-0 bottom-full mb-3 bg-white text-gray-800 text-[10px] font-black px-3 py-1.5 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100 uppercase tracking-widest pointer-events-none">
//               व्हॉट्सॲपला जॉईन करा
//             </span>
//           </a>
//         </div> */}
//         <Footer />
//       </body>
//     </html>
//   );
// }


// app/layout.tsx
import type { Metadata } from "next";
import { Tiro_Devanagari_Marathi } from "next/font/google";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import BreakingNews from "@/components/home/BreakingNews";
import Add from "@/components/home/Add";

/* ----------------------------------------
   Fonts - Tiro Devanagari Marathi
----------------------------------------- */
const tiroDevanagariMarathi = Tiro_Devanagari_Marathi({
  subsets: ["devanagari"],
  weight: ["400"],
  display: "swap",
  variable: "--font-marathi",
});

/* ----------------------------------------
   Metadata
----------------------------------------- */
export const metadata: Metadata = {
  title: {
    default: "Nashikcha Khabarnama",
    template: "%s | Nashikcha Khabarnama",
  },
  description:
    "नाशिक व महाराष्ट्रातील ताज्या बातम्या, राजकारण, गुन्हे, क्रीडा, मनोरंजन आणि स्थानिक घडामोडी वाचा – Nashikcha Khabarnama.",
  icons: {
    icon: "/favicon.png",
  },
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
      className={tiroDevanagariMarathi.variable}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col bg-white text-gray-900 antialiased selection:bg-lokmat-red/10 selection:text-lokmat-red"
        suppressHydrationWarning
      >
        <Header />
        <Navbar />

        <div className="site-layout-wrapper">
          {/* LEFT GUTTER – STICKY AD */}
          <aside className="hidden xl:flex flex-col w-24 p-2 border-r border-gray-100/50">
            <div className="sticky top-[40px] h-[calc(100vh-160px)]">
              <Add className="w-full h-full grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-[1.2s]" />
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="site-main-content">
            <div className="parity-container">{children}</div>
          </main>

          {/* RIGHT GUTTER – STICKY AD */}
          <aside className="hidden xl:flex flex-col w-24 p-4 border-l border-gray-100/50">
            <div className="sticky top-[40px] h-[calc(100vh-160px)]">
              <Add className="w-full h-full grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-[1.2s]" />
            </div>
          </aside>
        </div>

        <Footer />
      </body>
    </html>
  );
}

