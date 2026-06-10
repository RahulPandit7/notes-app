import { Response } from "express";

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
    permanentlyDeleteNoteById,
} from "../services/noteService";

import { sendSuccess } from "../utils/apiResponse";
import logger from "../utils/logger";
import { AppError } from "../utils/AppError";
import { AuthRequest } from "../middleware/authMiddleware";

const getUserIdOrThrow = (req: AuthRequest): number => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError("User not authenticated", 401);
    }

    return userId;
};

export const fetchNotes = async (
    req: AuthRequest,
    res: Response
) => {
    logger.info("Fetching all notes");
    const userId = getUserIdOrThrow(req);

    const notes = await getAllNotes(userId);

    return sendSuccess(
        res,
        "Notes fetched successfully",
        notes
    );
};

export const addNote = async (
    req: AuthRequest,
    res: Response
) => {
    logger.info("Adding a new note", { body: req.body });
    const { title, content } = req.body;
    const userId = getUserIdOrThrow(req);

    const note = await createNote(
        title,
        content,
        userId
    );

    return sendSuccess(
        res,
        "Note created successfully",
        note,
        201
    );
};

export const deleteNote = async (
    req: AuthRequest,
    res: Response
) => {
    const noteId = Number(req.params.id);
    const userId = getUserIdOrThrow(req);

    logger.info(
        `Soft-deleting note ${noteId} for user ${userId}`
    );

    const deletedNote = await deleteNoteById(
        noteId,
        userId
    );

    return sendSuccess(
        res,
        "Note deleted successfully",
        deletedNote
    );
};

export const updateNote = async (
    req: AuthRequest,
    res: Response
) => {
    const noteId = Number(req.params.id);
    const userId = getUserIdOrThrow(req);
    const { title, content } = req.body;

    logger.info(
        `Updating note ${noteId} for user ${userId}`
    );

    const updatedNote = await updateNoteById(
        noteId,
        title,
        content,
        userId
    );

    return sendSuccess(
        res,
        "Note updated successfully",
        updatedNote
    );
};

export const togglePinned = async (
    req: AuthRequest,
    res: Response
) => {
    const noteId = Number(req.params.id);
    const userId = getUserIdOrThrow(req);

    logger.info(
        `Toggling pinned for note ${noteId} (user ${userId})`
    );

    const updatedNote = await togglePinnedById(
        noteId,
        userId
    );

    return sendSuccess(
        res,
        "Note pinned successfully",
        updatedNote
    );
};

export const toggleFavorite = async (
    req: AuthRequest,
    res: Response
) => {
    const noteId = Number(req.params.id);
    const userId = getUserIdOrThrow(req);

    logger.info(
        `Toggling favorite for note ${noteId} (user ${userId})`
    );

    const updatedNote = await toggleFavoriteById(
        noteId,
        userId
    );

    return sendSuccess(
        res,
        "Note favorited successfully",
        updatedNote
    );
};

export const fetchNotesStatus = async (
    req: AuthRequest,
    res: Response
) => {
    logger.info("Fetching notes status");
    const userId = getUserIdOrThrow(req);

    const notesStatus = await getNotesStatus(userId);

    return sendSuccess(
        res,
        "Notes status fetched successfully",
        notesStatus
    );
};

export const fetchTrashNotes = async (
    req: AuthRequest,
    res: Response
) => {
    logger.info("Fetching trash notes");
    const userId = getUserIdOrThrow(req);

    const notes = await getTrashNotes(userId);

    return sendSuccess(
        res,
        "Trash notes fetched successfully",
        notes
    );
};

export const restoreNote = async (
    req: AuthRequest,
    res: Response
) => {
    const noteId = Number(req.params.id);
    const userId = getUserIdOrThrow(req);

    logger.info(
        `Restoring note ${noteId} for user ${userId}`
    );

    const restoredNote = await restoreNoteById(
        noteId,
        userId
    );

    return sendSuccess(
        res,
        "Note restored successfully",
        restoredNote
    );
};

export const permanentlyDeleteNote = async (
    req: AuthRequest,
    res: Response
) => {
    const noteId = Number(req.params.id);
    const userId = getUserIdOrThrow(req);

    logger.info(
        `Permanently deleting note ${noteId} for user ${userId}`
    );

    const deletedNote =
        await permanentlyDeleteNoteById(noteId, userId);

    return sendSuccess(
        res,
        "Note permanently deleted",
        deletedNote
    );
};
