import ArticleCard from "@/components/ArticleCard";

interface Props {
    params: Promise<{ slug: string[] }>;
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;

    // Sample articles for demonstration
    const sampleArticles = [
        { title: 'Sample Article 1', excerpt: 'Excerpt text', image: '/next.svg', slug: 'sample-article-1' },
        { title: 'Sample Article 2', excerpt: 'Excerpt text', image: '/next.svg', slug: 'sample-article-2' },
        { title: 'Sample Article 3', excerpt: 'Excerpt text', image: '/next.svg', slug: 'sample-article-3' },
        { title: 'Sample Article 4', excerpt: 'Excerpt text', image: '/next.svg', slug: 'sample-article-4' },
        { title: 'Sample Article 5', excerpt: 'Excerpt text', image: '/next.svg', slug: 'sample-article-5' },
        { title: 'Sample Article 6', excerpt: 'Excerpt text', image: '/next.svg', slug: 'sample-article-6' },
    ];

    const categoryName = slug.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' > ');

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
