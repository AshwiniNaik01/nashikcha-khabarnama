import React from 'react';
import Skeleton from './Skeleton';

const NewsDetailSkeleton = () => {
    return (
        <div className="bg-white p-6 rounded shadow space-y-6">
            <Skeleton className="w-3/4 h-10" />
            <div className="space-y-4">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-2/3 h-4" />
            </div>
            <Skeleton className="aspect-video w-full rounded" />
            <div className="space-y-4 pt-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="w-full h-4" />
                ))}
            </div>
        </div>
    );
};

export default NewsDetailSkeleton;
