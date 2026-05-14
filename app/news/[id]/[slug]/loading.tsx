export default function Loading() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 font-medium font-marathi text-lg">बातमी लोड होत आहे...</p>
        </div>
    );
}
