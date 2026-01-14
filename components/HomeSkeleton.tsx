import React from 'react';
import Skeleton from './Skeleton';

const SliderSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="w-32 h-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-[4/3] w-full" />
            ))}
        </div>
    </div>
);

const HomeSkeleton = () => {
    return (
        <div className="space-y-12 animate-pulse pt-4 pb-12">
            {/* 1. BREAKING NEWS TICKER SKELETON */}
            <div className="bg-red-50 border-y border-red-100 py-2 flex items-center shadow-sm">
                <Skeleton className="w-24 h-5 mr-4 ml-4" />
                <Skeleton className="flex-1 h-3 mr-4" />
            </div>

            {/* TOP SECTION: Grid with Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: Hero & Category Block Skeletons */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Hero Grid Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="w-1/3 h-6 border-l-4 border-gray-200 pl-3" />
                        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <div className="lg:col-span-2 relative aspect-[16/10]">
                                <Skeleton className="w-full h-full rounded-sm" />
                            </div>
                            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex flex-col gap-3">
                                        <Skeleton className="aspect-[16/9] w-full rounded-sm" />
                                        <Skeleton className="w-full h-4" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Category Block Skeleton */}
                    <div className="border-t-2 border-gray-100 pt-6">
                        <div className="flex justify-between items-end mb-8">
                            <Skeleton className="w-48 h-7 border-l-4 border-gray-200 pl-4" />
                            <Skeleton className="w-24 h-4" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="space-y-3">
                                    <Skeleton className="aspect-[16/9] w-full rounded-sm" />
                                    <Skeleton className="w-full h-5" />
                                    <Skeleton className="w-3/4 h-3" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Sidebar Skeletons */}
                <aside className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-sm space-y-4">
                        <Skeleton className="w-1/2 h-6" />
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-12 w-full rounded-md" />
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-sm space-y-4">
                        <Skeleton className="w-1/2 h-6" />
                        <Skeleton className="h-32 w-full rounded-md" />
                    </div>
                    <div className="bg-white p-5 border-t-2 border-gray-100 shadow-sm rounded-sm space-y-5">
                        <Skeleton className="w-1/3 h-5" />
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex gap-4">
                                <Skeleton className="w-10 h-10 flex-shrink-0" />
                                <Skeleton className="w-full h-8" />
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            {/* BOTTOM SECTION: Full Width Sliders Skeletons */}
            <div className="space-y-12 w-full">
                <SliderSkeleton />
                <SliderSkeleton />
                <SliderSkeleton />
                <SliderSkeleton />
            </div>
        </div>
    );
};

export default HomeSkeleton;
