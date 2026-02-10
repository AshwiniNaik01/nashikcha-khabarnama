"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "मुखपृष्ठ", href: "/" },
  { label: "देश-विदेश", href: "/category/national" },
  { label: "महाराष्ट्र", href: "/category/maharashtra" },
  { label: "राजकारण", href: "/category/politics" },
  { label: "नाशिक शहर", href: "/category/nashik-city" },
  { label: "नाशिक ग्रामीण", href: "/category/nashik-rural" },
  { label: "क्राईम", href: "/category/crime" },
  { label: "शेती", href: "/category/agriculture" },
  {
    label: "अधिक",
    href: "#",
    subItems: [
      { label: "राशीभविष्य", href: "/rashi" },
      { label: "अर्थकारण", href: "/category/business" },
      { label: "क्रीडा", href: "/category/sports" },
      { label: "पंचायत राज", href: "/category/panchayat-raj" },
      { label: "व्हिडीओ", href: "/videos" },
      { label: "फोटो", href: "/photos" },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAdhikOpen, setIsAdhikOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white sticky top-0 z-[60] shadow-md border-b-2 md:border-b-4 border-lokmat-maroon flex justify-between items-center h-14 md:h-16 px-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* 1. Logo Section */}
          <Link href="/" className="flex items-center py-2 shrink-0">
            <span className="text-pink-500 font-bold text-xl sm:text-2xl md:text-[28px] uppercase whitespace-nowrap">
              नाशिकचा खबरनामा
            </span>
          </Link>

          {/* 2. Desktop Menu */}
          <ul className="hidden lg:flex items-center h-full font-black uppercase text-base xl:text-lg tracking-tight ml-4">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li
                  key={item.label}
                  className="group relative h-full flex items-center"
                >
                  <Link
                    href={item.href}
                    className={`px-3 xl:px-4 h-full flex items-center gap-1 transition-all duration-300 border-r border-gray-50 whitespace-nowrap ${
                      active
                        ? "bg-lokmat-maroon text-white"
                        : "text-gray-800 hover:bg-lokmat-red hover:text-white"
                    }`}
                  >
                    {item.label}
                    {item.subItems && (
                      <FaChevronDown className="text-[10px] mt-0.5 group-hover:rotate-180 transition-transform" />
                    )}
                  </Link>

                  {item.subItems && (
                    <ul className="absolute right-0 top-full bg-white shadow-2xl border-t-4 border-[#E1261C] py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                      {item.subItems.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.href}
                            className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#E1261C] text-md font-bold border-b border-gray-50 last:border-0"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center h-full">
            <div className="relative flex items-center h-full">
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                className="px-4 md:px-5 h-full text-gray-800 hover:bg-lokmat-red hover:text-white transition-all border-l border-gray-50"
                aria-label="Search"
                suppressHydrationWarning
              >
                <FaSearch size={16} />
              </button>

              <div
                className={`absolute right-0 top-full mt-2 bg-white p-4 shadow-2xl rounded-md border border-gray-100 w-[280px] sm:w-80 transition-all duration-200 z-50 ${
                  searchOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="बातमी शोधा..."
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-lokmat-red text-gray-800"
                  />
                  <button className="bg-lokmat-red text-white px-3 py-2 rounded-md text-sm font-bold">
                    शोधा
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Mobile Sidebar Menu */}
      <div
        className={`lg:hidden overflow-y-auto transition-all duration-300 ease-in-out bg-lokmat-maroon ${
          isOpen
            ? "max-h-[85vh] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="container mx-auto px-4 py-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const hasSubItems = !!item.subItems;

            return (
              <li
                key={item.label}
                className="flex flex-col border-b border-white/5 last:border-0"
              >
                {hasSubItems ? (
                  <>
                    <button
                      onClick={() => setIsAdhikOpen(!isAdhikOpen)}
                      className={`flex justify-between items-center py-3 px-4 font-bold uppercase text-xl tracking-wider rounded-md transition-all ${
                        isAdhikOpen
                          ? "bg-lokmat-red text-white"
                          : "text-gray-100"
                      }`}
                    >
                      {item.label}
                      <FaChevronDown
                        className={`transition-transform duration-300 ${isAdhikOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`grid grid-cols-2 gap-2 pl-4 pb-3 mt-1 overflow-hidden transition-all duration-300 ${
                        isAdhikOpen
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0 hidden"
                      }`}
                    >
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="py-2 px-3 text-lg font-bold text-gray-300 bg-white/5 rounded text-center"
                          onClick={() => {
                            setIsOpen(false);
                            setIsAdhikOpen(false);
                          }}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`py-3 px-4 font-bold uppercase text-xl tracking-wider rounded-md transition-all ${
                      active ? "bg-lokmat-red text-white" : "text-gray-100"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
