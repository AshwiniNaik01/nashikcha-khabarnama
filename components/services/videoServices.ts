import instance from "./instance";

/* ─────────────────────────────────────────────────────────────────────────────
   INTERFACES  — matches real API response
───────────────────────────────────────────────────────────────────────────── */

export interface ApiVideoItem {
    _id: string;
    title: string;
    category: string;
    videoUrl: string;        // YouTube embed URL
    description?: string;   // HTML string
    priority?: number;
    status?: "Active" | "Inactive";
    publishDate?: string;
    createdAt: string;
    updatedAt?: string;
    __v?: number;
}

export interface VideoResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: ApiVideoItem[];
    error: string | null;
}

export interface SingleVideoResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: ApiVideoItem;
    error: string | null;
}

/* ─────────────────────────────────────────────────────────────────────────────
   HELPER — extract YouTube thumbnail from embed/watch/short URL
───────────────────────────────────────────────────────────────────────────── */

export const getYoutubeThumbnail = (videoUrl: string): string => {
    const embedMatch = videoUrl.match(/youtube\.com\/embed\/([^?&]+)/);
    const watchMatch = videoUrl.match(/[?&]v=([^&]+)/);
    const shortMatch = videoUrl.match(/youtu\.be\/([^?&]+)/);
    const id = embedMatch?.[1] ?? watchMatch?.[1] ?? shortMatch?.[1];
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};

/* ─────────────────────────────────────────────────────────────────────────────
   API FUNCTIONS  (user-facing only)
───────────────────────────────────────────────────────────────────────────── */

const API_URL = "/api/v1/videos";

/**
 * Fetch all videos — tries /all first, falls back to /
 */
export const getAllVideos = async (): Promise<VideoResponse> => {
    const tryEndpoints = [`${API_URL}/all`, `${API_URL}/`];

    for (const endpoint of tryEndpoints) {
        try {
            const res = await instance.get(endpoint);
            if (res.data?.success) return res.data;
        } catch (error) {
            if (endpoint === tryEndpoints[tryEndpoints.length - 1]) {
                console.error("Videos fetch failed:", error);
            }
        }
    }

    return { statusCode: 500, success: false, data: [], message: "Failed to fetch videos", error: null };
};

/**
 * Fetch a single video by ID
 */
export const getVideoById = async (id: string): Promise<SingleVideoResponse> => {
    try {
        const res = await instance.get(`${API_URL}/${id}`);
        if (res.data?.success) return res.data;
    } catch (error) {
        console.error(`Video fetch failed for id ${id}:`, error);
    }
    return { statusCode: 500, success: false, data: {} as ApiVideoItem, message: "Failed to fetch video", error: null };
};