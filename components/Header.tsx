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
      <div className="bg-lokmat-gradient text-white text-xs border-b border-[var(--color-primary-soft)]">
        <div className="container mx-auto flex justify-between items-center px-4 py-1.5">
          {/* Left: Language + Time */}
          <div className="flex gap-4 items-center font-semibold">
            <span className="cursor-pointer hover:underline">
              मराठी
            </span>
            {time && <span className="hidden sm:inline-block border-l border-white/30 pl-4">{time.toLocaleTimeString()}</span>}
            {time && <span className="hidden md:inline-block border-l border-white/30 pl-4">{time.toDateString()}</span>}
          </div>

          {/* Right: Social Icons */}
          <div className="flex gap-2 items-center">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-5 h-5 rounded-sm bg-white text-[var(--color-primary)] hover:bg-gray-100 transition-colors"
            >
              <FaFacebookF className="text-[10px]" />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-5 h-5 rounded-sm bg-white text-[#0077B5] hover:bg-gray-100 transition-colors"
            >
              <FaLinkedinIn className="text-[10px]" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER - CLEAN WHITE STYLE */}
    <div className="relative bg-rose-100 border-b border-gray-200 py-6">
        <div className="container mx-auto px-4 flex items-center justify-center relative">

          {/* Center Logo + Tagline */}
          <Link href="/" className="flex flex-col items-center text-center">
            <img src="/logo.png" alt="Lokmat Style Logo" className="h-14" />
            <span className="text-primary font-bold text-xs uppercase tracking-widest mt-1">
              नाशिकचा खबरनामा
            </span>
          </Link>

          {/* Right: Advertisement */}
          <div className="hidden md:flex absolute right-4">
            <div className="bg-white border border-gray-200 h-20 w-[468px] flex items-center justify-center text-[10px] text-gray-400 uppercase tracking-tighter">
              - Advertisement -
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
