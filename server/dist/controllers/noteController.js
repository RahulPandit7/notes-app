"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permanentlyDeleteNote = exports.restoreNote = exports.fetchTrashNotes = exports.fetchNotesStatus = exports.toggleFavorite = exports.togglePinned = exports.updateNote = exports.deleteNote = exports.addNote = exports.fetchNotes = exports.ownNotes = void 0;
const noteService_1 = require("../services/noteService");
const apiResponse_1 = require("../utils/apiResponse");
const logger_1 = __importDefault(require("../utils/logger"));
const AppError_1 = require("../utils/AppError");
const getUserIdOrThrow = (req) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new AppError_1.AppError("User not authenticated", 401);
    }
    return userId;
};
const ownNotes = async (req, res) => {
    logger_1.default.info("Fetching own notes");
    const userId = getUserIdOrThrow(req);
    const notes = await (0, noteService_1.getOwnNotes)(userId);
    return (0, apiResponse_1.sendSuccess)(res, "Own notes fetched successfully", notes);
};
exports.ownNotes = ownNotes;
const fetchNotes = async (req, res) => {
    logger_1.default.info("Fetching all notes");
    const notes = await (0, noteService_1.getAllNotes)();
    return (0, apiResponse_1.sendSuccess)(res, "Notes fetched successfully", notes);
};
exports.fetchNotes = fetchNotes;
const addNote = async (req, res) => {
    logger_1.default.info("Adding a new note", { body: req.body });
    const { title, content } = req.body;
    const userId = getUserIdOrThrow(req);
    const note = await (0, noteService_1.createNote)(title, content, userId);
    return (0, apiResponse_1.sendSuccess)(res, "Note created successfully", note, 201);
};
exports.addNote = addNote;
const deleteNote = async (req, res) => {
    const noteId = Number(req.params.id);
    const userId = getUserIdOrThrow(req);
    logger_1.default.info(`Soft-deleting note ${noteId} for user ${userId}`);
    const deletedNote = await (0, noteService_1.deleteNoteById)(noteId, userId);
    return (0, apiResponse_1.sendSuccess)(res, "Note deleted successfully", deletedNote);
};
exports.deleteNote = deleteNote;
const updateNote = async (req, res) => {
    const noteId = Number(req.params.id);
    const userId = getUserIdOrThrow(req);
    const { title, content } = req.body;
    logger_1.default.info(`Updating note ${noteId} for user ${userId}`);
    const updatedNote = await (0, noteService_1.updateNoteById)(noteId, title, content, userId);
    return (0, apiResponse_1.sendSuccess)(res, "Note updated successfully", updatedNote);
};
exports.updateNote = updateNote;
const togglePinned = async (req, res) => {
    const noteId = Number(req.params.id);
    const userId = getUserIdOrThrow(req);
    logger_1.default.info(`Toggling pinned for note ${noteId} (user ${userId})`);
    const updatedNote = await (0, noteService_1.togglePinnedById)(noteId, userId);
    return (0, apiResponse_1.sendSuccess)(res, "Note pinned successfully", updatedNote);
};
exports.togglePinned = togglePinned;
const toggleFavorite = async (req, res) => {
    const noteId = Number(req.params.id);
    const userId = getUserIdOrThrow(req);
    logger_1.default.info(`Toggling favorite for note ${noteId} (user ${userId})`);
    const updatedNote = await (0, noteService_1.toggleFavoriteById)(noteId, userId);
    return (0, apiResponse_1.sendSuccess)(res, "Note favorited successfully", updatedNote);
};
exports.toggleFavorite = toggleFavorite;
const fetchNotesStatus = async (req, res) => {
    logger_1.default.info("Fetching notes status");
    const userId = getUserIdOrThrow(req);
    const notesStatus = await (0, noteService_1.getNotesStatus)(userId);
    return (0, apiResponse_1.sendSuccess)(res, "Notes status fetched successfully", notesStatus);
};
exports.fetchNotesStatus = fetchNotesStatus;
const fetchTrashNotes = async (req, res) => {
    logger_1.default.info("Fetching trash notes");
    const userId = getUserIdOrThrow(req);
    const notes = await (0, noteService_1.getTrashNotes)(userId);
    return (0, apiResponse_1.sendSuccess)(res, "Trash notes fetched successfully", notes);
};
exports.fetchTrashNotes = fetchTrashNotes;
const restoreNote = async (req, res) => {
    const noteId = Number(req.params.id);
    const userId = getUserIdOrThrow(req);
    logger_1.default.info(`Restoring note ${noteId} for user ${userId}`);
    const restoredNote = await (0, noteService_1.restoreNoteById)(noteId, userId);
    return (0, apiResponse_1.sendSuccess)(res, "Note restored successfully", restoredNote);
};
exports.restoreNote = restoreNote;
const permanentlyDeleteNote = async (req, res) => {
    const noteId = Number(req.params.id);
    const userId = getUserIdOrThrow(req);
    logger_1.default.info(`Permanently deleting note ${noteId} for user ${userId}`);
    const deletedNote = await (0, noteService_1.permanentlyDeleteNoteById)(noteId, userId);
    return (0, apiResponse_1.sendSuccess)(res, "Note permanently deleted", deletedNote);
};
exports.permanentlyDeleteNote = permanentlyDeleteNote;
