import instance from "./instance";

export interface AdPhoto {
  folderName: string;
  fileName: string;
  fullImgName: string;
  fileExtension: string;
  fullS3URL?: string;
  cdnUrl?: string;
  size?: number;
}

export interface Advertisement {
  _id: string;
  title: string;
  image: AdPhoto;
  category: string[];
  position:
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "in-between"
  | "sticky-right"
  | "sticky-left";
  displayDuration: number;
  link?: string;
  isActive: boolean;
  startDateTime: string;
  endDateTime: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AdResponse {
  success: boolean;
  data: Advertisement[];
  message: string;
}

export const getAdsByCategory = async (
  category: string,
): Promise<AdResponse> => {
  try {
    const res = await instance.get(
      `/api/v1/advertisement/category/${category}`,
    );
    if (res.data && res.data.success) {
      return res.data;
    }
    return { success: false, data: [], message: res.data.message || "Failed" };
  } catch (error) {
    console.error(`Ads fetch failed for category ${category}:`, error);
    return { success: false, data: [], message: "Server Error" };
  }
};

export const getAllAds = async (): Promise<Advertisement[]> => {
  try {
    const res = await instance.get("/api/v1/advertisement/category/all");
    return res.data.data || [];
  } catch (error) {
    console.warn("Failed to fetch all ads:", error);
    return [];
  }
};



export const getAdImageUrl = (image: AdPhoto | undefined | null) => {
  if (!image) return "";

  if (image.cdnUrl) return image.cdnUrl;

  if (image.fullS3URL) return image.fullS3URL;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1630";
  return image.fullImgName ? `${baseUrl}/${image.fullImgName}` : "";
};
