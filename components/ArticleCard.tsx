import Link from 'next/link';

type Props = {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
};

const ArticleCard: React.FC<Props> = ({ title, excerpt, image, slug }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 bg-white">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="font-heading font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-600">{excerpt}</p>
        <Link href={`/news/${slug}`} className="text-accent mt-2 inline-block">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
