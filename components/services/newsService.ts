import instance from "./instance";
import { API_BASE_URL } from "./instance";

export const NEWS_IMAGE_BASE_URL = `${API_BASE_URL}/uploads/News/`;

/* ---------------- TYPES ---------------- */

export interface NewsImage {
  folderName: string;
  fileName: string;
  fullImgName: string;
  fileExtension: string;
  fullS3URL: string;
  cdnUrl: string;
  size: number;
}

export interface News {
  _id: string;
  title: string;
  slug: string;
  category: string;
  reporterName: string;
  shortDescription?: string;
  content: string;
  image?: NewsImage;
  createdAt: string;
}

/* ---------------- API CALLS ---------------- */

// Get all news
// export const getAllNews = async (): Promise<News[]> => {
//   const res = await instance.get("/api/v1/news");
//   return res.data.data; // because sendResponse wraps data
// };


import { getCategoryValue } from "@/components/constants/categories";

// Get all news (optionally by category)
export const getAllNews = async (
  category?: string
): Promise<News[]> => {
  // Always convert to English slug for the API (e.g., "व्हिडीओ" -> "videos")
  const apiCategory = category ? getCategoryValue(category) : undefined;
  const config = { params: apiCategory ? { category: apiCategory } : {} };

  try {
    // Try primary endpoint
    const res = await instance.get("/api/v1/news/all", config);
    if (res.data?.success && res.data?.data) return res.data.data;

    // If not successful, try fallback immediately
    const fallbackRes = await instance.get("/api/v1/news", config);
    return fallbackRes.data?.data || [];

  } catch (error: any) {
    if (error.response?.status === 401) {
      console.warn("Authentication failed on public news route. Returning empty list.");
    } else {
      console.warn("News fetch issue (handled):", error.message || error);
    }
    return []; // Never throw, always return empty list to UI
  }
};


// Get single news by ID
export const getNewsById = async (id: string): Promise<News | null> => {
  if (!id) return null;

  try {
    // 1. Try primary ID endpoint
    const res = await instance.get(`/api/v1/news/${id}`);
    if (res.data?.success && res.data?.data) return res.data.data;

    // 2. Try alternative ID endpoint
    const resAlt = await instance.get(`/api/v1/news/id/${id}`);
    if (resAlt.data?.success && resAlt.data?.data) return resAlt.data.data;

    // 3. Last resort: search in all news
    console.info(`Specific fetch for ${id} returned no data. Searching in comprehensive list...`);
    const all = await getAllNews();
    return all.find(n => n._id === id) || null;

  } catch (error: any) {
    if (error.response?.status !== 401) {
      console.warn(`Error fetching news ${id} (handled):`, error.message || error);
    }
    return null;
  }
};
