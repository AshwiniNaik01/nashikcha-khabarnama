// components/photos/PhotoGalleryPage.tsx
"use client";

import React, { useState, useMemo } from 'react';
import PhotoCard from './PhotoCard';
import CategoryFilter from './CategoryFilter';
import PhotoLightbox from './PhotoLightbox';
import { Camera } from 'lucide-react';

// Types
// Types
interface PhotoItem {
    id: string;
    url: string;
    title: string;
    description: string;
    category: string;
    aspectRatio: 'square' | 'wide' | 'tall';
    views: number;
    likes: number;
    date: string;
    location: string;
    photographer: string;
    tags: string[];
    isFeatured?: boolean;
    isExclusive?: boolean;
}

// Sample Data
const allPhotos: PhotoItem[] = [
    {
        id: '1',
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
        title: 'दिपोत्सवाचे विहंगम दृश्य',
        description: 'रामकुंडावरील दिव्यांचा महासागर, भाविकांची अलोट गर्दी',
        category: 'उत्सव',
        aspectRatio: 'wide',
        views: 12500,
        likes: 845,
        date: '१३ जानेवारी २०२६',
        location: 'रामकुंड, नाशिक',
        photographer: 'राजेश पाटील',
        tags: ['उत्सव', 'राम मंदिर', 'दिव्य', 'भक्ती'],
        isFeatured: true,
        isExclusive: true
    },
    {
        id: '2',
        url: 'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg',
        title: 'द्राक्ष आणि दवबिंदू',
        description: 'नाशिकच्या द्राक्ष बागांमधील पहाटेचे मनमोहक दृश्य',
        category: 'निसर्ग',
        aspectRatio: 'square',
        views: 8920,
        likes: 620,
        date: '१२ जानेवारी २०२६',
        location: 'द्राक्ष बाग, नाशिक',
        photographer: 'प्रिया देशपांडे',
        tags: ['द्राक्ष', 'बाग', 'पहाट', 'निसर्ग']
    },
    {
        id: '3',
        url: 'https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg',
        title: 'इगतपुरीचे सौंदर्य',
        description: 'पावसाळ्यात धुक्यात हरवलेला निसर्ग',
        category: 'निसर्ग',
        aspectRatio: 'tall',
        views: 10450,
        likes: 721,
        date: '११ जानेवारी २०२६',
        location: 'इगतपुरी, नाशिक',
        photographer: 'विक्रम साळुंके',
        tags: ['पर्वत', 'धुके', 'पावसाळा', 'इगतपुरी']
    },
    {
        id: '4',
        url: 'https://static.vecteezy.com/system/resources/thumbnails/070/593/008/small/winter-night-in-urban-park-with-snow-and-soft-glow-of-lights-photo.jpeg',
        title: 'नाशिक सिटी लाइट्स',
        description: 'स्मार्ट सिटी अंतर्गत सुशोभित केलेले रस्ते',
        category: 'शहर',
        aspectRatio: 'square',
        views: 7560,
        likes: 512,
        date: '१० जानेवारी २०२६',
        location: 'नाशिक शहर',
        photographer: 'अनिल जाधव',
        tags: ['स्मार्ट सिटी', 'रस्ते', 'आधुनिक', 'विकास']
    },
    {
        id: '5',
        url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
        title: 'प्रगतीची नवी ओळख',
        description: 'नाशिकमधील प्रस्तावित आयटी पार्क',
        category: 'विकास',
        aspectRatio: 'wide',
        views: 11200,
        likes: 834,
        date: '९ जानेवारी २०२६',
        location: 'सातपूर, नाशिक',
        photographer: 'महेश शिंदे',
        tags: ['आयटी पार्क', 'विकास', 'रोजगार', 'प्रगती'],
        isExclusive: true
    },

];

const categories = ['सर्व', 'उत्सव', 'निसर्ग', 'शहर', 'विकास', 'पर्यटन', 'संस्कृती', 'हवामान', 'खाद्य'];

const PhotoGalleryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('सर्व');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const filteredPhotos = useMemo(() => {
        if (selectedCategory === 'सर्व') return allPhotos;
        return allPhotos.filter(photo => photo.category === selectedCategory);
    }, [selectedCategory]);

    const openLightbox = (index: number) => {
        setCurrentPhotoIndex(index);
        setLightboxOpen(true);
    };

    const handleNext = () => {
        setCurrentPhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
    };

    const handlePrev = () => {
        setCurrentPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200 pt-8 pb-8 mb-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4">
                        <div className="w-16 h-16 bg-lokmat-red/10 rounded-full flex items-center justify-center text-lokmat-red mb-2">
                            <Camera size={32} />
                        </div>
                        <h1 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
                            खबरनामा <span className="text-lokmat-red">फोटो गॅलरी</span>
                        </h1>
                        <p className="text-gray-500 font-medium">
                            नाशिक आणि परिसरातील महत्त्वाच्या घडामोडींचे, निसर्गाचे आणि संस्कृतीचे बोलके क्षणचित्रे..
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Filter */}
                <div className="flex justify-center mb-8">
                    <CategoryFilter
                        categories={categories}
                        activeCategory={selectedCategory}
                        onSelect={setSelectedCategory}
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
                    {filteredPhotos.map((photo, index) => (
                        <PhotoCard
                            key={photo.id}
                            id={photo.id}
                            url={photo.url}
                            title={photo.title}
                            description={photo.description}
                            category={photo.category}
                            aspectRatio={photo.aspectRatio}
                            onClick={() => openLightbox(index)}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredPhotos.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">या श्रेणीत सध्या कोणतेही फोटो उपलब्ध नाहीत.</p>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <PhotoLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                photo={filteredPhotos[currentPhotoIndex]}
                onNext={handleNext}
                onPrev={handlePrev}
            />
        </div>
    );
};

export default PhotoGalleryPage;


// components/photos/PhotoGalleryPage.tsx
// "use client";

// import React, { useState, useMemo, useEffect, useCallback } from 'react';
// import PhotoCard from './PhotoCard';
// import CategoryFilter from './CategoryFilter';
// import PhotoLightbox from './PhotoLightbox';
// import { Camera, TrendingUp, Clock, Grid3x3, LayoutGrid, Sparkles } from 'lucide-react';

// // Types
// interface PhotoItem {
//     id: string;
//     url: string;
//     title: string;
//     description: string;
//     category: string;
//     aspectRatio: 'square' | 'wide' | 'tall';
//     views: number;
//     likes: number;
//     date: string;
//     location: string;
//     photographer: string;
//     tags: string[];
//     isFeatured?: boolean;
//     isExclusive?: boolean;
// }

// // Extended Sample Data with more details
// const allPhotos: PhotoItem[] = [
//     {
//         id: '1',
//         url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
//         title: 'दिपोत्सवाचा अभूतपूर्व लखलखाट',
//         description: 'रामकुंडावरील दिव्यांचा महासागर, भाविकांच्या भक्तीने प्रकाशित संपूर्ण परिसर',
//         category: 'उत्सव',
//         aspectRatio: 'wide',
//         views: 12500,
//         likes: 845,
//         date: '१३ जानेवारी २०२६',
//         location: 'रामकुंड, नाशिक',
//         photographer: 'राजेश पाटील',
//         tags: ['उत्सव', 'राम मंदिर', 'दिव्य', 'भक्ती'],
//         isFeatured: true,
//         isExclusive: true
//     },
//     {
//         id: '2',
//         url: 'https://images.unsplash.com/photo-1596401057633-531035ef832a?auto=format&fit=crop&w-800&q=80',
//         title: 'सुवर्णिम द्राक्षांचे सुंदर संसार',
//         description: 'नाशिकच्या द्राक्ष बागांमधील पहाटेचे मनमोहक दृश्य, दवबिंदूंचे कलाकारी',
//         category: 'निसर्ग',
//         aspectRatio: 'square',
//         views: 8920,
//         likes: 620,
//         date: '१२ जानेवारी २०२६',
//         location: 'द्राक्ष बाग, नाशिक',
//         photographer: 'प्रिया देशपांडे',
//         tags: ['द्राक्ष', 'बाग', 'पहाट', 'निसर्ग']
//     },
//     {
//         id: '3',
//         url: 'https://images.unsplash.com/photo-1507367612148-cc12c4440026?auto=format&fit=crop&w=600&q=80',
//         title: 'धुक्यात हरवलेला इगतपुरी',
//         description: 'पावसाळ्यातील रहस्यमय धुक्याने व्यापलेला पर्वतीय प्रदेश',
//         category: 'निसर्ग',
//         aspectRatio: 'tall',
//         views: 10450,
//         likes: 721,
//         date: '११ जानेवारी २०२६',
//         location: 'इगतपुरी, नाशिक',
//         photographer: 'विक्रम साळुंके',
//         tags: ['पर्वत', 'धुके', 'पावसाळा', 'इगतपुरी']
//     },
//     {
//         id: '4',
//         url: 'https://images.unsplash.com/photo-1474487056217-76fe4540d6e6?auto=format&fit=crop&w=800&q=80',
//         title: 'नवीन नाशिकची चमक',
//         description: 'स्मार्ट सिटी प्रकल्पांतर्गत सुशोभित केलेले आधुनिक रस्ते',
//         category: 'शहर',
//         aspectRatio: 'square',
//         views: 7560,
//         likes: 512,
//         date: '१० जानेवारी २०२६',
//         location: 'नाशिक शहर',
//         photographer: 'अनिल जाधव',
//         tags: ['स्मार्ट सिटी', 'रस्ते', 'आधुनिक', 'विकास']
//     },
//     {
//         id: '5',
//         url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
//         title: 'प्रगतीची नवीन इमारत',
//         description: 'नाशिकमधील प्रस्तावित आयटी पार्कची भव्य रुपरेखा',
//         category: 'विकास',
//         aspectRatio: 'wide',
//         views: 11200,
//         likes: 834,
//         date: '९ जानेवारी २०२६',
//         location: 'सातपूर, नाशिक',
//         photographer: 'महेश शिंदे',
//         tags: ['आयटी पार्क', 'विकास', 'रोजगार', 'प्रगती'],
//         isExclusive: true
//     },
//     {
//         id: '6',
//         url: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=800&q=80',
//         title: 'गंगापूर धरणाचे भव्य दृश्य',
//         description: 'नाशिककरांचे आवडते पर्यटन स्थळ, संपूर्ण पाण्याने भरलेले धरण',
//         category: 'पर्यटन',
//         aspectRatio: 'square',
//         views: 9320,
//         likes: 645,
//         date: '८ जानेवारी २०२६',
//         location: 'गंगापूर धरण',
//         photographer: 'सुनील पवार',
//         tags: ['धरण', 'पर्यटन', 'पाणी', 'निसर्ग']
//     },
//     {
//         id: '7',
//         url: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=600&q=80',
//         title: 'ऐतिहासिक काकाळाराम मंदिर',
//         description: 'शतकानुशतके नाशिकच्या संस्कृतीचे रक्षण करणारे ऐतिहासिक मंदिर',
//         category: 'संस्कृती',
//         aspectRatio: 'tall',
//         views: 14500,
//         likes: 1023,
//         date: '७ जानेवारी २०२६',
//         location: 'काकाळाराम मंदिर',
//         photographer: 'रजनी पाटील',
//         tags: ['मंदिर', 'ऐतिहासिक', 'संस्कृती', 'वारसा'],
//         isFeatured: true
//     },
//     {
//         id: '8',
//         url: 'https://images.unsplash.com/photo-1504194569293-9c87895e6914?auto=format&fit=crop&w=800&q=80',
//         title: 'गुलाबी सूर्योदयाची सुंदरता',
//         description: 'हिवाळ्यातील नाशिकची एक प्रसन्न सकाळ, गुलाबी आभाळात उगवता येणारा सूर्य',
//         category: 'हवामान',
//         aspectRatio: 'square',
//         views: 6780,
//         likes: 489,
//         date: '६ जानेवारी २०२६',
//         location: 'गोदावरी घाट',
//         photographer: 'आनंद देशमुख',
//         tags: ['सूर्योदय', 'हिवाळा', 'सकाळ', 'गोदावरी']
//     },
//     {
//         id: '9',
//         url: 'https://images.unsplash.com/photo-1565552648557-8ba347395420?auto=format&fit=crop&w=1200&q=80',
//         title: 'नाशिकची जगप्रसिद्ध मिसळ',
//         description: 'रसाळ, मसालेदार आणि स्वादिष्ट नाशिकी मिसळचे मोहक दृश्य',
//         category: 'खाद्य',
//         aspectRatio: 'wide',
//         views: 15600,
//         likes: 1120,
//         date: '५ जानेवारी २०२६',
//         location: 'सरदार मिसळ भंडार',
//         photographer: 'विशाल कुलकर्णी',
//         tags: ['मिसळ', 'खाद्य', 'नाशिक स्पेशल', 'स्वाद'],
//         isFeatured: true
//     },
//     {
//         id: '10',
//         url: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=800&q=80',
//         title: 'गोदावरी नदीचा पवित्र प्रवाह',
//         description: 'कुंभमेळ्याच्या वेळी गोदावरी नदीचे पवित्र आणि शांत दृश्य',
//         category: 'पर्यटन',
//         aspectRatio: 'square',
//         views: 9870,
//         likes: 712,
//         date: '४ जानेवारी २०२६',
//         location: 'गोदावरी नदी',
//         photographer: 'रोहित शर्मा',
//         tags: ['गोदावरी', 'नदी', 'कुंभ', 'पवित्र']
//     },
//     {
//         id: '11',
//         url: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80',
//         title: 'पर्वतांच्या सावलीत विश्रांती',
//         description: 'ब्रह्मगिरी पर्वतरांगांच्या पायथ्याशी विश्रांती घेत असलेले ट्रेकर्स',
//         category: 'निसर्ग',
//         aspectRatio: 'tall',
//         views: 8340,
//         likes: 598,
//         date: '३ जानेवारी २०२६',
//         location: 'ब्रह्मगिरी पर्वत',
//         photographer: 'अजिंक्य भोसले',
//         tags: ['पर्वत', 'ट्रेकिंग', 'विश्रांती', 'निसर्ग']
//     },
//     {
//         id: '12',
//         url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
//         title: 'नाशिक वायुसेना तळाचा विमानांचा समूह',
//         description: 'वायुसेना दिनाच्या निमित्ताने विशेष प्रदर्शनासाठी एकत्र आलेले विमाने',
//         category: 'घटना',
//         aspectRatio: 'wide',
//         views: 16700,
//         likes: 1245,
//         date: '२ जानेवारी २०२६',
//         location: 'ओझर विमानतळ',
//         photographer: 'कपिल राठोड',
//         tags: ['वायुसेना', 'विमान', 'प्रदर्शन', 'दिनविशेष'],
//         isExclusive: true
//     }
// ];

// const categories = ['सर्व', 'उत्सव', 'निसर्ग', 'शहर', 'विकास', 'पर्यटन', 'संस्कृती', 'हवामान', 'खाद्य', 'घटना'];

// const PhotoGalleryPage = () => {
//     const [selectedCategory, setSelectedCategory] = useState<string>('सर्व');
//     const [lightboxOpen, setLightboxOpen] = useState(false);
//     const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
//     const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
//     const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');

//     const filteredPhotos = useMemo(() => {
//         let filtered = selectedCategory === 'सर्व'
//             ? allPhotos
//             : allPhotos.filter(photo => photo.category === selectedCategory);

//         // Apply sorting
//         switch (sortBy) {
//             case 'latest':
//                 filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
//                 break;
//             case 'popular':
//                 filtered = [...filtered].sort((a, b) => b.views - a.views);
//                 break;
//             case 'trending':
//                 filtered = [...filtered].sort((a, b) => b.likes - a.likes);
//                 break;
//         }

//         return filtered;
//     }, [selectedCategory, sortBy]);

//     const openLightbox = useCallback((index: number) => {
//         setCurrentPhotoIndex(index);
//         setLightboxOpen(true);
//         // Track view
//         if (filteredPhotos[index]) {
//             filteredPhotos[index].views += 1;
//         }
//     }, [filteredPhotos]);

//     const handleNext = () => {
//         setCurrentPhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
//     };

//     const handlePrev = () => {
//         setCurrentPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
//     };

//     // Featured photos (first 3 with isFeatured: true)
//     const featuredPhotos = useMemo(() =>
//         allPhotos.filter(photo => photo.isFeatured).slice(0, 3),
//         []
//     );

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 pb-20">
//             {/* Hero Header */}
//             <div className="relative overflow-hidden bg-gradient-to-r from-[#ed1b24] via-[#c1121c] to-[#800000] text-white">
//                 <div className="absolute inset-0 bg-black/20" />
//                 <div className="relative container mx-auto px-4 py-16 lg:py-24">
//                     <div className="max-w-4xl mx-auto text-center space-y-6">
//                         <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
//                             <Sparkles className="animate-pulse" />
//                             <span className="text-sm font-bold">विशेष फोटो गॅलरी</span>
//                         </div>

//                         <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
//                             <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
//                                 खबरनामा
//                             </span>{' '}
//                             <span className="block mt-2">फोटो गॅलरी</span>
//                         </h1>

//                         <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
//                             नाशिक आणि परिसरातील महत्त्वाच्या घडामोडींचे, निसर्गाचे आणि संस्कृतीचे जिवंत क्षणचित्रे
//                         </p>

//                         <div className="flex flex-wrap justify-center gap-4 pt-4">
//                             <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
//                                 <Camera size={18} />
//                                 <span className="text-sm font-medium">{allPhotos.length}+ फोटो</span>
//                             </div>
//                             <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
//                                 <TrendingUp size={18} />
//                                 <span className="text-sm font-medium">१.२ लाख+ दृश्ये</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Featured Section */}
//             {featuredPhotos.length > 0 && (
//                 <div className="container mx-auto px-4 py-8">
//                     <div className="flex items-center justify-between mb-6">
//                         <div className="flex items-center gap-3">
//                             <div className="w-2 h-8 bg-[#ed1b24] rounded-full" />
//                             <h2 className="text-2xl font-bold text-gray-900">विशेष निवड</h2>
//                         </div>
//                         <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                             संपादकीय निवड
//                         </span>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
//                         {featuredPhotos.map((photo, index) => (
//                             <div
//                                 key={photo.id}
//                                 onClick={() => openLightbox(allPhotos.findIndex(p => p.id === photo.id))}
//                                 className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[16/9]"
//                             >
//                                 <img
//                                     src={photo.url}
//                                     alt={photo.title}
//                                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
//                                 <div className="absolute bottom-0 left-0 right-0 p-6">
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <span className="bg-[#ed1b24] text-white text-xs px-2 py-1 rounded-full font-bold">
//                                             ⭐ विशेष
//                                         </span>
//                                         {photo.isExclusive && (
//                                             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
//                                                 🔒 एक्सक्लुझिव
//                                             </span>
//                                         )}
//                                     </div>
//                                     <h3 className="text-white text-xl font-bold line-clamp-2 mb-2">{photo.title}</h3>
//                                     <div className="flex items-center gap-3 text-white/80 text-sm">
//                                         <span>{photo.photographer}</span>
//                                         <span>•</span>
//                                         <span>{photo.location}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             <div className="container mx-auto px-4">
//                 {/* Controls Bar */}
//                 <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 sticky top-4 z-10 border border-gray-200">
//                     <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//                         <CategoryFilter
//                             categories={categories}
//                             activeCategory={selectedCategory}
//                             onSelect={setSelectedCategory}
//                         />

//                         <div className="flex items-center gap-4">
//                             {/* Sort Options */}
//                             <div className="flex items-center gap-2">
//                                 <span className="text-sm font-medium text-gray-600">क्रमवारी:</span>
//                                 <div className="flex bg-gray-100 rounded-lg p-1">
//                                     {[
//                                         { value: 'latest', label: 'नवीन', icon: <Clock size={16} /> },
//                                         { value: 'popular', label: 'लोकप्रिय', icon: <TrendingUp size={16} /> },
//                                         { value: 'trending', label: 'ट्रेंडिंग', icon: <Sparkles size={16} /> }
//                                     ].map((option) => (
//                                         <button
//                                             key={option.value}
//                                             onClick={() => setSortBy(option.value as any)}
//                                             className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${sortBy === option.value
//                                                 ? 'bg-white text-[#ed1b24] shadow-sm'
//                                                 : 'text-gray-600 hover:text-gray-900'
//                                                 }`}
//                                         >
//                                             {option.icon}
//                                             {option.label}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* View Toggle */}
//                             <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
//                                 <button
//                                     onClick={() => setViewMode('grid')}
//                                     className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100 text-[#ed1b24]' : 'text-gray-400 hover:text-gray-600'}`}
//                                 >
//                                     <LayoutGrid size={20} />
//                                 </button>
//                                 <button
//                                     onClick={() => setViewMode('masonry')}
//                                     className={`p-2 rounded ${viewMode === 'masonry' ? 'bg-gray-100 text-[#ed1b24]' : 'text-gray-400 hover:text-gray-600'}`}
//                                 >
//                                     <Grid3x3 size={20} />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Stats Bar */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//                     {[
//                         { label: 'एकूण फोटो', value: allPhotos.length, icon: '📸', color: 'from-blue-500 to-cyan-500' },
//                         { label: 'एकूण दृश्ये', value: '१.२ लाख+', icon: '👁️', color: 'from-green-500 to-emerald-500' },
//                         { label: 'श्रेण्या', value: categories.length - 1, icon: '🏷️', color: 'from-purple-500 to-pink-500' },
//                         { label: 'फोटोग्राफर्स', value: '१२+', icon: '👤', color: 'from-orange-500 to-yellow-500' }
//                     ].map((stat, index) => (
//                         <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
//                                     <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
//                                 </div>
//                                 <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
//                                     {stat.icon}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Photo Grid */}
//                 <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} auto-rows-[300px]`}>
//                     {filteredPhotos.map((photo, index) => (
//                         <PhotoCard
//                             key={photo.id}
//                             {...photo}
//                             onClick={() => openLightbox(index)}
//                         />
//                     ))}
//                 </div>

//                 {/* Empty State */}
//                 {filteredPhotos.length === 0 && (
//                     <div className="text-center py-16">
//                         <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
//                             <Camera size={40} className="text-gray-400" />
//                         </div>
//                         <h3 className="text-xl font-bold text-gray-700 mb-2">कोणतेही फोटो सापडले नाहीत</h3>
//                         <p className="text-gray-500 max-w-md mx-auto">
//                             "{selectedCategory}" श्रेणीत सध्या कोणतेही फोटो उपलब्ध नाहीत. कृपया दुसरी श्रेणी निवडा.
//                         </p>
//                     </div>
//                 )}

//                 {/* Load More Button */}
//                 {filteredPhotos.length > 0 && (
//                     <div className="text-center mt-12">
//                         <button className="px-8 py-3 bg-gradient-to-r from-[#ed1b24] to-[#c1121c] text-white rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300">
//                             अजून फोटो लोड करा
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* Photo Submission CTA */}
//             <div className="mt-16 bg-gradient-to-r from-[#800000] to-[#ed1b24] text-white rounded-2xl mx-4 md:mx-0">
//                 <div className="container mx-auto px-6 py-8 md:py-12">
//                     <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                         <div className="text-center md:text-left">
//                             <h3 className="text-2xl font-bold mb-2">तुमचे फोटो सबमिट करा</h3>
//                             <p className="text-white/90 max-w-xl">
//                                 तुमच्या छायाचित्रांच्या मदतीने नाशिकची सुंदरता जगासमोर आणा. निवडक फोटो आमच्या वेबसाइटवर प्रकाशित केले जातील.
//                             </p>
//                         </div>
//                         <button className="bg-white text-[#ed1b24] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors whitespace-nowrap">
//                             📸 फोटो सबमिट करा
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Lightbox */}
//             <PhotoLightbox
//                 isOpen={lightboxOpen}
//                 onClose={() => setLightboxOpen(false)}
//                 photo={filteredPhotos[currentPhotoIndex]}
//                 onNext={handleNext}
//                 onPrev={handlePrev}
//             />
//         </div>
//     );
// };

// export default PhotoGalleryPage;