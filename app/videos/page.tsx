import { Metadata } from "next";
import VideosClient from "./VideosClient";

export const metadata: Metadata = {
  title: "व्हिडीओ | नाशिकचा खबरनामा",
  description: "नाशिकच्या ताज्या घडामोडी, विशेष मुलाखती आणि महत्त्वाच्या बातम्यांचे व्हिडीओ पहा.",
  openGraph: {
    title: "व्हिडीओ | नाशिकचा खबरनामा",
    description: "नाशिकच्या ताज्या घडामोडींचे व्हिडीओ पहा.",
    url: "https://www.nasikchakhabarnama.com/videos",
    type: "website",
  },
};

export default function VideosPage() {
  return <VideosClient />;
}
