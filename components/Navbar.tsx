// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FaSearch, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

// interface NavItem {
//   label: string;
//   href: string;
//   subItems?: NavItem[];
// }

// const navItems: NavItem[] = [
//   { label: "मुखपृष्ठ", href: "/" },
//   { label: "देश-विदेश", href: "/category/national" },
//   { label: "महाराष्ट्र", href: "/category/maharashtra" },
//   { label: "राजकारण", href: "/category/politics" },
//   { label: "नासिक शहर", href: "/category/nashik-city" },
//   { label: "नासिक ग्रामीण", href: "/category/nashik-rural" },
//   { label: "क्राईम", href: "/category/crime" },
//   { label: "शेती", href: "/category/agriculture" },
//   {
//     label: "अधिक",
//     href: "#",
//     subItems: [
//       // { label: "राशीभविष्य", href: "/rashi" },
//       { label: "अर्थकारण", href: "/category/business" },
//       { label: "क्रीडा", href: "/category/sports" },
//       { label: "पंचायत राज", href: "/category/panchayat-raj" },
//       //   { label: "व्हिडीओ", href: "/videos" },
//       //   { label: "फोटो", href: "/photos" },
//     ],
//   },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [isAdhikOpen, setIsAdhikOpen] = useState(false);

//   const pathname = usePathname();

//   const isActive = (path: string) => {
//     if (path === "/" && pathname === "/") return true;
//     if (path !== "/" && pathname.startsWith(path)) return true;
//     return false;
//   };

// return (
//   <nav className="bg-black sticky top-0 z-[60] shadow-md border-b-2 md:border-b-4 border-gray-800 text-white flex justify-between items-center h-8 md:h-10 px-4">
//     <div className="container mx-auto px-4">
//       <div className="flex justify-between items-center h-8 md:h-10">

//         {/* Desktop Menu */}
//         <ul className="hidden lg:flex items-center h-full font-black uppercase text-base xl:text-lg tracking-tight ml-4">
//           {navItems.map((item) => {
//             const active = isActive(item.href);
//             return (
//               <li
//                 key={item.label}
//                 className={`group relative h-full flex items-center
//                   after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
//                   after:bottom-0 after:border-l-[6px] after:border-r-[6px] after:border-t-[6px]
//                   after:border-l-transparent after:border-r-transparent after:border-t-lokmat-red
//                   after:opacity-0 after:transition-opacity after:duration-200
//                   ${active ? "after:opacity-100" : "group-hover:after:opacity-100"}
//                 `}
//               >
//                 <Link
//                   href={item.href}
//                   className={`px-3 xl:px-4 h-full flex items-center gap-1 transition-all duration-300 border-r border-gray-700 whitespace-nowrap
//                     ${active
//                       ? "bg-lokmat-red text-white"
//                       : "text-white hover:bg-white hover:text-black"
//                     }`}
//                 >
//                   {item.label}
//                   {item.subItems && (
//                     <FaChevronDown className="text-[10px] mt-0.5 group-hover:rotate-180 transition-transform" />
//                   )}
//                 </Link>

//                 {item.subItems && (
//                   <ul className="absolute right-0 top-full bg-white shadow-2xl border-t-4 border-lokmat-red py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
//                     {item.subItems.map((sub) => (
//                       <li key={sub.label}>
//                         <Link
//                           href={sub.href}
//                           className="block px-6 py-3 text-black hover:bg-gray-100 hover:text-lokmat-red text-md font-bold border-b border-gray-200 last:border-0"
//                         >
//                           {sub.label}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             );
//           })}
//         </ul>

//         {/* Search */}
//         <div className="flex items-center h-full">
//           <div className="relative flex items-center h-full">
//             <button
//               type="button"
//               onClick={() => setSearchOpen((prev) => !prev)}
//               className="px-4 md:px-5 h-full text-white hover:bg-lokmat-red hover:text-white transition-all border-l border-gray-700"
//               aria-label="Search"
//               suppressHydrationWarning
//             >
//               <FaSearch size={16} />
//             </button>

//             <div
//               className={`absolute right-0 top-full mt-2 bg-white p-4 shadow-2xl rounded-md border border-gray-200 w-[280px] sm:w-80 transition-all duration-200 z-50
//                 ${searchOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}
//               `}
//             >
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="बातमी शोधा..."
//                   className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-lokmat-red text-black"
//                 />
//                 <button
//                   suppressHydrationWarning
//                   className="bg-lokmat-red text-white px-3 py-2 rounded-md text-sm font-bold"
//                 >
//                   शोधा
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="lg:hidden px-4 h-full text-white hover:bg-lokmat-red hover:text-white transition-all border-l border-gray-700"
//           suppressHydrationWarning
//           aria-label="Toggle Menu"
//         >
//           {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
//         </button>
//       </div>
//     </div>

//     {/* Mobile Sidebar Menu */}
//     <div
//       className={`lg:hidden overflow-y-auto transition-all duration-300 ease-in-out bg-black
//         ${isOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
//       `}
//     >
//       <ul className="container mx-auto px-4 py-6 flex flex-col gap-1">
//         {navItems.map((item) => {
//           const active = isActive(item.href);
//           const hasSubItems = !!item.subItems;

//           return (
//             <li key={item.label} className="flex flex-col border-b border-white/10 last:border-0">
//               {hasSubItems ? (
//                 <>
//                   <button
//                     onClick={() => setIsAdhikOpen(!isAdhikOpen)}
//                     suppressHydrationWarning
//                     className={`flex justify-between items-center py-3 px-4 font-bold uppercase text-xl tracking-wider rounded-md transition-all
//                       ${isAdhikOpen ? "bg-lokmat-red text-white" : "text-white hover:bg-white/10"}
//                     `}
//                   >
//                     {item.label}
//                     <FaChevronDown
//                       className={`transition-transform duration-300 ${isAdhikOpen ? "rotate-180" : ""}`}
//                     />
//                   </button>

//                   <div
//                     className={`grid grid-cols-2 gap-2 pl-4 pb-3 mt-1 overflow-hidden transition-all duration-300
//                       ${isAdhikOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 hidden"}
//                     `}
//                   >
//                     {item.subItems?.map((subItem) => (
//                       <Link
//                         key={subItem.label}
//                         href={subItem.href}
//                         className="py-2 px-3 text-lg font-bold text-white bg-white/10 hover:bg-lokmat-red rounded text-center"
//                         onClick={() => {
//                           setIsOpen(false);
//                           setIsAdhikOpen(false);
//                         }}
//                       >
//                         {subItem.label}
//                       </Link>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <Link
//                   href={item.href}
//                   className={`py-3 px-4 font-bold uppercase text-xl tracking-wider rounded-md transition-all
//                     ${active ? "bg-lokmat-red text-white" : "text-white hover:bg-lokmat-red"}
//                   `}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {item.label}
//                 </Link>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   </nav>
// );


// }


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
  {
    label: "अधिक",
    href: "#",
    subItems: [
      { label: "अर्थकारण", href: "/category/business" },
      { label: "क्रीडा", href: "/category/sports" },
      { label: "पंचायत राज", href: "/category/panchayat-raj" },
    ],
  },
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
                    : "hover:bg-white hover:text-black"}
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
        ${active
                        ? "bg-lokmat-red text-white"
                        : "text-gray-300 hover:text-white"}
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
