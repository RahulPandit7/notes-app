import { Request, Response } from "express";

import {
    getAllNotes,
    createNote,
    deleteNoteById,
    updateNoteById
} from "../services/noteService";

import { sendSuccess } from "../utils/apiResponse";

export const fetchNotes = async (
    req: Request,
    res: Response
) => {
    const notes = await getAllNotes();

    return sendSuccess(
        res,
        "Notes fetched successfully",
        notes
    );
};

export const addNote = async (
    req: Request,
    res: Response
) => {
    const { title, content } = req.body;

    if (!title || !content) {
        throw new Error(
            "Title and content are required"
        );
    }

    const note = await createNote(
        title,
        content
    );

    return sendSuccess(
        res,
        "Note created successfully",
        note,
        201
    );
};

export const deleteNote = async (
    req: Request,
    res: Response
) => {
    const noteId = Number(req.params.id);

    const deletedNote =
        await deleteNoteById(noteId);

    return sendSuccess(
        res,
        "Note deleted successfully",
        deletedNote
    );
};

export const updateNote = async (
    req: Request,
    res: Response
) => {
    const noteId = Number(req.params.id);
    const { title, content } = req.body;

    if (!title || !content) {
        throw new Error(
            "Title and content are required"
        );
    }

    const updatedNote = await updateNoteById(noteId, title, content);

    return sendSuccess(
        res,
        "Note updated successfully",
        updatedNote
    );
};