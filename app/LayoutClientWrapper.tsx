// "use client";

// import React, { useEffect, useState } from "react";
// import { usePathname, useSearchParams } from "next/navigation";
// import AdDisplay from "@/components/advertisement/AdDisplay";
// import {
//   getAdsByCategory,
//   Advertisement as AdType,
// } from "@/components/services/adService";

// export default function LayoutClientWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [globalAds, setGlobalAds] = useState<AdType[]>([]);

//   useEffect(() => {
//     if (pathname && typeof window !== "undefined" && (window as any).gtag) {
//       const url = searchParams.toString()
//         ? `${pathname}?${searchParams.toString()}`
//         : pathname;

//       (window as any).gtag('config', 'G-48FNN5BNR0', {
//         page_path: url,
//       });
//     }
//   }, [pathname, searchParams]);

//   useEffect(() => {
//     const fetchGlobalAds = async () => {
//       try {
//         const res = await getAdsByCategory("all");
//         if (res.success) setGlobalAds(res.data);
//       } catch (err) {
//         console.error("Layout Ads Error:", err);
//       }
//     };
//     fetchGlobalAds();
//   }, []);

//   return (
//     <div className="site-layout-wrapper flex justify-center min-h-screen bg-white">

//       <aside className="hidden xl:flex flex-col w-[120px] p-2 border-r border-gray-100/50">
//         <div className="sticky top-[100px] h-[calc(100vh-120px)]">
//           <AdDisplay
//             ads={globalAds}
//             position="sticky-left"
//             className="w-full h-full"
//           />
//         </div>
//       </aside>

//       <main className="site-main-content flex-1 max-w-6xl">
//         <div className="parity-container">{children}</div>
//       </main>


//       <aside className="hidden xl:flex flex-col w-[120px] p-2 border-l border-gray-100/50">
//         <div className="sticky top-[100px] h-[calc(100vh-120px)]">
//           <AdDisplay
//             ads={globalAds}
//             position="sticky-right"
//             className="w-full h-full"
//           />
//         </div>
//       </aside>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import AdDisplay from "@/components/advertisement/AdDisplay";
import {
  getAdsByCategory,
  Advertisement as AdType,
} from "@/components/services/adService";


function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [globalAds, setGlobalAds] = useState<AdType[]>([]);

  useEffect(() => {
    if (pathname && typeof window !== "undefined" && (window as any).gtag) {
      const url = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      (window as any).gtag('config', 'G-48FNN5BNR0', {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const fetchGlobalAds = async () => {
      try {
        const res = await getAdsByCategory("all");
        if (res.success) setGlobalAds(res.data);
      } catch (err) {
        console.error("Layout Ads Error:", err);
      }
    };
    fetchGlobalAds();
  }, []);

  return (
    <div className="site-layout-wrapper flex justify-center min-h-screen bg-white">
      {/* Left Sidebar */}
      <aside className="hidden xl:flex flex-col w-[120px] p-2 border-r border-gray-100/50">
        <div className="sticky top-[100px] h-[calc(100vh-120px)]">
          <AdDisplay
            ads={globalAds}
            position="sticky-left"
            className="w-full h-full"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="site-main-content flex-1 max-w-6xl">
        <div className="parity-container">{children}</div>
      </main>

      {/* Right Sidebar */}
      <aside className="hidden xl:flex flex-col w-[120px] p-2 border-l border-gray-100/50">
        <div className="sticky top-[100px] h-[calc(100vh-120px)]">
          <AdDisplay
            ads={globalAds}
            position="sticky-right"
            className="w-full h-full"
          />
        </div>
      </aside>
    </div>
  );
}


export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}