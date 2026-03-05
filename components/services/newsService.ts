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

export interface QuoteImage {
  folderName: string;
  fileName: string;
  fullImgName: string;
  fileExtension: string;
  fullS3URL: string;
  cdnUrl: string;
  size: number;
}

export interface Quote {
  text: string;
  name: string;
  quoteImage?: QuoteImage;
}

export interface News {
  _id: string;
  title: string;
  slug: string;
  tags: string[];
  category: string;
  reporterName: string;
  shortDescription?: string;
  content: string;
  image?: NewsImage;
  quotes?: Quote[];
  createdAt: string;
  views?: number;
}





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
    return [];
  }
};

// Get news filtered by tag
export const getNewsByTag = async (tag: string): Promise<News[]> => {
  try {
    const res = await instance.get("/api/v1/news/all", { params: { tags: tag } });
    if (res.data?.success && res.data?.data) return res.data.data;

    const fallback = await instance.get("/api/v1/news", { params: { tags: tag } });
    return fallback.data?.data || [];
  } catch (error: any) {
    console.warn("Tag news fetch issue (handled):", error.message || error);
    return [];
  }
};

export const getNewsById = async (id: string): Promise<News | null> => {
  if (!id) return null;

  try {

    const res = await instance.get(`/api/v1/news/${id}`);
    if (res.data?.success && res.data?.data) return res.data.data;


    const resAlt = await instance.get(`/api/v1/news/id/${id}`);
    if (resAlt.data?.success && resAlt.data?.data) return resAlt.data.data;


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

export const incrementNewsViews = async (id: string): Promise<void> => {
  if (!id) return;
  try {
    await instance.put(`/api/v1/news/views/${id}`);
  } catch (error: any) {
    if (error.response?.status !== 401) {
      console.warn(`Error incrementing views for news ${id} (handled):`, error.message || error);
    }
  }
};
