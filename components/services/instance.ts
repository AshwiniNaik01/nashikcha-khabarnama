import axios from "axios";


export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const instance = axios.create({
    baseURL: API_BASE_URL,
});

export default instance;


export const DIR = {

    GalleryPhoto: `${API_BASE_URL}/uploads/Gallery/`,
};