import React from "react";

export default function Advertisement({ className }: { className?: string }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="py-2">
        <p className="text-center text-[10px] font-black tracking-widest text-gray-800 bg-gray-100 px-2 mb-2 uppercase">जाहिरात</p>
        <div className="w-full h-[600px] bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center relative overflow-hidden group border-2 border-gray-500">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-200 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative z-10 text-gray-900 font-bold text-xs rotate-90 whitespace-nowrap">नाशिकचा खबरनामा विशेष</span>
        </div>
      </div>
    </div>
  );
}
