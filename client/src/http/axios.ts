import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",

    headers: {
        "Content-Type": "application/json",
    },

    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

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
            console.error("Unauthorized");

            // future logout logic
        }

        if (error.response?.status === 500) {
            console.error("Server Error");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;