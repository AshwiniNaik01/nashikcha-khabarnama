"use client";

import React, { useState, useEffect, useMemo } from 'react';
import PhotoCard from './PhotoCard';
import PhotoLightbox from './PhotoLightbox';
import { Camera, Loader2 } from 'lucide-react';
import { getAllGalleryItems, ApiGalleryItem } from '@/components/services/galleryServices';

const PhotoGalleryPage = () => {
  const [photos, setPhotos] = useState<ApiGalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('सर्व');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await getAllGalleryItems();
        if (response.success) setPhotos(response.data);
      } catch (error) {
        console.error("त्रुटी:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'सर्व') return photos;
    return photos.filter(photo => photo.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory, photos]);

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-red-600" size={40} />
      <p className="text-gray-500 font-bold">गॅलरी उघडत आहे...</p>
    </div>
  );

  return (
    <div className="pb-20">
      <div className="bg-white border-b border-gray-100 py-8 mb-8 text-center">
        <Camera size={32} className="mx-auto text-red-600 mb-2" />
        <h1 className="text-2xl lg:text-3xl font-black text-gray-900">
          खबरनामा <span className="text-red-600">फोटो गॅलरी</span>
        </h1>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <PhotoCard
              key={photo._id}
              id={photo._id}
              url={photo.photo.cdnUrl || ""}
              title={photo.title}
              description={photo.description || ""}
              category={photo.category}
              location={photo.location} // पास केले
              onClick={() => {
                setCurrentPhotoIndex(index);
                setLightboxOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {filteredPhotos.length > 0 && (
        <PhotoLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          photos={filteredPhotos.map(p => ({
            id: p._id,
            url: p.photo.cdnUrl || p.photo.fullS3URL || "",
            title: p.title,
            description: p.description || "",
            category: p.category,
            views: p.views,
            likes: p.likes,
            date: p.date,
            location: p.location,
            photographer: p.photographerName,
            tags: p.tags,
          }))}
          initialIndex={currentPhotoIndex}
        />
      )}
    </div>
  );
};

export default PhotoGalleryPage;