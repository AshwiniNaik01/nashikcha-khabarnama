import { Metadata } from "next";
import { getNewsById, getAllNews } from "@/components/services/newsService";
import { getAdsByCategory } from "@/components/services/adService";
import NewsDetailClient from "./NewsDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}): Promise<Metadata> {
  const { id, slug } = await params;
  const news = await getNewsById(id);

  if (!news) return { title: "बातमी सापडली नाही" };

  const baseUrl = "https://www.nasikchakhabarnama.com";

  let imageUrl = news.thumbnailImage?.cdnUrl || news.image?.cdnUrl || `${baseUrl}/default-share-image.jpg`;
  if (imageUrl.startsWith('http://')) {
    imageUrl = imageUrl.replace('http://', 'https://');
  } else if (imageUrl.startsWith('//')) {
    imageUrl = `https:${imageUrl}`;
  }
  const shareUrl = `${baseUrl}/news/${id}/${slug}`;
  const cleanDescription = news.shortDescription?.replace(/<[^>]*>?/gm, "").slice(0, 160) || news.title;

  const imageExtension = imageUrl.split('.').pop()?.toLowerCase();
  const imageType = imageExtension === 'webp' ? 'image/webp' :
    imageExtension === 'png' ? 'image/png' : 'image/jpeg';

  return {
    icons: "/logo.png",
    title: `${news.title} | नाशिकचा खबरनामा`,
    description: cleanDescription,
    alternates: { canonical: shareUrl },
    openGraph: {

      type: "article",
      title: news.title,
      description: cleanDescription,
      url: shareUrl,
      siteName: "नाशिकचा खबरनामा",
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
          alt: news.title,
          type: imageType,
        },
      ],
      locale: "mr_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: cleanDescription,
      images: [imageUrl],
    },
    other: {
      "twitter:image": imageUrl,
      "og:image:width": "1200",
      "og:image:height": "630",
    }
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id, slug } = await params;

  const news = await getNewsById(id);
  const allNewsItems = await getAllNews();

  if (!news) return <div className="text-center py-20">बातमी सापडली नाही.</div>;


  const adsResponse = await getAdsByCategory(news.category || "all");
  const ads = adsResponse.success ? adsResponse.data : [];

  return (
    <NewsDetailClient
      initialNews={news}
      initialNewsList={allNewsItems.filter((item) => item._id !== id)}
      initialAds={ads}
      id={id}
      slug={slug}
    />
  );
}