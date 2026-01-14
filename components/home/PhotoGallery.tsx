"use client";

import React from 'react';
import { Camera, Maximize2, MoveRight } from 'lucide-react';

interface PhotoItem {
    id: string;
    url: string;
    title: string;
    description: string;
    aspectRatio: 'square' | 'wide' | 'tall';
}

const photos: PhotoItem[] = [
    {
        id: 'p1',
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
        title: 'नाशिकचा सुवर्ण काळ',
        description: 'रामकुंडावरील दीपोत्सवाचे मनमोहक दृश्य',
        aspectRatio: 'wide'
    },
    {
        id: 'p2',
        url: 'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg',
        title: 'हिरवेगार शिवार',
        description: 'द्राक्ष मळ्यातील प्रसन्न सकाळ',
        aspectRatio: 'square'
    },
    {
        id: 'p3',
        url: 'https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg',
        title: 'धुक्यातील इगतपुरी',
        description: 'सह्याद्रीच्या रांगांत पसरलेले धुके',
        aspectRatio: 'tall'
    },
    {
        id: 'p4',
        url: 'https://static.vecteezy.com/system/resources/thumbnails/070/593/008/small/winter-night-in-urban-park-with-snow-and-soft-glow-of-lights-photo.jpeg',
        title: 'रोषणाईने नटलेले शहर',
        description: 'स्मार्ट सिटी नाशिकचे रात्रीचे दृश्य',
        aspectRatio: 'square'
    },
    {
        id: 'p5',
        url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
        title: 'भविष्यातील प्रगती',
        description: 'नाशिकमधील आयटी हबची नवी इमारत',
        aspectRatio: 'wide'
    }
];

export default function PhotoGallery() {
    return (
        <section className="my-20 bg-gradient-to-b from-neutral-900 to-neutral-600 rounded-xl overflow-hidden shadow-2xl border border-white/5 p-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white">
                        <Camera size={20} className="animate-bounce" />
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Visual Stories</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-white text-white leading-none">द खबरनामा <br /><span className="text-lokmat-red underline decoration-4 underline-offset-8">गॅलरी</span></h2>
                </div>
                <button className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-lokmat-red transition-all group">
                    सर्व फोटो पाहा
                    <MoveRight className="group-hover:translate-x-2 transition-transform" />
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
                {/* Photo 1: Wide Featured */}
                <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-3xl cursor-pointer">
                    <img src={photos[0].url} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-white text-2xl font-black mb-2">{photos[0].title}</h3>
                        <p className="text-white/80 text-sm font-medium">{photos[0].description}</p>
                        <div className="mt-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                            <Maximize2 size={20} />
                        </div>
                    </div>
                </div>

                {/* Photo 2: Square */}
                <div className="col-span-2 md:col-span-1 row-span-1 group relative overflow-hidden rounded-3xl cursor-pointer">
                    <img src={photos[1].url} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-lokmat-red/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-black uppercase text-[10px] tracking-widest border border-white/40 px-3 py-1 bg-black/20 backdrop-blur-sm">पाहण्यासाठी क्लिक करा</span>
                    </div>
                </div>

                {/* Photo 3: Tall / Side */}
                <div className="col-span-1 md:col-span-1 row-span-2 group relative overflow-hidden rounded-3xl cursor-pointer">
                    <img src={photos[2].url} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent p-6 text-white">
                        <h3 className="text-lg font-black leading-tight drop-shadow-lg">{photos[2].title}</h3>
                    </div>
                </div>

                {/* Photo 4: Small Square */}
                <div className="col-span-1 md:col-span-1 row-span-1 group relative overflow-hidden rounded-3xl cursor-pointer">
                    <img src={photos[3].url} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="" />
                </div>

                {/* Photo 5: Wide Bottom */}
                {/* <div className="col-span-2 md:col-span-1 row-span-1 group relative overflow-hidden rounded-3xl cursor-pointer bg-lokmat-red flex flex-col items-center justify-center text-center p-6 hover:bg-lokmat-maroon transition-colors">
                    <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center mb-4">
                        <Camera className="text-white" size={28} />
                    </div>
                    <h3 className="text-white font-black text-sm uppercase leading-tight tracking-tighter">आमच्यासाठी फोटो <br />पाठवा</h3>
                </div> */}
            </div>
        </section>
    );
}
