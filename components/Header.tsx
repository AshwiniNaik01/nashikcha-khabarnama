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
    <div className="w-full">
      {/* 1. TOP BAR */}
      <div className="bg-[var(--color-bg-primary)] text-sm border-b border-[var(--color-border)]">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          {/* Left: Language + Time */}
          <div className="flex gap-4 items-center text-white">
            <span className="cursor-pointer hover:text-primary-soft">
              मराठी
            </span>
            {time && <span>{time.toLocaleTimeString()}</span>}
          </div>

          {/* Right: Date + Social Icons */}
          <div className="flex gap-3 items-center text-white">
            {time && <span>{time.toDateString()}</span>}

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-primary hover:opacity-80 transition-opacity"
            >
              <FaFacebookF className="text-xs" />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-[var(--color-primary)] hover:opacity-80 transition-opacity"
            >
              <FaLinkedinIn className="text-xs" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div className="relative bg-sky-100 border-b border-[var(--color-border)] py-4">
        <div className="container mx-auto px-4 flex justify-between items-center relative">
          {/* Left placeholder */}
          <div className="w-1/3"></div>

          {/* Logo + Motivating Text */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <Link href="/">
              <img src="/logo.png" alt="Newsup Logo" className="h-12" />
            </Link>
            <p className="mt-2 text-black text-md font-semibold text-center">
              माहिती ठेवा. प्रेरित व्हा. ✨
            </p>
          </div>

          {/* Advertisement */}
          <div className="hidden md:flex w-1/3 justify-end">
            <div className="bg-[var(--color-bg-muted)] border border-[var(--color-border)] h-20 w-[420px] flex items-center justify-center text-sm text-[var(--color-text-muted)]">
              Advertisement
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
