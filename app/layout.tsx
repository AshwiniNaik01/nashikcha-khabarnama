

// import { Metadata } from "next";
// import { Tiro_Devanagari_Marathi } from "next/font/google";
// import Header from "@/components/Header";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import LayoutClientWrapper from "../app/LayoutClientWrapper"; // नवीन फाईल
// import "./globals.css";

// const tiroDevanagariMarathi = Tiro_Devanagari_Marathi({
//   subsets: ["devanagari"],
//   weight: ["400"],
//   display: "swap",
//   variable: "--font-marathi",
// });


// export const metadata: Metadata = {
//   title: {
//     default: "नाशिकचा खबरनामा | मुख्य बातम्या | नाशिकच्या ताज्या घडामोडी",
//     template: "%s | नाशिकचा खबरनामा",
//   },
//   description:
//     "नाशिक शहर आणि जिल्ह्यातील ताज्या बातम्या, शेती, राजकारण आणि क्राईम अपडेट्स वाचा.",
//   metadataBase: new URL("https://nashikchakhabarnama.com"),
//   alternates: {
//     canonical: "/",
//   },
//   openGraph: {
//     type: "website",
//     locale: "mr_IN",
//     url: "https://nashikchakhabarnama.com",
//     siteName: "नाशिकचा खबरनामा",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
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

//         <LayoutClientWrapper>{children}</LayoutClientWrapper>
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
import LayoutClientWrapper from "../app/LayoutClientWrapper";
import "./globals.css";


import Script from "next/script";

const tiroDevanagariMarathi = Tiro_Devanagari_Marathi({
  subsets: ["devanagari"],
  weight: ["400"],
  display: "swap",
  variable: "--font-marathi",
});

export const metadata: Metadata = {
  title: {
    default: "नाशिकचा खबरनामा | मुख्य बातम्या | नाशिकच्या ताज्या घडामोडी",
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
      <head>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-48FNN5BNR0"
          strategy="afterInteractive"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9453516324966322"
          crossOrigin="anonymous"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-48FNN5BNR0');
          `}
        </Script>
      </head>
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