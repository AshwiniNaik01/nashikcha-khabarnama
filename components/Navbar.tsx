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
    { label: "Home", href: "/" },
    {
        label: "World",
        href: "/category/world",
        subItems: [
            { label: "Asia", href: "/category/world/asia" },
            { label: "Europe", href: "/category/world/europe" },
            { label: "Americas", href: "/category/world/americas" },
        ],
    },
    { label: "Politics", href: "/category/politics" },
    {
        label: "Technology",
        href: "/category/tech",
        subItems: [
            { label: "AI", href: "/category/tech/ai" },
            { label: "Gadgets", href: "/category/tech/gadgets" },
            { label: "Software", href: "/category/tech/software" },
        ],
    },
    {
        label: "Sports",
        href: "/category/sports",
        subItems: [
            { label: "Cricket", href: "/category/sports/cricket" },
            { label: "Football", href: "/category/sports/football" },
            { label: "Tennis", href: "/category/sports/tennis" },
        ],
    },
    { label: "Business", href: "/category/business" },
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
        <nav className="bg-[var(--color-bg-primary)] text-gray-300 sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-14">

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex items-center gap-1 h-full font-semibold">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <li key={item.label} className="group relative h-full flex items-center">
                                    <Link
                                        href={item.href}
                                        className={`px-4 h-full flex items-center gap-1 transition-colors ${active
                                            ? "bg-white text-[var(--color-primary)]"
                                            : "hover:text-white"
                                            }`}
                                    >
                                        {item.label}
                                        {item.subItems && <FaChevronDown className="text-[10px] mt-0.5 group-hover:rotate-180 transition-transform" />}
                                    </Link>

                                    {/* Submenu */}
                                    {item.subItems && (
                                        <ul className="absolute left-0 top-full bg-white text-gray-800 shadow-xl border-t-2 border-[var(--color-primary-soft)] py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 animate-slide-down">
                                            {item.subItems.map((subItem) => (
                                                <li key={subItem.label}>
                                                    <Link
                                                        href={subItem.href}
                                                        className={`block px-6 py-2 hover:bg-gray-100 hover:text-[var(--color-primary)] transition-colors text-sm ${pathname === subItem.href ? "text-[var(--color-primary)] font-bold bg-gray-50" : ""
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
                    <div className="flex items-center gap-4 h-full">
                        {/* Search Toggle */}
                        <div className="relative flex items-center h-full">
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2 hover:text-[var(--color-primary-soft)] transition-colors"
                                aria-label="Search"
                            >
                                <FaSearch size={18} />
                            </button>

                            {/* Search Bar Popover */}
                            {searchOpen && (
                                <div className="absolute right-0 top-full mt-2 bg-white p-3 shadow-lg rounded border border-gray-200 w-72 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Search news..."
                                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:border-[var(--color-primary-soft)]"
                                            autoFocus
                                        />
                                        <button className="bg-[var(--color-primary)] text-white px-3 py-1.5 rounded text-sm hover:bg-[var(--color-primary-soft)] transition-colors">
                                            Go
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 hover:text-[var(--color-primary-soft)] transition-colors"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] border-t border-gray-700" : "max-h-0"
                    }`}
            >
                <ul className="container mx-auto px-4 py-4 flex flex-col gap-2">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <li key={item.label} className="flex flex-col">
                                <Link
                                    href={item.href}
                                    className={`py-2 font-semibold transition-colors ${active ? "text-white bg-white/10 px-2 rounded" : "hover:text-[var(--color-primary-soft)]"
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                                {item.subItems && (
                                    <ul className="pl-4 border-l border-gray-700 mt-1 flex flex-col gap-1">
                                        {item.subItems.map((subItem) => (
                                            <li key={subItem.label}>
                                                <Link
                                                    href={subItem.href}
                                                    className={`py-1 text-sm transition-colors ${pathname === subItem.href ? "text-white font-bold" : "text-gray-400 hover:text-white"
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
