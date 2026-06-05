import type { AuthResponse } from "@/types/auth";
import type { LoginInput, RegisterInput } from "@/validators/authSchema";
import type { ApiResponse } from "./ApiResponse";
import { baseApi } from "@/services/baseApi";
import apiRoutes from "@/http/apiRoutes";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<ApiResponse<AuthResponse>, RegisterInput>({
            query: (data) => ({
                url: apiRoutes.auth.register,
                method: "POST",
                data,
            }),
            invalidatesTags: ["Auth"],
        }),

        login: builder.mutation<ApiResponse<AuthResponse>, LoginInput>({
            query: (data) => ({
                url: apiRoutes.auth.login,
                method: "POST",
                data,
            }),
            invalidatesTags: ["Auth"],
        }),
    }),
});


export const {
    useRegisterMutation,
    useLoginMutation,
} = authApi;