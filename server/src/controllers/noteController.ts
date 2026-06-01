import { Request, Response } from "express";

import {
    getAllNotes,
    createNote,
    deleteNoteById,
    updateNoteById
} from "../services/noteService";

import { sendSuccess } from "../utils/apiResponse";
import logger from "../utils/logger";

export const fetchNotes = async (
    req: Request,
    res: Response
) => {
    logger.info("Fetching all notes");
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
    logger.info("Adding a new note", { body: req.body });
    const { title, content } = req.body;

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
    logger.info(`Deleting note with id: ${noteId}`);

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
    logger.info(`Updating note with id: ${noteId}`);
    const { title, content } = req.body;

    const updatedNote = await updateNoteById(noteId, title, content);

    return sendSuccess(
        res,
        "Note updated successfully",
        updatedNote
    );
};