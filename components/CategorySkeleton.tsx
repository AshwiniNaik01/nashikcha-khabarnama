import React from 'react';
import Skeleton from './Skeleton';

const CategorySkeleton = () => {
    return (
        <div className="space-y-8">
            {/* Category Header Skeleton */}
            <div className="border-b-4 border-gray-200 pb-2 mb-8">
                <Skeleton className="w-1/3 h-10" />
            </div>

            {/* Article Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="aspect-[16/9] w-full" />
                        <div className="space-y-2">
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-5/6 h-4" />
                            <Skeleton className="w-1/2 h-4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySkeleton;
