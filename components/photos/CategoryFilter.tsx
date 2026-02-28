
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
                    suppressHydrationWarning
                    className={`relative px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 group ${activeCategory === category
                        ? 'text-white shadow-lg scale-105'
                        : 'text-gray-700  border border-gray-300 hover:border-transparent'
                        }`}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {category}
                        {activeCategory === category && (
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        )}
                    </span>
                    <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${activeCategory === category
                        ? 'from-lokmat-red to-lokmat-maroon opacity-100'
                        : 'from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100'
                        } transition-opacity duration-300`} />
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;