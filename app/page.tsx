import ArticleCard from "@/components/ArticleCard";


const sampleArticles = [
  { title: 'Breaking Tech News', excerpt: 'Latest technology updates...', image: '/images/logo.svg', slug: 'breaking-tech-news' },
  { title: 'World Politics', excerpt: 'Global news overview...', image: '/images/logo.svg', slug: 'world-politics' },
  { title: 'Sports Highlights', excerpt: 'Latest sports news...', image: '/images/logo.svg', slug: 'sports-highlights' },
  { title: 'Breaking Tech News', excerpt: 'Latest technology updates...', image: '/images/logo.svg', slug: 'breaking-tech-news' },
  { title: 'World Politics', excerpt: 'Global news overview...', image: '/images/logo.svg', slug: 'world-politics' }, { title: 'Breaking Tech News', excerpt: 'Latest technology updates...', image: '/images/logo.svg', slug: 'breaking-tech-news' },
  { title: 'World Politics', excerpt: 'Global news overview...', image: '/images/logo.svg', slug: 'world-politics' },
  { title: 'Sports Highlights', excerpt: 'Latest sports news...', image: '/images/logo.svg', slug: 'sports-highlights' },
  { title: 'Sports Highlights', excerpt: 'Latest sports news...', image: '/images/logo.svg', slug: 'sports-highlights' },

];

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {sampleArticles.map((article, i) => (
        <ArticleCard key={i} {...article} />
      ))}
    </div>
  );
}
