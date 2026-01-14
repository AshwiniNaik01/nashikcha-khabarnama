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
    { label: "राशीभविष्य", href: "/category/horoscope" },
    { label: "अर्थकारण", href: "/category/business" },
    { label: "क्रीडा", href: "/category/sports" },
    { label: "पंचायत राज", href: "/category/panchayat-raj" },
    { label: "व्हिडीओ", href: "/videos" },
    { label: "फोटो", href: "/photos" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-md border-b-4 border-lokmat-maroon">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-14">

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex items-center h-full font-black uppercase text-lg tracking-tight mx-10">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <li key={item.label} className="group relative h-full flex items-center">
                                    <Link
                                        href={item.href}
                                        className={`px-4 h-full flex items-center gap-1 transition-all duration-300 border-r border-gray-50 ${active
                                            ? "bg-lokmat-maroon text-white"
                                            : "text-gray-800 hover:bg-lokmat-red hover:text-white"
                                            }`}
                                    >
                                        {item.label}
                                        {item.subItems && <FaChevronDown className={`text-[10px] mt-0.5 group-hover:rotate-180 transition-transform ${active ? "text-white/70" : "text-gray-400 group-hover:text-white/70"}`} />}
                                    </Link>

                                    {/* Submenu */}
                                    {item.subItems && (
                                        <ul className="absolute left-0 top-full bg-white text-gray-800 shadow-2xl border-t-4 border-lokmat-maroon py-2 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 origin-top">
                                            {item.subItems.map((subItem) => (
                                                <li key={subItem.label}>
                                                    <Link
                                                        href={subItem.href}
                                                        className={`block px-6 py-3 hover:bg-gray-50 hover:text-lokmat-red transition-colors text-sm font-bold border-b border-gray-50 last:border-0 ${pathname === subItem.href ? "text-lokmat-red font-black bg-gray-50" : ""
                                                            }`}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {/* Right Side Tools */}
                    <div className="flex items-center gap-0 h-full">
                        {/* Search Toggle */}
                        <div className="relative flex items-center h-full">
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="px-5 h-full text-gray-800 hover:bg-lokmat-red hover:text-white transition-all border-l border-gray-50"
                                aria-label="Search"
                            >
                                <FaSearch size={16} />
                            </button>

                            {/* Search Bar Popover */}
                            {searchOpen && (
                                <div className="absolute right-0 top-full mt-2 bg-white p-5 shadow-2xl rounded-md border border-gray-100 w-80 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="बातमी शोधा..."
                                            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none focus:border-lokmat-red focus:bg-white transition-all"
                                            autoFocus
                                        />
                                        <button className="bg-lokmat-red text-white px-4 py-2 rounded-md text-sm font-black hover:bg-lokmat-maroon transition-colors uppercase shadow-sm">
                                            शोधा
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden px-4 h-full text-gray-800 hover:bg-lokmat-red hover:text-white transition-all border-l border-gray-50"
                        >
                            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out bg-lokmat-maroon ${isOpen ? "max-h-[1000px] border-t border-white/10 shadow-inner" : "max-h-0"
                    }`}
            >
                <ul className="container mx-auto px-4 py-8 flex flex-col gap-1">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <li key={item.label} className="flex flex-col">
                                <Link
                                    href={item.href}
                                    className={`py-3.5 px-5 font-black uppercase text-sm tracking-wider rounded-md transition-all ${active ? "bg-lokmat-red text-white shadow-md" : "hover:bg-lokmat-red/50 text-gray-100"
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                                {item.subItems && (
                                    <ul className="pl-6 border-l-2 border-white/20 mt-2 flex flex-col gap-1">
                                        {item.subItems.map((subItem) => (
                                            <li key={subItem.label}>
                                                <Link
                                                    href={subItem.href}
                                                    className={`py-2 px-4 text-sm font-bold block rounded-md transition-colors ${pathname === subItem.href ? "text-white bg-white/20" : "text-gray-300 hover:text-white hover:bg-white/10"
                                                        }`}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
