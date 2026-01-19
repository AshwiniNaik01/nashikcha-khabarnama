import NewsSlider from "@/components/NewsSlider";
import BreakingNews from "@/components/home/BreakingNews";
import HeroGrid from "@/components/home/HeroGrid";
import CategoryBlock from "@/components/home/CategoryBlock";
import Sidebar from "@/components/home/Sidebar";
import LiveNewsWidget from "@/components/home/LiveNewsWidget";
import WeatherWidget from "@/components/home/WeatherWidget";


import VideoGallery from "@/components/home/VideoGallery";
import PhotoGallery from "@/components/home/PhotoGallery";

// Unified Article definition
interface Article {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  category: string;
  date: string;
  views?: string;
  isBreaking?: boolean;
}

const sampleArticles: Article[] = [
  {
    title: 'रामजन्मभूमीच्या ऐतिहासिक सोहळ्याची नाशिकमध्ये जय्यत तयारी',
    excerpt: 'नाशिकच्या रामकुंडावर दीपोत्सव आणि विशेष महाआरतीचे आयोजन करण्यात आले आहे...',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    slug: 'nashik-ram-mandir-celebration',
    category: 'नाशिक',
    date: '१३ जाने २०२६',
    views: '१२.५k',
    isBreaking: true
  },
  {
    title: 'नाशिकच्या द्राक्ष निर्यातीत विक्रमी वाढ; शेतकऱ्यांमध्ये आनंदाचे वातावरण',
    excerpt: 'चालू हंगामात द्राक्ष निर्यातीने नवा टप्पा गाठला असून युरोपियन देशांतून मोठी मागणी...',
    image: 'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?cs=srgb&dl=pexels-qjpioneer-708777.jpg&fm=jpg',
    slug: 'nashik-grapes-export',
    category: 'शेती',
    date: '१३ जाने २०२६',
    views: '८.२k',
    isBreaking: false
  },
  {
    title: 'नाशिक पुणे हायस्पीड रेल्वे प्रकल्पाला गती; जमीन संपादनाचे काम ९०% पूर्ण',
    excerpt: 'राज्य सरकारने प्रकल्पासाठी अतिरिक्त निधी मंजूर केला असून लवकरच प्रत्यक्ष कामाला सुरुवात...',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/070/593/008/small/winter-night-in-urban-park-with-snow-and-soft-glow-of-lights-photo.jpeg',
    slug: 'nashik-pune-railway-update',
    category: 'विकास',
    date: '१३ जाने २०२६',
    views: '१०.३k',
    isBreaking: true
  },
  {
    title: 'हिवाळ्याचा कडाका वाढला; नाशिककर गुलाबी थंडीचा आनंद घेत आहेत',
    excerpt: 'गेल्या २४ तासांत नाशिकचे तापमान १० अंशांच्या खाली गेले असून थंडीचा जोर वाढला...',
    image: 'https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg',
    slug: 'nashik-winter-update',
    category: 'नाशिक',
    date: '१३ जाने २०२६',
    views: '५.७k',
    isBreaking: false
  },
  {
    title: 'तंत्रज्ञान क्षेत्रात मोठी क्रांती; एआयमुळे रोजगाराच्या संधी वाढणार',
    excerpt: 'तज्ज्ञांच्या मते आर्टिफिशियल इंटेलिजन्समुळे नवीन कौशल्य असलेल्या युवकांना मोठी संधी मिळणारे...',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    slug: 'tech-ai-future',
    category: 'तंत्रज्ञान',
    date: '१३ जाने २०२६',
    views: '१५.२k',
    isBreaking: true
  },
  {
    title: 'सांगलीचे सुपुत्र भारतीय सैन्यात मेजर पदावर बढती',
    excerpt: 'देशसेवेसाठी समर्पित असलेल्या सांगलीच्या सुपुत्राने अभूतपूर्व कामगिरी करत गौरव मिळवला असून...',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    slug: 'national-pride',
    category: 'राष्ट्रीय',
    date: '१३ जाने २०२६',
    views: '२०.१k',
    isBreaking: true
  },
];

const sampleSliderArticles = sampleArticles.slice(0, 3);

const trendingItems = [
  { id: 1, title: 'नाशिक बाजार समितीत कांद्याच्या दरात घसरण, शेतकरी हवालदिल...', views: '१२.३k' },
  { id: 2, title: 'राम मंदिर प्रसन्नतेत नाशिककरांचा उत्साह: विशेष आरती आयोजित...', views: '१५.७k' },
  { id: 3, title: 'गोदावरी नदीच्या पात्रातील गाळ काढण्याचे काम गतीवर...', views: '८.९k' },
  { id: 4, title: 'महिला क्रिकेट संघाला शहराचा गौरव: विशेष समारंभ आयोजित...', views: '६.५k' },
  { id: 5, title: 'नाशिक एमपीएससी परीक्षेचे निकाल जाहीर: १२७ उमेदवार निवड...', views: '१८.२k' },
];

export default function HomePage() {
  return (
    <>
      <div className="space-y-12 animate-in fade-in duration-700">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">


          <div className="lg:col-span-2 space-y-12">

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-lokmat-red pb-2">
                <h2 className="text-xl font-bold uppercase border-l-4 border-lokmat-red pl-3">मुख्य बातम्या</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-red-50 text-lokmat-dark px-2 py-1 rounded-full">लाईव्ह</span>
                  <span className="text-xs text-gray-500">आत्ताच अपडेट</span>
                </div>
              </div>
              <HeroGrid articles={sampleArticles} />
            </div>

            {/* Nashik District Category Block */}
            <CategoryBlock
              title="नाशिक जिल्हा"
              articles={sampleArticles.slice(0, 4)}
              href="/category/nashik"
            />
          </div>

          {/* RIGHT: Sidebar Widgets */}
          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-fit">
            <LiveNewsWidget />
            <WeatherWidget />
            <Sidebar trendingItems={trendingItems} />

            {/* Advertisement Space */}
            {/* <div className="bg-gradient-to-r from-lokmat-red to-lokmat-maroon text-white p-6 rounded-lg text-center shadow-lg border border-red-700/20">
              <div className="text-sm font-bold mb-2">विशेष ऑफर</div>
              <div className="text-xs opacity-90 mb-4 font-medium">आमच्या ePaper सबस्क्रिप्शनवर ५०% सवलत</div>
              <button className="bg-white text-lokmat-maroon hover:bg-gray-100 px-6 py-2.5 rounded shadow-sm text-sm font-black uppercase tracking-wider transition-all transform hover:scale-105">
                सबस्क्राईब करा
              </button>
            </div> */}
          </aside>
        </div>

        {/* BOTTOM SECTION: Full Width Categories & Galleries */}
        <div className="space-y-16 w-full">
          <NewsSlider articles={sampleArticles} title="देश-विदेश" />

          <div className="space-y-12">
            <NewsSlider articles={sampleArticles} title="महाराष्ट्र" />

            {/* NEW: Cinematic Video Gallery */}
            <VideoGallery />
          </div>

          <NewsSlider articles={sampleSliderArticles} title="राजकारण" />
          <NewsSlider articles={sampleSliderArticles} title="नाशिक शहर" />

          <div className="space-y-12">
            <NewsSlider articles={sampleSliderArticles} title="नाशिक ग्रामीण" />

            {/* NEW: Asymmetric Photo Gallery */}
            <PhotoGallery />
          </div>

          <NewsSlider articles={sampleSliderArticles} title="क्राईम" />
          <NewsSlider articles={sampleSliderArticles} title="शेती" />
          <NewsSlider articles={sampleSliderArticles} title="क्रीडा" />
        </div>

      </div>
    </>
  );
}
