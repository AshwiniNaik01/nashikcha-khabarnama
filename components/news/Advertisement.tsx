import React from "react";

export default function Advertisement({ className }: { className?: string }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="py-4">
        <p className="text-center text-xs text-gray-500 mb-1">ADVERTISEMENT</p>
        <img
          src="https://dummyimage.com/300x250/0aa/fff&text=Advertisement"
          className="w-full h-50 object-cover"
        />
      </div>
    </div>
  );
}
