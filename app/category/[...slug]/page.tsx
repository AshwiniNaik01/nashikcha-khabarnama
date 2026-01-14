import ArticleCard from "@/components/ArticleCard";

interface Props {
    params: { category: string };
}

// 🔥 Slug → Marathi Category Name Mapping
const categoryMap: Record<string, string> = {
    national: "देश-विदेश",
    maharashtra: "महाराष्ट्र",
    politics: "राजकारण",
    "nashik-city": "नाशिक शहर",
    "nashik-rural": "नाशिक ग्रामीण",
    crime: "क्राईम",
    agriculture: "शेती",
    horoscope: "राशीभविष्य",
    business: "अर्थकारण",
    sports: "क्रीडा",
    "panchayat-raj": "पंचायत राज",
};


export default async function CategoryPage({ params }: Props) {

    // No await needed
    const categoryKey = params.category;

    // Convert slug to Marathi label
    const categoryName = categoryMap[categoryKey] || categoryKey;


    const sampleArticles = [
        {
            title: "नाशिकमध्ये राम मंदिर शोभायात्रेची जय्यत तयारी",
            excerpt: "शहरातील प्रमुख चौकांमध्ये सजावट, विद्युतरोषणाई आणि सांस्कृतिक कार्यक्रमांचे आयोजन...",
            image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800",
            slug: "nashik-ram-mandir-preparation"
        },
        {
            title: "त्र्यंबकेश्वर येथे भाविकांची वाढलेली गर्दी",
            excerpt: "श्री त्र्यंबकेश्वर मंदिरात सकाळपासूनच भाविकांचा मोठ्या प्रमाणात ओघ सुरू...",
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
            slug: "trimbakeshwar-bhavik-crowd"
        },
        {
            title: "द्राक्ष निर्यातीमध्ये विक्रमी वाढ; शेतकरी आनंदित",
            excerpt: "या हंगामात निर्यातीत तब्बल ३०% वाढ नोंदवली जाण्याची शक्यता...",
            image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800",
            slug: "grapes-export-record-growth"
        },
        {
            title: "नाशिक शहरात नवीन मेट्रो प्रकल्पाला गती",
            excerpt: "भूखंड अधिग्रहण प्रक्रिया पूर्ण; पुढील टप्प्याला प्रशासनाची मान्यता...",
            image: "https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?w=800",
            slug: "nashik-metro-project-update"
        },
        {
            title: "शहरातील ट्रॅफिक व्यवस्थेत मोठे बदल",
            excerpt: "महत्त्वाच्या चौकांमध्ये नवीन सिग्नल प्रणाली बसविण्यात आली आहे...",
            image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800",
            slug: "traffic-update-nashik"
        },
        {
            title: "इगतपुरीमध्ये पर्यटनाला वाढलेले यंदा विशेष आकर्षण",
            excerpt: "धबधबे आणि निसर्गसौंदर्य पाहण्यासाठी पर्यटकांची मोठी गर्दी...",
            image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
            slug: "igatpuri-tourism-rise"
        },
        {
            title: "शालेय विद्यार्थ्यांसाठी नवीन सुरक्षा नियम लागू",
            excerpt: "शाळांमध्ये बस तपासणी, CCTV मोनिटरिंग आणि गेट सुरक्षा वाढविण्यावर लक्ष केंद्रीत...",
            image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800",
            slug: "school-safety-guidelines"
        },
        {
            title: "शेतकऱ्यांसाठी विशेष कर्ज योजना जाहीर",
            excerpt: "कमी व्याजदरात कृषी कर्ज उपलब्ध; अर्ज प्रक्रिया सुरू...",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
            slug: "farmer-loan-scheme"
        },
        {
            title: "नाशिकमध्ये IT पार्क उभारणीला गती",
            excerpt: "नवीन रोजगार निर्मिती आणि स्टार्टअप संस्कृतीला चालना मिळणार...",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
            slug: "nashik-it-park-development"
        }
    ];


    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="border-b-4 border-[var(--color-primary)] pb-2 mb-8">
                <h1 className="text-3xl font-black tracking-tight text-gray-900">
                    {categoryName} <span className="text-[var(--color-primary)]">न्युज</span>



                </h1>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {sampleArticles.map((article) => (
                    <ArticleCard key={article.slug} {...article} />
                ))}
            </div>
        </div>
    );
}