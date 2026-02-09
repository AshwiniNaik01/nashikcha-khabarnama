// "use client";

// import React, { useState, useEffect, useMemo } from 'react';
// import PhotoCard from './PhotoCard';
// import CategoryFilter from './CategoryFilter';
// import PhotoLightbox from './PhotoLightbox';
// import { Camera, Loader2 } from 'lucide-react';
// import { getAllGalleryItems, ApiGalleryItem } from '@/components/services/galleryServices';
// import { DIR } from '@/components/services/instance';

// const categories = ['सर्व', 'Devotional', 'nature', 'Politics', 'Weather', 'Culture', 'Tourism'];

// const PhotoGalleryPage = () => {
//   const [photos, setPhotos] = useState<ApiGalleryItem[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>('सर्व');
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Fetch Data from API
//   useEffect(() => {
//     const fetchPhotos = async () => {
//       try {
//         setLoading(true);
//         const response = await getAllGalleryItems();
//         if (response.success) {
//           setPhotos(response.data);
//         }
//       } catch (error) {
//         console.error("गॅलरी लोड करताना त्रुटी:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPhotos();
//   }, []);

//   // Filter Logic
//   const filteredPhotos = useMemo(() => {
//     if (selectedCategory === 'सर्व') return photos;
//     return photos.filter(photo =>
//       photo.category.toLowerCase() === selectedCategory.toLowerCase()
//     );
//   }, [selectedCategory, photos]);

//   if (loading) {
//     return (
//       <div className="h-96 flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-red-600" size={40} />
//         <p className="text-gray-500 font-bold">गॅलरी उघडत आहे...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="pb-20">
//       {/* Header Section - Kept exact same UI as original */}
//       <div className="bg-white border-b border-gray-100 py-8 mb-8">
//         <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4">
//           <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-2">
//             <Camera size={32} />
//           </div>
//           <h1 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
//             खबरनामा <span className="text-red-600">फोटो गॅलरी</span>
//           </h1>
//           <p className="text-gray-500 font-medium">
//             नासिक आणि परिसरातील महत्त्वाच्या घडामोडींचे, निसर्गाचे आणि संस्कृतीचे बोलके क्षणचित्रे..
//           </p>
//         </div>
//       </div>

//       <div className="container mx-auto px-4">
//         {/* Filter Section */}
//         <div className="flex justify-center mb-8 overflow-x-auto pb-2">
//           <CategoryFilter
//             categories={categories}
//             activeCategory={selectedCategory}
//             onSelect={setSelectedCategory}
//           />
//         </div>

//         {/* Photo Grid - Kept exact same grid layout and gap */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
//           {filteredPhotos.map((photo, index) => (
//             <PhotoCard
//               key={photo._id}
//               id={photo._id}
//               url={`${DIR.GalleryPhoto}${photo.photo}`}
//               title={photo.title}
//               description={photo.description || ""}
//               category={photo.category}
//               aspectRatio="square" // Maintaining original UI aspect ratio
//               onClick={() => {
//                 setCurrentPhotoIndex(index);
//                 setLightboxOpen(true);
//               }}
//             />
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredPhotos.length === 0 && (
//           <div className="text-center py-20">
//             <p className="text-gray-400 text-lg">
//               या श्रेणीत सध्या कोणतेही फोटो उपलब्ध नाहीत.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Lightbox Integration */}
//       {/* Lightbox Integration */}
//       {filteredPhotos.length > 0 && (
//         <PhotoLightbox
//           isOpen={lightboxOpen}
//           onClose={() => setLightboxOpen(false)}
//           photos={filteredPhotos.map(p => ({
//             // ✅ Explicitly spreading and mapping to match the 'Photo' interface
//             ...p,
//             id: p._id,
//             url: `${DIR.GalleryPhoto}${p.photo}`,
//             // ✅ Fix: If description is undefined/null, provide an empty string
//             description: p.description || "",
//             // Ensure other fields match the expected Photo type if necessary
//             aspectRatio: "square" as const
//           }))}
//           initialIndex={currentPhotoIndex}
//         />
//       )}
//     </div>
//   );
// };

// export default PhotoGalleryPage;


"use client";

import React, { useState, useEffect, useMemo } from 'react';
import PhotoCard from './PhotoCard';
import CategoryFilter from './CategoryFilter';
import PhotoLightbox from './PhotoLightbox';
import { Camera, Loader2 } from 'lucide-react';
import { getAllGalleryItems, ApiGalleryItem } from '@/components/services/galleryServices';

const categories = ['सर्व', 'Devotional', 'nature', 'Politics', 'Weather', 'Culture', 'Tourism'];

const PhotoGalleryPage = () => {
  const [photos, setPhotos] = useState<ApiGalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('सर्व');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Data from API
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await getAllGalleryItems();
        if (response.success) {
          setPhotos(response.data);
        }
      } catch (error) {
        console.error("गॅलरी लोड करताना त्रुटी:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // Filter Logic
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'सर्व') return photos;
    return photos.filter(photo =>
      photo.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory, photos]);

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-red-600" size={40} />
        <p className="text-gray-500 font-bold">गॅलरी उघडत आहे...</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-8 mb-8">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-2">
            <Camera size={32} />
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
            खबरनामा <span className="text-red-600">फोटो गॅलरी</span>
          </h1>
          <p className="text-gray-500 font-medium">
            नाशिक आणि परिसरातील महत्त्वाच्या घडामोडींचे, निसर्गाचे आणि संस्कृतीचे बोलके क्षणचित्रे..
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Filter */}


        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <PhotoCard
              key={photo._id}
              id={photo._id}
              url={photo.photo.cdnUrl || ""} // ✅ Use CDN first
              title={photo.title}
              description={photo.description || ""}
              category={photo.category}
              aspectRatio="square"
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
      {filteredPhotos.length > 0 && (
        <PhotoLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          photos={filteredPhotos.map(p => ({
            ...p,
            id: p._id,
            url: p.photo.cdnUrl || p.photo.fullS3URL || "",
            description: p.description || "",
            aspectRatio: "square" as const
          }))}
          initialIndex={currentPhotoIndex}
        />
      )}
    </div>
  );
};

export default PhotoGalleryPage;
