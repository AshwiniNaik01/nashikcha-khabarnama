import instance from "./instance";

export interface ApiBreakingNews {
    _id: string;
    headline: string;
    category: string;
    priority: number;
    startTime: string;
    endTime: string;
    isPushNotificationSent: boolean;
    status: "Active" | "Expired" | "Scheduled";
    createdAt: string;
    updatedAt: string;
}

export interface BreakingNewsResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: ApiBreakingNews[];
    error: any;
}


export const getAllBreakingNews = async (): Promise<BreakingNewsResponse> => {
    const res = await instance.get("/api/v1/breaking");
    return res.data;
};