import type { User } from "@/types/auth";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    user: User | null;
}

const savedToken =
    localStorage.getItem("access_token");

const savedUser =
    localStorage.getItem("user");

const initialState: AuthState = {
    token: savedToken,
    user: savedUser
        ? JSON.parse(savedUser)
        : null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<AuthState>
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;

            localStorage.setItem(
                "access_token",
                action.payload.token ?? ""
            );

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload.user)
            );
        },

        logout: (state) => {
            state.token = null;
            state.user = null;

            localStorage.removeItem(
                "access_token"
            );

            localStorage.removeItem("user");
        },
    },
});

export const {
    setCredentials,
    logout,
} = authSlice.actions;

export default authSlice.reducer;