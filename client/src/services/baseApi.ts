import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axiosInstance from "../http/axios";


type AxiosBaseQueryArgs = {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
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

    tagTypes: ["Notes"],

    endpoints: () => ({}),
});