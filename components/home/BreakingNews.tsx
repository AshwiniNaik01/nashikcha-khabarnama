import React from 'react';

interface BreakingNewsProps {
    newsItems?: string[];
}

const BreakingNews: React.FC<BreakingNewsProps> = ({ newsItems = [] }) => {
    if (!newsItems || newsItems.length === 0) return null;

    return (
        <div className="bg-red-50 border-y border-red-100 overflow-hidden py-2 flex items-center shadow-sm mx-6">
            <div className="bg-lokmat-red text-white text-sm font-black px-4 py-1 flex-shrink-0 uppercase italic tracking-tighter shadow-md z-10">
                ब्रेकिंग न्युज
            </div>
            <div className="flex-1 whitespace-nowrap overflow-hidden relative">
                <div className="animate-marquee inline-block pl-8 text-sm font-bold text-gray-900">
                    {newsItems.map((item, i) => (
                        <span key={i} className="flex-inline items-center">
                            <span className="mx-4 text-lokmat-red">●</span>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BreakingNews;
