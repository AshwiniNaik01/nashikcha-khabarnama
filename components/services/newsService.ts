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

export interface PaginationMeta {
  totalNews: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface PaginatedNewsResponse {
  news: News[];
  pagination: PaginationMeta;
}

import { getCategoryValue } from "@/components/constants/categories";

// Get all news (page 1, 20 items) — used by home page sliders
export const getAllNews = async (
  category?: string
): Promise<News[]> => {
  const apiCategory = category ? getCategoryValue(category) : undefined;
  const params: Record<string, any> = { page: 1, limit: 20 };
  if (apiCategory) params.category = apiCategory;

  try {
    const res = await instance.get("/api/v1/news/all", { params });

    // Actual API shape: { success: true, data: { news: [...], pagination: {...} } }
    if (res.data?.success && res.data?.data?.news && Array.isArray(res.data.data.news)) {
      return res.data.data.news;
    }

    // Old flat shape: { success: true, data: [...] }
    if (res.data?.success && Array.isArray(res.data?.data)) {
      return res.data.data;
    }

    // Fallback endpoint
    const fallbackRes = await instance.get("/api/v1/news", { params });
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

// Paginated news — used by category pages for infinite scroll
export const getNewsPaginated = async ({
  category,
  page = 1,
  limit = 20,
}: {
  category?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedNewsResponse> => {
  const apiCategory = category ? getCategoryValue(category) : undefined;
  const params: Record<string, any> = { page, limit };
  if (apiCategory) params.category = apiCategory;

  const empty: PaginatedNewsResponse = {
    news: [],
    pagination: { totalNews: 0, currentPage: page, totalPages: 0, hasNextPage: false },
  };

  try {
    const res = await instance.get("/api/v1/news/all", { params });

    // Actual API shape: { success: true, data: { news: [...], pagination: {...} } }
    if (res.data?.success && res.data?.data?.news && res.data?.data?.pagination) {
      return { news: res.data.data.news, pagination: res.data.data.pagination };
    }

    // Old flat shape — wrap it so callers always get the same structure
    if (res.data?.success && Array.isArray(res.data?.data)) {
      const data: News[] = res.data.data;
      return {
        news: data,
        pagination: {
          totalNews: data.length,
          currentPage: page,
          totalPages: 1,
          hasNextPage: false,
        },
      };
    }

    return empty;
  } catch (error: any) {
    if (error.response?.status !== 401) {
      console.warn("Paginated news fetch issue (handled):", error.message || error);
    }
    return empty;
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
