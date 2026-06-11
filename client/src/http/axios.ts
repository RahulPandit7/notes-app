import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,

    headers: {
        "Content-Type": "application/json",
    },

    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized — clearing stale session");

            localStorage.removeItem("access_token");
            localStorage.removeItem("user");

            if (typeof window !== "undefined") {
                window.dispatchEvent(
                    new CustomEvent("auth:unauthorized")
                );
            }
        }

        if (error.response?.status === 500) {
            console.error("Server Error");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;