"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

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
  { label: "अर्थकारण", href: "/category/business" },
  { label: "राशीभविष्य", href: "/rashi" },
  { label: "क्रीडा", href: "/category/sports" },
  { label: "भक्तीरंग", href: "/category/bahaktirang" },
  //   label: "अधिक",
  //   href: "#",
  //   subItems: [
  //     { label: "अर्थकारण", href: "/category/business" }
  //     { label: "राशीभविष्य", href: "/rashi" },
  //     { label: "क्रीडा", href: "/category/sports" },
  //     { label: "पंचायत राज", href: "/category/panchayat-raj" },
  //   ],
  // },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileAdhikOpen, setMobileAdhikOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const adhikItem = navItems.find((i) => i.label === "अधिक");

  return (
    <nav className="bg-black sticky top-0 z-[60] border-b-2 border-gray-800 text-white">
      <div className="container mx-auto">
        {/* ---------------- Desktop Menu ---------------- */}
        <ul className="hidden lg:flex items-center font-black uppercase text-lg">
          {navItems.map((item) => (
            <li key={item.label} className="relative group">
              <Link
                href={item.href}
                className={`px-4 py-4 flex items-center gap-1 border-r border-gray-700
                  ${isActive(item.href)
                    ? "bg-lokmat-red"
                    : "hover:bg-white hover:text-black"
                  }
                `}
              >
                {item.label}
                {item.subItems && (
                  <FaChevronDown className="text-xs group-hover:rotate-180 transition" />
                )}
              </Link>

              {/* Desktop dropdown */}
              {item.subItems && (
                <ul className="absolute top-full right-0 bg-white text-black shadow-xl border-t-4 border-lokmat-red opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  {item.subItems.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        className="block px-6 py-3 font-bold hover:bg-gray-100 hover:text-lokmat-red"
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* ---------------- Mobile Category Bar ---------------- */}
        <div className="lg:hidden relative">
          <ul className="flex overflow-x-auto no-scrollbar px-2 py-2 gap-2">
            {navItems.map((item) => {
              const active = isActive(item.href);

              if (item.subItems) {
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => setMobileAdhikOpen(!mobileAdhikOpen)}
                      className="flex items-center gap-1 px-4 py-2 rounded-full font-bold uppercase
                        text-gray-300 hover:text-white active:bg-gray-800"
                    >
                      अधिक
                      <FaChevronDown
                        className={`text-xs transition ${mobileAdhikOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.label} className="flex items-center">
                  <Link
                    href={item.href}
                    className={`flex items-center justify-center px-4 py-3 rounded-full font-bold uppercase whitespace-nowrap leading-none
        ${active ? "bg-lokmat-red text-white" : "text-gray-300 hover:text-white"
                      }
      `}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ---------------- Mobile Adhik Dropdown ---------------- */}
          {mobileAdhikOpen && (
            <div className="absolute left-2 right-2 mt-2 bg-black border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="flex flex-col divide-y divide-gray-800">
                {adhikItem?.subItems?.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    onClick={() => setMobileAdhikOpen(false)}
                    className="px-4 py-3 text-lg font-bold text-gray-300 hover:bg-lokmat-red hover:text-white transition"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
