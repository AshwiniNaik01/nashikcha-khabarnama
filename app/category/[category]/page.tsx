import ArticleCard from "@/components/ArticleCard";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const sampleArticles = [
    { title: 'Sample Article 1', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-1' },
    { title: 'Sample Article 2', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-2' },
    { title: 'Sample Article 1', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-1' },
    { title: 'Sample Article 2', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-2' },
    { title: 'Sample Article 1', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-1' },
    { title: 'Sample Article 2', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-2' },
    { title: 'Sample Article 1', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-1' },
    { title: 'Sample Article 2', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-2' },
    { title: 'Sample Article 1', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-1' },
    { title: 'Sample Article 2', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-2' },
    { title: 'Sample Article 1', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-1' },
    { title: 'Sample Article 2', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-2' }, { title: 'Sample Article 1', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-1' },
    { title: 'Sample Article 2', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-2' },
  ];

  const resolvedParams = await params;
  const categoryName = resolvedParams.category.charAt(0).toUpperCase() + resolvedParams.category.slice(1);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Category Header */}
      <div className="border-b-4 border-[var(--color-primary)] pb-2 mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900">
          {categoryName} <span className="text-[var(--color-primary)]">न्युज</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleArticles.map((article, i) => (
          <ArticleCard key={i} {...article} />
        ))}
      </div>
    </div>
  );
}

