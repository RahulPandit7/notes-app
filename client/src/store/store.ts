import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "../services/baseApi";
import uiReducer from "@/store/slices/uiSlice"

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        ui: uiReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseApi.middleware
        ),
});

export type RootState = ReturnType<
    typeof store.getState
>;

export type AppDispatch =
    typeof store.dispatch;