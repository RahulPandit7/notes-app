import { Request, Response } from "express";

import {
    getAllNotes,
    createNote,
    deleteNoteById,
    updateNoteById,
    togglePinnedById,
    toggleFavoriteById,
    getNotesStatus,
    getTrashNotes,
    restoreNoteById,
    permanentlyDeleteNoteById
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

export const togglePinned = async (req: Request, res: Response) => {
    const noteId = Number(req.params.id);
    logger.info(`Toggling pinned for note with id: ${noteId}`);
    const updatedNote = await togglePinnedById(noteId);
    return sendSuccess(
        res,
        "Note pinned successfully",
        updatedNote
    );
};

export const toggleFavorite = async (req: Request, res: Response) => {
    const noteId = Number(req.params.id);
    logger.info(`Toggling favorited for note with id: ${noteId}`);
    const updatedNote = await toggleFavoriteById(noteId);
    return sendSuccess(
        res,
        "Note favorited successfully",
        updatedNote
    );
};

export const fetchNotesStatus = async (req: Request, res: Response) => {
    logger.info("Fetching notes status");
    const notesStatus = await getNotesStatus();
    return sendSuccess(
        res,
        "Notes status fetched successfully",
        notesStatus
    );
};

export const fetchTrashNotes = async (
    req: Request,
    res: Response
) => {
    logger.info("Fetching trash notes");

    const notes = await getTrashNotes();

    return sendSuccess(
        res,
        "Trash notes fetched successfully",
        notes
    );
};

export const restoreNote = async (
    req: Request,
    res: Response
) => {
    const noteId = Number(req.params.id);

    logger.info(
        `Restoring note with id: ${noteId}`
    );

    const restoredNote =
        await restoreNoteById(noteId);

    return sendSuccess(
        res,
        "Note restored successfully",
        restoredNote
    );
};

export const permanentlyDeleteNote = async (
    req: Request,
    res: Response
) => {
    const noteId = Number(req.params.id);

    logger.info(
        `Permanently deleting note with id: ${noteId}`
    );

    const deletedNote =
        await permanentlyDeleteNoteById(noteId);

    return sendSuccess(
        res,
        "Note permanently deleted",
        deletedNote
    );
};