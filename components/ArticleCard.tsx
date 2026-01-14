import Link from 'next/link';

type Props = {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  category?: string;
  date?: string;
};

const ArticleCard: React.FC<Props> = ({ title, excerpt, image, slug, category, date }) => {
  return (
    <div className="group flex flex-col gap-3 group cursor-pointer border-b border-gray-100 pb-4 last:border-0 transition-all">
      <div className="relative overflow-hidden aspect-[16/9] rounded-sm">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {category && (
          <span className="absolute top-2 left-2 bg-lokmat-red text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-wider shadow-sm">
            {category}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <h2 className="font-bold text-lg leading-snug group-hover:text-lokmat-red transition-colors">
          <Link href={`/news/${slug}`}>{title}</Link>
        </h2>
        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{excerpt}</p>
        <div className="flex justify-between items-center pt-2">
          {date && <span className="text-[10px] text-gray-400 font-semibold">{date}</span>}
          <Link href={`/news/${slug}`} className="text-[10px] font-black text-black uppercase hover:text-lokmat-red hover:underline transition-colors">
            वाचा »
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
