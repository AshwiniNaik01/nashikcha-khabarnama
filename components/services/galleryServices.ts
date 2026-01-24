import instance from "./instance";

export interface ApiGalleryItem {
    _id: string;
    title: string;
    photo: string;
    category: string;
    description?: string;
    location?: string;
    photographerName?: string;
    date: string;
    tags: string[];
    views: number;
    likes: number;
    shares: number;
    createdAt: string;
}

export interface GalleryResponse {
    success: boolean;
    data: ApiGalleryItem[];
    message: string;
}

// गॅलरी डेटा मिळवण्यासाठी फंक्शन
export const getAllGalleryItems = async (): Promise<GalleryResponse> => {
    const res = await instance.get("/api/v1/gallery");
    return res.data;
};

// इमेजचा पूर्ण पाथ मिळवण्यासाठी हेल्पर
export const getGalleryImageUrl = (photoName: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    return `${baseUrl}/uploads/Gallery/${photoName}`;
};