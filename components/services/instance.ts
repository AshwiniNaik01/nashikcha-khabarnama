import axios from "axios";


export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const instance = axios.create({
    baseURL: API_BASE_URL,
});

// Add a request interceptor to include the auth token
instance.interceptors.request.use(
    (config) => {
        // Check if we are in a browser environment
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token"); // Adjusted to common key 'token'
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If we get a 401 and we haven't already retried this request
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (typeof window !== "undefined") {
                console.warn("Unauthorized session detected. Clearing credentials...");
                localStorage.removeItem("token");
            }

            // If the original request had an Authorization header, try retrying without it
            // This allows public routes to succeed even if the session was invalid
            if (originalRequest.headers.Authorization) {
                console.info("Retrying request without credentials...");
                delete originalRequest.headers.Authorization;
                return instance(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;


export const DIR = {

    GalleryPhoto: `${API_BASE_URL}/uploads/Gallery/`,
};