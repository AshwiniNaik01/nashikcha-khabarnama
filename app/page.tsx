import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import NewsSlider from "@/components/NewsSlider";


const sampleArticles = [
  { title: 'रामजन्मभूमीच्या ऐतिहासिक सोहळ्याची नाशिकमध्ये जय्यत तयारी', excerpt: 'नाशिकच्या रामकुंडावर दीपोत्सव आणि विशेष महाआरतीचे आयोजन करण्यात आले आहे...', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800', slug: 'nashik-ram-mandir-celebration', category: 'नाशिक', date: '१३ जाने २०२६' },
  { title: 'नाशिकच्या द्राक्ष निर्यातीत विक्रमी वाढ; शेतकऱ्यांमध्ये आनंदाचे वातावरण', excerpt: 'चालू हंगामात द्राक्ष निर्यातीने नवा टप्पा गाठला असून युरोपियन देशांतून मोठी मागणी...', image: 'https://images.unsplash.com/photo-1596401057633-531035ef832a?auto=format&fit=crop&q=80&w=800', slug: 'nashik-grapes-export', category: 'शेती', date: '१३ जाने २०२६' },
  { title: 'नाशिक पुणे हायस्पीड रेल्वे प्रकल्पाला गती; जमीन संपादनाचे काम ९०% पूर्ण', excerpt: 'राज्य सरकारने प्रकल्पासाठी अतिरिक्त निधी मंजूर केला असून लवकरच प्रत्यक्ष कामाला सुरुवात...', image: 'https://images.unsplash.com/photo-1474487056217-76fe4540d6e6?auto=format&fit=crop&q=80&w=800', slug: 'nashik-pune-railway-update', category: 'विकास', date: '१३ जाने २०२६' },
  { title: 'हिवाळ्याचा कडाका वाढला; नाशिककर गुलाबी थंडीचा आनंद घेत आहेत', excerpt: 'गेल्या २४ तासांत नाशिकचे तापमान १० अंशांच्या खाली गेले असून थंडीचा जोर वाढला...', image: 'https://images.unsplash.com/photo-1507367612148-cc12c4440026?auto=format&fit=crop&q=80&w=800', slug: 'nashik-winter-update', category: 'नाशिक', date: '१३ जाने २०२६' },
  { title: 'तंत्रज्ञान क्षेत्रात मोठी क्रांती; एआयमुळे रोजगाराच्या संधी वाढणार', excerpt: 'तज्ज्ञांच्या मते आर्टिफिशियल इंटेलिजन्समुळे नवीन कौशल्य असलेल्या युवकांना मोठी संधी मिळणारे...', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800', slug: 'tech-ai-future', category: 'तंत्रज्ञान', date: '१३ जाने २०२६' },
  { title: 'सांगलीचे सुपुत्र भारतीय सैन्यात मेजर पदावर बढती', excerpt: 'देशसेवेसाठी समर्पित असलेल्या सांगलीच्या सुपुत्राने अभूतपूर्व कामगिरी करत गौरव मिळवला असून...', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', slug: 'national-pride', category: 'राष्ट्रीय', date: '१३ जाने २०२६' },
];

export default function HomePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* 1. BREAKING NEWS TICKER */}
      <div className="bg-red-50 border-y border-red-100 overflow-hidden py-1 flex items-center">
        <div className="bg-[var(--color-primary)] text-white text-[10px] font-bold px-3 py-1 flex-shrink-0 uppercase italic tracking-tighter">
          ब्रेकिंग न्युज
        </div>
        <div className="flex-1 whitespace-nowrap overflow-hidden relative">
          <div className="animate-marquee inline-block pl-8 text-sm font-semibold text-black">
            नाशिकला थंडीचा कडाका वाढला... सिंहस्थ कुंभमेळ्यासाठी प्रशासनाची जय्यत तयारी... बाजार समितीत द्राक्षांची आवक वाढली...
          </div>
        </div>
      </div>

      {/* 2. HERO GRID SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main News Card */}
        <div className="lg:col-span-2 relative group overflow-hidden rounded-sm shadow-xl aspect-[16/10]">
          <img src={sampleArticles[0].image} alt={sampleArticles[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
            <span className="bg-[var(--color-primary)] text-white text-[10px] uppercase font-bold px-2 py-0.5 w-fit mb-2">
              {sampleArticles[0].category}
            </span>
            <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight line-clamp-2 hover:underline cursor-pointer transition-all">
              {sampleArticles[0].title}
            </h1>
          </div>
        </div>

        {/* Side News Stack */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleArticles.slice(1, 5).map((article, i) => (
            <div key={i} className="flex flex-col gap-2 group cursor-pointer border-b border-gray-100 pb-2">
              <div className="relative overflow-hidden aspect-[16/9] rounded-sm">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div>
                <span className="text-[var(--color-primary)] text-[10px] font-bold uppercase">{article.category}</span>
                <h3 className="text-sm font-bold line-clamp-2 group-hover:text-black transition-colors leading-snug">
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2.5 NEWS SLIDER SECTION */}
      <NewsSlider articles={sampleArticles} title="विशेष बातम्या" />

      {/* 3. CATEGORY BLOCKS - MORE SORTED FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Column 1 */}
        <div className="lg:col-span-2 space-y-8">
          <div className="border-t-2 border-[var(--color-primary)] pt-4">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-xl font-bold uppercase border-l-4 border-[var(--color-primary)] pl-3">नाशिक जिल्हा</h2>
              <Link href="/category/nashik" className="text-xs font-bold text-black hover:underline uppercase">आणखी पहा »</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleArticles.slice(0, 4).map((article, i) => (
                <ArticleCard key={i} {...article} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Trending Section */}
          <div className="bg-gray-50 p-4 border-t-2 border-black">
            <h2 className="text-lg font-bold mb-4 uppercase">ट्रेन्डिंग बातम्या</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex gap-3 items-start group cursor-pointer border-b border-gray-100 pb-2 last:border-0 mb-3">
                  <span className="text-3xl font-black text-gray-200 group-hover:text-black transition-colors">{num}</span>
                  <p className="text-xs font-bold line-clamp-2 leading-tight group-hover:text-black">नाशिक बाजार समितीत कांद्याच्या दरात घसरण, शेतकरी हवालदिल...</p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter or Link */}
          <div className="bg-[var(--color-accent)] text-white p-6 rounded-sm text-center">
            <h3 className="text-sm font-bold uppercase mb-2">महत्वाच्या बातम्या मिळवा</h3>
            <p className="text-[10px] mb-4 opacity-80">आमच्या व्हॉट्सॲप चॅनेलला जॉईन करा आणि ताज्या अपडेट्स मिळवा</p>
            <button className="bg-white text-[var(--color-accent)] w-full py-2 text-xs font-black uppercase rounded-sm hover:bg-gray-100 transition-colors">
              जॉईन करा
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
