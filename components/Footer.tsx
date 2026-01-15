import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#0f0f0f] text-white pt-20 pb-10 overflow-hidden">
      {/* Decorative Top Line with Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lokmat-maroon via-lokmat-red to-lokmat-maroon"></div>

      {/* Ambient background glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-lokmat-red/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-lokmat-maroon/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="mx-30">
        <div className="container mx-auto px-4 relative z-10 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* 1. Brand Section */}
            <div className="space-y-8">
              <Link href="/" className="inline-block group">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-lokmat-red rounded-xl flex items-center justify-center shadow-lg shadow-lokmat-red/20 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-white font-black text-xl">N</span>
                  </div>
                  <h2 className="text-2xl font-black tracking-tighter">खबरनामा</h2>
                </div>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed font-medium max-w-xs">
                नाशिक जिल्ह्यातील विश्वसनीय बातमीदारीचे अग्रगण्य नाव. आम्ही आपल्यासाठी चोवीस तास ताज्या घडामोडी आणि सखोल विश्लेषण घेऊन येतो.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <FaMapMarkerAlt className="text-lokmat-red" />
                  <span className="text-xs font-bold uppercase tracking-wider">नाशिक, महाराष्ट्र</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <FaPhoneAlt className="text-lokmat-red" />
                  <span className="text-xs font-bold uppercase tracking-wider">+९१ २२३३४४५५६६</span>
                </div>
              </div>
            </div>

            {/* 2. Quick Links */}
            <div className="space-y-8 lg:pl-8 lg:border-l border-white/5">
              <div className="relative">
                <h3 className="text-sm font-black uppercase text-lokmat-red">प्रमुख विभाग</h3>
                <div className="mt-2 w-8 h-0.5 bg-gray-700"></div>
              </div>
              <ul className="space-y-3">
                {[
                  { name: "राजकारण", href: "/category/politics" },
                  { name: "क्राईम", href: "/category/crime" },
                  { name: "क्रीडा", href: "/category/sports" },
                  { name: "करमणूक", href: "/category/entertainment" },
                  { name: "राशीभविष्य", href: "/rashi" },
                  { name: "फोटो गॅलरी", href: "/photos" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-1 flex items-center gap-2 transition-all duration-300 group font-bold text-sm"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-lokmat-red transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Information */}
            <div className="space-y-8 lg:pl-8 lg:border-l border-white/5">
              <div className="relative">
                <h3 className="text-sm font-black uppercase text-lokmat-red">माहिती</h3>
                <div className="mt-2 w-8 h-0.5 bg-gray-700"></div>
              </div>
              <ul className="space-y-3">
                {[
                  { name: "आमच्याबद्दल", href: "/about" },
                  { name: "जाहिरात", href: "/advertise" },
                  { name: "संपर्क साधा", href: "/contact" },
                  { name: "गोपनीयता धोरण", href: "/privacy" },
                  { name: "अटी आणि शर्ती", href: "/terms" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-1 flex items-center gap-2 transition-all duration-300 group font-bold text-sm"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-lokmat-red transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Social & Newsletter */}
            <div className="space-y-8 lg:pl-8 lg:border-l border-white/5">
              <div className="relative">
                <h3 className="text-sm font-black uppercase text-lokmat-red">सोशल नेटवर्क</h3>
                <div className="mt-2 w-8 h-0.5 bg-gray-700"></div>
              </div>

              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">ताज्या अपडेट्ससाठी सबस्क्राईब करा:</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="ई-मेल पत्ता"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-lokmat-red transition-colors font-medium"
                    suppressHydrationWarning
                  />
                  <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
                </div>
                <button className="bg-lokmat-red hover:bg-lokmat-maroon text-white p-3 rounded-xl transition-all shadow-lg shadow-lokmat-red/20 active:scale-95" suppressHydrationWarning>
                  <span className="text-xs font-black uppercase tracking-widest px-2">नोंदणी</span>
                </button>
              </div>
              <div className="flex gap-4 pt-2">
                {[
                  { icon: <FaFacebookF />, color: "hover:bg-[#1877F2]" },
                  { icon: <FaTwitter />, color: "hover:bg-[#1DA1F2]" },
                  { icon: <FaInstagram />, color: "hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" },
                  { icon: <FaYoutube />, color: "hover:bg-[#FF0000]" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-1 text-white ${social.color} hover:border-transparent cursor-pointer`}
                    suppressHydrationWarning
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-[11px] text-gray-500 font-black uppercase tracking-[0.2em]">© २०२६ नाशिकचा खबरनामा</p>
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">सर्व हक्क सुरक्षित</p>
            </div>

            <div className="flex items-center gap-8">
              <img src="/logo.png" alt="" className="h-6 opacity-20 grayscale brightness-0 invert" />
              <div className="h-4 w-px bg-white/10 hidden md:block"></div>
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest flex items-center gap-2">
                Powered by <span className="text-gray-400 border-b border-gray-700 pb-0.5">SmartMedia Tech</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
