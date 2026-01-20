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
    <div className="pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 py-8 mb-8">
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

      <div>
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
              onClick={() => {
                setCurrentPhotoIndex(index);
                setLightboxOpen(true);
              }}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              या श्रेणीत सध्या कोणतेही फोटो उपलब्ध नाहीत.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <PhotoLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={filteredPhotos}
        initialIndex={currentPhotoIndex}
      />
    </div>

  );
};

export default PhotoGalleryPage;


