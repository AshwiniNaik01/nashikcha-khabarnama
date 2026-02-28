import instance from "./instance";
export interface ApiGalleryItem {
  _id: string;
  title: string;
  photo: GalleryPhoto;
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
  updatedAt?: string;
}

export interface GalleryPhoto {
  folderName: string;
  fileName: string;
  fullImgName: string;
  fileExtension: string;
  fullS3URL?: string;
  cdnUrl?: string;
  size?: number;
}

export interface GalleryResponse {
  success: boolean;
  data: ApiGalleryItem[];
  message: string;
}

export interface GalleryActionResponse {
  success: boolean;
  data: ApiGalleryItem;
  message: string;
  statusCode?: number;
}

export const getAllGalleryItems = async (): Promise<GalleryResponse> => {
  const tryEndpoints = ["/api/v1/gallery/all"];

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


// Like API call
export const likeGalleryItem = async (id: string): Promise<GalleryActionResponse> => {
  try {
    const res = await instance.put(`/api/v1/gallery/${id}/like`);
    return res.data;
  } catch (error) {
    console.error("Error liking gallery item:", error);
    throw error;
  }
};

// View API call
export const viewGalleryItem = async (id: string): Promise<GalleryActionResponse> => {
  try {
    const res = await instance.put(`/api/v1/gallery/${id}/view`);
    return res.data;
  } catch (error) {
    console.error("Error updating views:", error);
    throw error;
  }
};


export const getGalleryImageUrl = (photo: {
  cdnUrl?: string;
  fullS3URL?: string;
  fullImgName?: string;
}) => {
  if (photo?.cdnUrl) return photo.cdnUrl;
  if (photo?.fullS3URL) return photo.fullS3URL;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return photo?.fullImgName ? `${baseUrl}/${photo.fullImgName}` : "";
};
