import Link from "next/link";

type BreakingNewsItem = {
    title: string;
    slug: string;
    category: string;
};

export default function BreakingNews({ news }: { news: BreakingNewsItem[] }) {
    if (!news.length) return null;

    return (
        <div className="bg-red-50 border-y border-red-100 overflow-hidden py-1 flex items-center">
            {/* Label */}
            <div className="bg-[var(--color-primary)] text-white text-[10px] font-bold px-3 py-1 flex-shrink-0 uppercase italic tracking-tighter">
                ब्रेकिंग न्युज
            </div>

            {/* Ticker */}
            <div className="flex-1 whitespace-nowrap overflow-hidden relative">
                <div className="animate-marquee inline-flex gap-10 pl-6 text-sm font-semibold text-black">
                    {news.map((item, index) => (
                        <Link
                            key={index}
                            href={`/news/${item.slug}`}
                            className="hover:underline flex gap-2"
                        >
                            <span className="text-red-600 font-bold">
                                [{item.category}]
                            </span>
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
