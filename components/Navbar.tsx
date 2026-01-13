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
    { label: "राशीभविष्य", href: "/category/horoscope" },
    { label: "अर्थकारण", href: "/category/business" },
    { label: "क्रीडा", href: "/category/sports" },
    { label: "पंचायत राज", href: "/category/panchayat-raj" },
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
        <nav className="bg-[var(--color-text-default)] text-[var(--color-text-default)] sticky top-0 z-50 shadow-lg border-b-4 border-[var(--color-accent)]">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-12">

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex items-center h-full font-bold uppercase text-md tracking-tight">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <li key={item.label} className="group relative h-full flex items-center">
                                    <Link
                                        href={item.href}
                                        className={`px-5 h-full flex items-center gap-1 transition-all duration-200 border-r border-gray-100 ${active
                                            ? "bg-[var(--color-text-default)] text-[var(--color-primary)]"
                                            : "text-black hover:bg-[var(--color-primary)] hover:text-[var(--color-primary)]"
                                            }`}
                                    >
                                        {item.label}
                                        {item.subItems && <FaChevronDown className={`text-[10px] mt-0.5 group-hover:rotate-180 transition-transform ${active ? "text-gray-400" : "text-gray-400 group-hover:text-white"}`} />}
                                    </Link>

                                    {/* Submenu */}
                                    {item.subItems && (
                                        <ul className="absolute left-0 top-full bg-gray-100 text-gray-800 shadow-2xl border-t-4 border-[var(--color-accent)] py-2 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 origin-top">
                                            {item.subItems.map((subItem) => (
                                                <li key={subItem.label}>
                                                    <Link
                                                        href={subItem.href}
                                                        className={`block px-6 py-2.5 hover:bg-gray-100 hover:text-black transition-colors text-sm font-semibold border-b border-gray-100 last:border-0 ${pathname === subItem.href ? "text-black font-black bg-gray-50 underline" : ""
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
                    <div className="flex items-center gap-2 h-full">
                        {/* Search Toggle */}
                        <div className="relative flex items-center h-full">
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="px-4 h-full text-black hover:bg-[var(--color-primary-soft)] hover:text-white transition-colors border-l border-gray-100"
                                aria-label="Search"
                            >
                                <FaSearch size={16} />
                            </button>

                            {/* Search Bar Popover */}
                            {searchOpen && (
                                <div className="absolute right-0 top-full mt-1 bg-white p-4 shadow-2xl rounded-sm border border-gray-200 w-80 animate-slide-down z-50">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="बातमी शोधा..."
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-sm text-sm text-gray-800 focus:outline-none focus:border-[var(--color-primary)]"
                                            autoFocus
                                        />
                                        <button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-sm text-sm font-bold hover:bg-[var(--color-primary-soft)] transition-colors uppercase">
                                            शोधा
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 text-black hover:bg-[var(--color-primary-soft)] hover:text-white transition-colors ml-2"
                        >
                            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out bg-[var(--color-accent)] ${isOpen ? "max-h-[1000px] border-t border-white/10 shadow-inner" : "max-h-0"
                    }`}
            >
                <ul className="container mx-auto px-4 py-6 flex flex-col gap-1">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <li key={item.label} className="flex flex-col">
                                <Link
                                    href={item.href}
                                    className={`py-3 px-4 font-bold uppercase text-sm tracking-wide rounded-sm transition-colors ${active ? "bg-[var(--color-primary)] text-white" : "hover:bg-[var(--color-primary-soft)] text-gray-100"
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                                {item.subItems && (
                                    <ul className="pl-6 border-l-2 border-white/20 mt-1 flex flex-col gap-0.5">
                                        {item.subItems.map((subItem) => (
                                            <li key={subItem.label}>
                                                <Link
                                                    href={subItem.href}
                                                    className={`py-2 px-4 text-sm font-semibold block rounded-sm transition-colors ${pathname === subItem.href ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
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
