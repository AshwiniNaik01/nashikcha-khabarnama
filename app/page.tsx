import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "नाशिकचा खबरनामा | मुख्य बातम्या | नाशिकच्या ताज्या घडामोडी",
  description: "नाशिक शहर आणि जिल्ह्यातील ताज्या बातम्या, शेती, राजकारण आणि क्राईम अपडेट्स वाचा. ताज्या घडामोडींसाठी नाशिकचा खबरनामा फॉलो करा.",
  icons: "/logo.png",
  openGraph: {
    title: "नाशिकचा खबरनामा | मुख्य बातम्या",
    description: "नाशिक शहर आणि जिल्ह्यातील ताज्या बातम्या, शेती, राजकारण आणि क्राईम अपडेट्स वाचा.",
    url: "https://www.nasikchakhabarnama.com",
    siteName: "नाशिकचा खबरनामा",
    locale: "mr_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "नाशिकचा खबरनामा | मुख्य बातम्या",
    description: "नाशिक शहर आणि जिल्ह्यातील ताज्या बातम्या, शेती, राजकारण आणि क्राईम अपडेट्स वाचा.",
    images: ["/logo.png"],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
