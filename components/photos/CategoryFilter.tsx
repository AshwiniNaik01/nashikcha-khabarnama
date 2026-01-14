// // components/photos/CategoryFilter.tsx
// "use client";

// import React from 'react';

// interface CategoryFilterProps {
//     categories: string[];
//     activeCategory: string;
//     onSelect: (category: string) => void;
// }

// const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, onSelect }) => {
//     return (
//         <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
//             {categories.map((category) => (
//                 <button
//                     key={category}
//                     onClick={() => onSelect(category)}
//                     className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeCategory === category
//                             ? 'bg-lokmat-red text-white shadow-md scale-105'
//                             : 'bg-white text-gray-600 border border-gray-200 hover:border-lokmat-red hover:text-lokmat-red'
//                         }`}
//                 >
//                     {category}
//                 </button>
//             ))}
//         </div>
//     );
// };

// export default CategoryFilter;



// components/photos/CategoryFilter.tsx
"use client";

import React from 'react';

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, onSelect }) => {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={`relative px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 group ${activeCategory === category
                        ? 'text-white shadow-lg scale-105'
                        : 'text-gray-700 hover:text-white border border-gray-300 hover:border-transparent'
                        }`}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {category}
                        {activeCategory === category && (
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        )}
                    </span>
                    <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${activeCategory === category
                        ? 'from-[#ed1b24] to-[#800000] opacity-100'
                        : 'from-gray-800 to-gray-600 opacity-0 group-hover:opacity-100'
                        } transition-opacity duration-300`} />
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;