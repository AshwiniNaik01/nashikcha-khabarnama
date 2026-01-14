import Link from "next/link";

type Props = {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  category?: string;
  date?: string;
  featured?: boolean;
};

const ArticleCard: React.FC<Props> = ({ title, excerpt, image, slug, category, date, featured }) => {
  return (
    <div className={`group cursor-pointer overflow-hidden bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition-all duration-500
  ${featured ? 'flex flex-col lg:flex-row lg:h-96' : 'flex flex-col gap-2'}`}
    >
      {/* IMAGE */}
      <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2 h-64 lg:h-full' : 'h-28 aspect-[16/9]'}`}>
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {category && (
          <span className="absolute top-2 left-2 bg-[var(--color-primary)] text-white px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider shadow">
            {category}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className={`p-4 space-y-2 ${featured ? 'lg:w-1/2 flex flex-col justify-between' : ''}`}>
        <h2 className={`text-[16px] ${featured ? 'lg:text-[22px]' : 'text-[14px]'} font-extrabold leading-snug text-gray-900`}>
          <Link href={`/news/${slug}`}>{title}</Link>
        </h2>
        <p className={`text-gray-700 text-sm line-clamp-3 leading-relaxed ${!featured ? 'border-l-2 border-[var(--color-primary)] pl-2' : ''}`}>
          {excerpt}
        </p>
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          {date && <span className="text-[10px] text-gray-500 font-medium">🗓️ {date}</span>}
          <Link href={`/news/${slug}`} className="text-[11px] font-bold uppercase text-[var(--color-primary)] hover:underline tracking-wide">
            पूर्ण वाचा »
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
