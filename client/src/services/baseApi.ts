import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axiosInstance from "../http/axios";


type AxiosBaseQueryArgs = {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    data?: any;
    params?: any;
};

type AxiosBaseQueryError = {
    status?: number;
    data?: any;
};

const axiosBaseQuery =
    (): BaseQueryFn<
        AxiosBaseQueryArgs,
        unknown,
        AxiosBaseQueryError
    > =>
        async ({ url, method, data, params }) => {
            try {
                const result = await axiosInstance({
                    url,
                    method,
                    data,
                    params,
                });

                // Detect if server returned index.html (e.g. Apache rewrite) instead of JSON
                if (typeof result.data === "string" && result.data.trim().toLowerCase().startsWith("<!doctype html")) {
                    return {
                        error: {
                            status: 502,
                            data: {
                                message: "API endpoint returned HTML instead of JSON. Ensure the backend server is running and accessible.",
                            },
                        },
                    };
                }

                return {
                    data: result.data,
                };
            } catch (axiosError: any) {
                return {
                    error: {
                        status:
                            axiosError.response?.status,
                        data:
                            axiosError.response?.data ||
                            axiosError.message,
                    },
                };
            }
        };

export const baseApi = createApi({
    reducerPath: "api",

    baseQuery: axiosBaseQuery(),

    tagTypes: ["Notes", "Auth"],

    endpoints: () => ({}),
});