import React from "react";

export default function Advertisement({ className }: { className?: string }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="py-4">
        <p className="text-center text-xs text-gray-500 mb-1">ADVERTISEMENT</p>
        <div className="w-full h-130 object-cover  bg-gray-200"></div>
      </div>
    </div>
  );
}
