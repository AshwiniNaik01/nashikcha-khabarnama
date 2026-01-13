import ArticleCard from "@/components/ArticleCard";

interface Props {
  params: { category: string };
}

export default function CategoryPage({ params }: Props) {
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
    { title: 'Sample Article 2', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-2' },{ title: 'Sample Article 1', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-1' },
    { title: 'Sample Article 2', excerpt: 'Excerpt text', image: '/images/logo.svg', slug: 'sample-article-2' },
  ];

  return (
    <div>
      {/* <h1 className="text-3xl font-heading font-bold mb-4 capitalize">{params.category}</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleArticles.map((article, i) => (
          <ArticleCard key={i} {...article} />
        ))}
      </div>
    </div>
  );
}

