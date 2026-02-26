import { Metadata } from "next";
import { getCategoryLabel } from "@/components/constants/categories";
import CategoryPageWrapper from "./CategoryPageWrapper";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryKey = resolvedParams.category;
  const label = getCategoryLabel(categoryKey);

  return {
    title: `${label} न्युज | नाशिकचा खबरनामा`,
    description: `नाशिक आणि परिसरातील ${label} विषयावरील ताज्या बातम्या आणि अपडेट्स वाचा.`,
    openGraph: {
      title: `${label} न्युज | नाशिकचा खबरनामा`,
      description: `नाशिक आणि परिसरातील ${label} विषयावरील ताज्या बातम्या आणि अपडेट्स वाचा.`,
      url: `https://www.nasikchakhabarnama.com/category/${categoryKey}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  return <CategoryPageWrapper params={params} />;
}
