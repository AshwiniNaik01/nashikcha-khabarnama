"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Navbar from "./Navbar";

export default function Header() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full font-marathi">
      {/* 1. TOP BAR - NEW Lokmat RED STYLE */}
      <div className="bg-gradient-to-r from-lokmat-red to-lokmat-maroon text-white text-[10px] sm:text-xs">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          {/* Left: Language + Time */}
          <div className="flex gap-4 items-center font-bold">
            <span className="cursor-pointer hover:underline text-white">
              मराठी
            </span>
            {time && <span className="hidden sm:inline-block border-l border-white/20 pl-4">{time.toLocaleTimeString()}</span>}
            {time && <span className="hidden md:inline-block border-l border-white/20 pl-4 uppercase">{time.toDateString()}</span>}
          </div>

          {/* Right: Social Icons */}
          <div className="flex gap-3 items-center">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-5 h-5 rounded-sm bg-white text-lokmat-red hover:bg-gray-100 transition-all hover:scale-110 shadow-sm"
            >
              <FaFacebookF className="text-[10px]" />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-5 h-5 rounded-sm bg-white text-[#0077B5] hover:bg-gray-100 transition-all hover:scale-110 shadow-sm"
            >
              <FaLinkedinIn className="text-[10px]" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER - CLEAN WHITE STYLE */}
      <div className="relative bg-red-50 border-b border-gray-100 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo Section */}
          <div className="w-[120px] hidden md:block opacity-0">spacer</div> {/* Flex spacer */}

          {/* Center Logo + Tagline */}
          <Link href="/" className="flex flex-col items-center text-center group">
            <img src="/logo.png" alt="Lokmat Style Logo" className="h-16 group-hover:scale-105 transition-transform duration-500" />
            <span className="text-lokmat-red font-black text-sm uppercase tracking-[0.2em] mt-2">
              नाशिकचा खबरनामा
            </span>
          </Link>

          {/* Right: Advertisement */}
          <div className="hidden lg:flex w-[468px]">
            <div className="bg-gray-50 border border-gray-100 h-20 w-full flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-tighter font-bold font-sans">
              - Advertisement -
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
