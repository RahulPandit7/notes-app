import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    isNoteFormOpen: boolean;
}

const initialState: UIState = {
    isNoteFormOpen: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleNoteForm: (state) => {
            state.isNoteFormOpen = !state.isNoteFormOpen;
        },
        openNoteForm: (state) => {
            state.isNoteFormOpen = true;
        },
        closeNoteForm: (state) => {
            state.isNoteFormOpen = false;
        },
    },
});

export const { toggleNoteForm, openNoteForm, closeNoteForm } = uiSlice.actions;
export default uiSlice.reducer;