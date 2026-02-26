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
    return { title: "माहिती उपलब्ध नाही | नाशिकचा खबरनामा" };
  }

  const apiData = response.data;
  const baseUrl = "https://www.nasikchakhabarnama.com";
  const shareUrl = `${baseUrl}/rashi/${id}`;
  const cleanDescription = apiData.description?.replace(/<[^>]*>?/gm, "").slice(0, 160) || `${apiData.rashi} राशी भविष्य`;

  return {
    title: `${apiData.rashi} राशी भविष्य | नाशिकचा खबरनामा`,
    description: cleanDescription,
    alternates: { canonical: shareUrl },
    openGraph: {
      type: "article",
      title: `${apiData.rashi} राशी भविष्य`,
      description: cleanDescription,
      url: shareUrl,
      siteName: "नाशिकचा खबरनामा",
      locale: "mr_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${apiData.rashi} राशी भविष्य`,
      description: cleanDescription,
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const response = await getRashiById(id);

  if (!response.success || !response.data) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="text-8xl mb-6 animate-bounce">🔮</div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">माहिती उपलब्ध नाही</h1>
        <a href="/rashi" className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-red-600 transition-all">
          सर्व राशी पहा
        </a>
      </div>
    );
  }

  return <RashiDetailClient apiData={response.data} id={id} />;
}
