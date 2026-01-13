// // app/layout.tsx
// import Header from '@/components/Header';
// import './globals.css';
// import Footer from '@/components/Footer';


// export const metadata = {
//   title: 'Newsup Clone',
//   description: 'Next.js + TypeScript + Tailwind news website',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="flex flex-col min-h-screen">
//         <Header />
//         <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }


// app/layout.tsx
import type { Metadata } from 'next';
import { Noto_Sans_Devanagari } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

/* ----------------------------------------
   Fonts
----------------------------------------- */
const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-marathi',
});

/* ----------------------------------------
   Metadata (SEO safe)
----------------------------------------- */
export const metadata: Metadata = {
  title: {
    default: 'Newsup Clone',
    template: '%s | Newsup Clone',
  },
  description: 'Next.js + TypeScript + Tailwind news website',
};

/* ----------------------------------------
   Root Layout
----------------------------------------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className={notoSansDevanagari.variable}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
