import instance from "./instance";

/* ================== DATA TYPE ================== */
export interface ApiRashi {
    _id: string;
    rashi: string;
    tatva: string;
    currentDate: string;

    kalavadi: string;
    description: string;
    bhagyank: string;
    subh_ranga: string;
    julni: string;
    akshar: string;
    subh_graha: string;
    prem_ani_natesambandh: string;
    kariyar_ani_shikshan: string;
    arthik_stiti: string;
    arogya: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

/* ================== RESPONSES ================== */
export interface ApiRashiListResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: ApiRashi[];
    error: any;
}

export interface ApiRashiSingleResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: ApiRashi;
    error: any;
}

/* ================== API CALLS ================== */

export const getAllRashi = async (
    date?: string
): Promise<ApiRashiListResponse> => {

    const res = await instance.get("/api/v1/rashi/filtered", {
        params: date ? { date } : {},
    });

    return res.data;
};


export const getRashiById = async (id: string): Promise<ApiRashiSingleResponse> => {

    const res = await instance.get(`/api/v1/rashi/id/${id}`);
    return res.data;
};