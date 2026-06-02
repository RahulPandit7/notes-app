import apiRoutes from "@/http/apiRoutes";
import { baseApi } from "../../services/baseApi";
import type { Note, NoteStats } from "../../types/note";
import type { ApiResponse } from "./ApiResponse";


type CreateNoteRequest = {
    title: string;
    content: string;
};

export const notesApi =
    baseApi.injectEndpoints({
        endpoints: (builder) => ({
            // GET ALL NOTES
            getNotes: builder.query<
                ApiResponse<Note[]>,
                void
            >({
                query: () => ({
                    url: `${apiRoutes.note.getAll}`,
                    method: "GET",
                }),

                providesTags: ["Notes"],
            }),


            // CREATE NOTE
            createNote: builder.mutation<
                ApiResponse<Note>,
                CreateNoteRequest
            >({
                query: (body) => ({
                    url: `${apiRoutes.note.create}`,
                    method: "POST",
                    data: body,
                }),

                invalidatesTags: ["Notes"],
            }),

            // DELETE NOTE
            deleteNote: builder.mutation<
                ApiResponse<Note>,
                number
            >({
                query: (id) => ({
                    url: `${apiRoutes.note.delete}/${id}`,
                    method: "DELETE",
                }),

                invalidatesTags: ["Notes"],
            }),

            // UPDATE NOTE
            updateNote: builder.mutation<
                ApiResponse<Note>,
                {
                    id: number;
                    data: CreateNoteRequest;
                }
            >({
                query: ({ id, data }) => ({
                    url: `${apiRoutes.note.update}/${id}`,
                    method: "PUT",
                    data,
                }),

                invalidatesTags: ["Notes"],
            }),

            // pinned toggle 
            togglePinned: builder.mutation<
                ApiResponse<Note>,
                number
            >({
                query: (id) => ({
                    url: `${apiRoutes.note.togglePinned(id)}`,
                    method: "PATCH",
                }),

                invalidatesTags: ["Notes"],
            }),

            // favorite toggle
            toggleFavorite: builder.mutation<
                ApiResponse<Note>,
                number
            >({
                query: (id) => ({
                    url: `${apiRoutes.note.toggleFavorite(id)}`,
                    method: "PATCH",
                }),

                invalidatesTags: ["Notes"],
            }),

            // fetch note stats
            fetchNoteStats: builder.query<
                ApiResponse<NoteStats>,
                void
            >({
                query: () => ({
                    url: `${apiRoutes.note.noteStats}`,
                    method: "GET",
                }),

                providesTags: ["Notes"],
            }),

            fetchTrashNotes: builder.query<
                ApiResponse<Note[]>,
                void
            >({
                query: () => ({
                    url: `${apiRoutes.note.trash}`,
                    method: "GET",
                }),

                providesTags: ["Notes"],
            }),

            deleteForever: builder.mutation<
                ApiResponse<Note>,
                number
            >({
                query: (id) => ({
                    url: `${apiRoutes.note.deleteForever(id)}`,
                    method: "DELETE",
                }),

                invalidatesTags: ["Notes"],
            }),

            restore: builder.mutation<
                ApiResponse<Note>,
                number
            >({
                query: (id) => ({
                    url: `${apiRoutes.note.restore(id)}`,
                    method: "PATCH",
                }),

                invalidatesTags: ["Notes"],
            }),

        }),
    });

export const {
    useGetNotesQuery,
    useCreateNoteMutation,
    useDeleteNoteMutation,
    useUpdateNoteMutation,
    useTogglePinnedMutation,
    useToggleFavoriteMutation,
    useFetchNoteStatsQuery,
    useFetchTrashNotesQuery,
    useDeleteForeverMutation,
    useRestoreMutation,
} = notesApi;