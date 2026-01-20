import Skeleton from '@/components/Skeleton';

export default function Loading() {
    return (
        <div className="bg-white p-6 rounded shadow space-y-6">
            <Skeleton className="w-1/4 h-8" />
            <div className="space-y-4">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4" />
            </div>
        </div>
    );
}
