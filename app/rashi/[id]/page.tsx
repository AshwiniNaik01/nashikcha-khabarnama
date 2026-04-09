import { Metadata } from "next";
import { getRashiById } from "@/components/services/rashiService";
import RashiDetailClient from "./RashiDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const response = await getRashiById(id);


  if (!response.success || !response.data) {
    return {
      title: "राशीभविष्य उपलब्ध नाही | नाशिकचा खबरनामा",
      description: "निवडलेल्या राशीची माहिती सध्या उपलब्ध नाही."
    };
  }

  const apiData = response.data;
  const baseUrl = "https://www.nasikchakhabarnama.com";
  const shareUrl = `${baseUrl}/rashi/${id}`;


  const cleanDescription = apiData.description
    ?.replace(/<[^>]*>?/gm, "")
    .replace(/&nbsp;/g, " ")
    .slice(0, 160) || `${apiData.rashi} राशी भविष्य`;


  const metaImage = "https://img.freepik.com/premium-psd/circle-golden-zodiac-signs-capricorn_684888-663.jpg?w=740";

  return {
    icons: "/logo.png",
    title: `${apiData.rashi} राशी भविष्य | नाशिकचा खबरनामा`,
    description: cleanDescription,
    alternates: { canonical: shareUrl },
    openGraph: {
      type: "article",
      title: `${apiData.rashi} राशी भविष्य - आजचे राशिफळ`,
      description: cleanDescription,
      url: shareUrl,
      siteName: "नाशिकचा खबरनामा",
      locale: "mr_IN",
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: `${apiData.rashi} राशी भविष्य`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${apiData.rashi} राशी भविष्य`,
      description: cleanDescription,
      images: [metaImage],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;


  const response = await getRashiById(id);


  if (!response.success || !response.data) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-6 bg-slate-50">
        <div className="text-8xl mb-6 animate-pulse">🔮</div>
        <h1 className="text-3xl font-black text-gray-900 mb-4 font-marathi">माहिती उपलब्ध नाही</h1>
        <p className="text-gray-600 mb-8 font-marathi">क्षस्व, आम्ही शोधत असलेली माहिती आम्हाला सापडली नाही.</p>
        <a href="/rashi" className="px-10 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 font-marathi">
          सर्व राशी पहा
        </a>
      </div>
    );
  }


  return <RashiDetailClient apiData={response.data} id={id} />;
}