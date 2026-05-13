import { getNewsByTag } from "@/components/services/newsService";
import ArticleCard from "@/components/ArticleCard";
import { Tag } from "lucide-react";
import { getCategoryLabel } from "@/components/constants/categories";

interface TagPageProps {
  params: { tag: string };
}

export async function generateMetadata({ params }: TagPageProps) {
  const decodedTag = decodeURIComponent(params.tag);
  return {
    title: `${decodedTag} | नाशिकचा खबरनामा`,
    description: `${decodedTag} टॅगशी संबंधित सर्व बातम्या`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  //   console.log(await params, "=params");
  const decodedTag = decodeURIComponent(await params.tag);
  const news = await getNewsByTag(decodedTag);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-marathi">
      {/* Header */}
      <div className="flex items-center gap-3 border-b-4 border-red-600 pb-3 mb-8">
        <Tag size={28} className="text-red-600 flex-shrink-0" />
        <h1 className="text-3xl font-black text-gray-900">{decodedTag}</h1>
        <span className="ml-auto text-sm text-gray-500 font-semibold">
          {news.length} बातम्या
        </span>
      </div>

      {/* Results */}
      {news.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((article) => (
            <ArticleCard
              key={article._id}
              id={article._id}
              title={article.title}
              slug={article.slug}
              excerpt={article.shortDescription || article.content || ""}
              image={article.thumbnailImage?.cdnUrl || article.image?.cdnUrl || "/placeholder.png"}
              category={getCategoryLabel(article.category)}
              date={new Date(article.createdAt).toLocaleDateString("mr-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400 space-y-3">
          <Tag size={48} className="opacity-30" />
          <p className="text-xl font-bold">
            या टॅगशी संबंधित बातम्या सापडल्या नाहीत.
          </p>
          <p className="text-sm italic">टॅग: {decodedTag}</p>
        </div>
      )}
    </div>
  );
}
