import instance from "./instance";

/* ================== DATA TYPES ================== */

export interface WeeklySign {
    signName: string;
    signTitle: string;
    prediction: string;
    luckyDates: string;
    womenTip: string;
    _id: string;
}

export interface WeeklyHoroscope {
    _id: string;
    weekRange: string;
    startDate: string;
    endDate: string;
    signs: WeeklySign[];
    adminId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

/* ================== RESPONSES ================== */

export interface WeeklyHoroscopeResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: WeeklyHoroscope;
    error: any;
}

/* ================== API CALLS ================== */

/**
 * Fetch the latest weekly horoscope from the API.
 * Endpoint: /api/v1/horoscope/latest
 */
export const getLatestWeeklyHoroscope = async (): Promise<WeeklyHoroscopeResponse> => {
    const res = await instance.get("/api/v1/horoscope/latest");
    return res.data;
};
