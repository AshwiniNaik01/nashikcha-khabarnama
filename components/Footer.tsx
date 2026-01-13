import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-12 pb-6 border-t-4 border-[var(--color-primary)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* 1. About Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <img src="/logo.png" alt="Nashikancha Khabarnama" className="h-10 brightness-0 invert" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              नाशिकचा खबरनामा - नाशिक जिल्ह्यातील विश्वसनीय बातम्यांचे व्यासपीठ. आम्ही आपल्यासाठी ताज्या घडामोडी, राजकारण, तंत्रज्ञान आणि बरंच काही घेऊन येतो.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-l-2 border-[var(--color-primary)] pl-3">निवडक वर्ग</h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-gray-400">
              <li><Link href="/category/politics" className="hover:text-white transition-colors">राजकारण</Link></li>
              <li><Link href="/category/tech" className="hover:text-white transition-colors">तंत्रज्ञान</Link></li>
              <li><Link href="/category/sports" className="hover:text-white transition-colors">क्रीडा</Link></li>
              <li><Link href="/category/world" className="hover:text-white transition-colors">महाराष्ट्र</Link></li>
            </ul>
          </div>

          {/* 3. Important Pages */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-l-2 border-[var(--color-primary)] pl-3">माहिती</h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">आमच्याबद्दल</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">संपर्क</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">गोपनीयता धोरण</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">अटी आणि शर्ती</Link></li>
            </ul>
          </div>

          {/* 4. Social & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-l-2 border-[var(--color-primary)] pl-3">सोशल मीडिया</h3>
            <p className="text-gray-400 text-sm">आमच्याशी जोडून रहा:</p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] transition-all">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] transition-all">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] transition-all">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] transition-all">
                <FaYoutube size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          <p>© २०२६ नाशिकचा खबरनामा. सर्व हक्क राखीव.</p>
          <p>Powered by <span className="text-white">SmartMedia Tech</span></p>
        </div>
      </div>
    </footer>
  );
}
