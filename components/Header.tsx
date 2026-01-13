"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function Header() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full">
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
              className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-white hover:opacity-80 transition-opacity"
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

      {/* 3. NAVIGATION BAR */}
      <div className="bg-[var(--color-bg-primary)] text-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <nav>
            <ul className="flex flex-wrap items-center gap-6 py-3 text-md font-semibold">
              <li>
                <Link
                  href="/"
                  className="text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/category/world"
                  className="hover:text-primary-soft transition-colors"
                >
                  World
                </Link>
              </li>
              <li>
                <Link
                  href="/category/politics"
                  className="hover:text-primary-soft transition-colors"
                >
                  Politics
                </Link>
              </li>
              <li>
                <Link
                  href="/category/tech"
                  className="hover:text-primary-soft transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sports"
                  className="hover:text-primary-soft transition-colors"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/category/business"
                  className="hover:text-primary-soft transition-colors"
                >
                  Business
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
