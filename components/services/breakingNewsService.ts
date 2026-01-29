import instance from "./instance";

/* ---------------- TYPES ---------------- */

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

/* ---------------- API CALL ---------------- */

/**
 * Get LIVE breaking news (for scrolling ticker)
 * Backend route: GET /api/v1/breaking/live
 * Public route (no auth required)
 */
export const getAllBreakingNews = async (): Promise<BreakingNewsResponse> => {
    try {
        const res = await instance.get("/api/v1/breaking/live");

        if (res.data && res.data.success) {
            return res.data;
        }

        return {
            statusCode: res.data?.statusCode || 500,
            success: false,
            message: res.data?.message || "Invalid response from server",
            data: [],
            error: res.data?.error || null,
        };
    } catch (error: any) {
        if (error.response?.status === 401) {
            console.warn("Unauthorized access to breaking news");

            return {
                statusCode: 401,
                success: false,
                message: "Unauthorized",
                data: [],
                error: "Access denied",
            };
        }

        console.warn("Failed to fetch live breaking news (handled):", error.message || error);

        return {
            statusCode: error.response?.status || 500,
            success: false,
            message: "Failed to fetch breaking news",
            data: [],
            error: error.message || error,
        };
    }
};
