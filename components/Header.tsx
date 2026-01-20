"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Navbar from "./Navbar";
import Advertisement from "./news/Advertisement";

export default function Header() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full font-marathi relative z-[60]">
      {/* 1. TOP BAR - NEW Lokmat RED STYLE */}
      <div className="bg-gradient-to-r from-lokmat-red to-lokmat-maroon text-white z-50 text-[9px] xs:text-[10px] sm:text-xs md:text-sm">
        <div className="parity-container flex justify-between items-center py-2 sm:py-3 font-bold">
          {/* Left: Language + Time */}
          <div className="flex gap-2 xs:gap-3 sm:gap-4 items-center font-bold whitespace-nowrap overflow-hidden">
            <span className="cursor-pointer hover:underline text-white text-[9px] xs:text-[10px] sm:text-xs">
              मराठी
            </span>
            {time && (
              <span className="hidden xs:inline-block border-l border-white/20 pl-2 xs:pl-3 text-[8px] xs:text-[9px] sm:text-[10px]">
                {time.toLocaleTimeString()}
              </span>
            )}
            {time && (
              <span className="hidden sm:inline-block border-l border-white/20 pl-2 xs:pl-3 sm:pl-4 uppercase text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs">
                {time.toDateString()}
              </span>
            )}
          </div>

          {/* Right: Social Icons */}
          <div className="flex gap-2 xs:gap-3 items-center flex-shrink-0">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-4 xs:w-5 h-4 xs:h-5 rounded-sm bg-white text-lokmat-red hover:bg-gray-100 transition-all hover:scale-110 shadow-sm"
            >
              <FaFacebookF className="text-[8px] xs:text-[10px]" />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-4 xs:w-5 h-4 xs:h-5 rounded-sm bg-white text-[#0077B5] hover:bg-gray-100 transition-all hover:scale-110 shadow-sm"
            >
              <FaLinkedinIn className="text-[8px] xs:text-[10px]" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER - CLEAN WHITE STYLE */}
      {/* 2. MAIN HEADER - CLEAN WHITE STYLE */}
      <div className="relative bg-red-50 border-b border-gray-100 py-2 xs:py-3 sm:py-3">
        <div className="parity-container flex flex-col md:flex-row items-center justify-center gap-2 xs:gap-3 sm:gap-4">
          {/* Left Spacer for Desktop */}
          <div className="w-[100px] xs:w-[110px] md:w-[120px] hidden lg:block opacity-0">
            spacer
          </div>

          {/* Center: Advertisement on large screens, logo on all screens */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Logo Section */}
            <div className="mb-1 lg:mb-2">{/* Add your logo/title here */}</div>

            {/* Advertisement: centered on large screens */}
            <div className="w-full max-w-xs lg:max-w-xl">
              <Advertisement className="w-full" />
            </div>
          </div>

          {/* Right Spacer for Desktop */}
          <div className="w-[100px] xs:w-[110px] md:w-[120px] hidden lg:block opacity-0">
            spacer
          </div>
        </div>
      </div>
    </div>
  );
}
