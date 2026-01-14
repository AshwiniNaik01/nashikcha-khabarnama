import React from 'react';

interface LayoutWrapperProps {
    children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-marathi">
            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6">
                {children}
            </main>

            {/* Floating WhatsApp Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group">
                    <span className="text-xl group-hover:rotate-12 block">💬</span>
                    <span className="sr-only">WhatsApp Channel</span>
                    <div className="absolute right-0 bottom-full mb-3 bg-white text-gray-800 text-[10px] font-black px-3 py-1.5 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100 uppercase tracking-widest pointer-events-none">
                        व्हॉट्सॲपला जॉईन करा
                    </div>
                </button>
            </div>
        </div>
    );
};

export default LayoutWrapper;
