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
    const tryEndpoints = ["/api/v1/gallery", "/api/v1/gallery/all"];

    for (const endpoint of tryEndpoints) {
        try {
            const res = await instance.get(endpoint);
            if (res.data && res.data.success) return res.data;
        } catch (error) {
            if (endpoint === tryEndpoints[tryEndpoints.length - 1]) {
                console.error("Gallery fetch failed:", error);
            }
        }
    }

    return { success: false, data: [], message: "Failed to fetch gallery" };
};

// इमेजचा पूर्ण पाथ मिळवण्यासाठी हेल्पर
export const getGalleryImageUrl = (photoName: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    return `${baseUrl}/uploads/Gallery/${photoName}`;
};