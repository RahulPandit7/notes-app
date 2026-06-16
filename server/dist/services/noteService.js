"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permanentlyDeleteNoteById = exports.restoreNoteById = exports.getTrashNotes = exports.getNotesStatus = exports.toggleFavoriteById = exports.togglePinnedById = exports.updateNoteById = exports.deleteNoteById = exports.createNote = exports.getAllNotes = exports.getOwnNotes = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const AppError_1 = require("../utils/AppError");
const getOwnNotes = async (userId) => {
    return prisma_1.default.note.findMany({
        where: {
            userId,
            isDeleted: false,
        },
        orderBy: [
            { isPinned: "desc" },
            { isFavorite: "desc" },
            { createdAt: "desc" },
        ],
    });
};
exports.getOwnNotes = getOwnNotes;
const getAllNotes = async () => {
    return prisma_1.default.note.findMany({
        where: {
            isDeleted: false,
        },
        orderBy: [
            { isPinned: "desc" },
            { isFavorite: "desc" },
            { createdAt: "desc" },
        ],
    });
};
exports.getAllNotes = getAllNotes;
const createNote = async (title, content, userId) => {
    return prisma_1.default.note.create({
        data: {
            title,
            content,
            userId,
        },
    });
};
exports.createNote = createNote;
const getOwnedNoteOrThrow = async (id, userId) => {
    const note = await prisma_1.default.note.findUnique({
        where: { id },
    });
    if (!note) {
        throw new AppError_1.AppError("Note not found", 404);
    }
    if (note.userId !== userId) {
        throw new AppError_1.AppError("Note not found", 404);
    }
    return note;
};
const deleteNoteById = async (id, userId) => {
    await getOwnedNoteOrThrow(id, userId);
    return prisma_1.default.note.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        },
    });
};
exports.deleteNoteById = deleteNoteById;
const updateNoteById = async (id, title, content, userId) => {
    await getOwnedNoteOrThrow(id, userId);
    return prisma_1.default.note.update({
        where: {
            id,
        },
        data: {
            title,
            content,
        },
    });
};
exports.updateNoteById = updateNoteById;
const togglePinnedById = async (id, userId) => {
    const note = await getOwnedNoteOrThrow(id, userId);
    return prisma_1.default.note.update({
        where: { id },
        data: {
            isPinned: !note.isPinned,
        },
    });
};
exports.togglePinnedById = togglePinnedById;
const toggleFavoriteById = async (id, userId) => {
    const note = await getOwnedNoteOrThrow(id, userId);
    return prisma_1.default.note.update({
        where: { id },
        data: {
            isFavorite: !note.isFavorite,
        },
    });
};
exports.toggleFavoriteById = toggleFavoriteById;
const getNotesStatus = async (userId) => {
    const [totalCount, pinnedCount, favoritedCount, trashCount] = await Promise.all([
        prisma_1.default.note.count({
            where: {
                userId,
                isDeleted: false,
            },
        }),
        prisma_1.default.note.count({
            where: {
                userId,
                isPinned: true,
                isDeleted: false,
            },
        }),
        prisma_1.default.note.count({
            where: {
                userId,
                isFavorite: true,
                isDeleted: false,
            },
        }),
        prisma_1.default.note.count({
            where: {
                userId,
                isDeleted: true,
            },
        }),
    ]);
    return {
        totalCount,
        pinnedCount,
        favoritedCount,
        trashCount,
    };
};
exports.getNotesStatus = getNotesStatus;
const getTrashNotes = async (userId) => {
    return prisma_1.default.note.findMany({
        where: {
            userId,
            isDeleted: true,
        },
        orderBy: {
            deletedAt: "desc",
        },
    });
};
exports.getTrashNotes = getTrashNotes;
const restoreNoteById = async (id, userId) => {
    await getOwnedNoteOrThrow(id, userId);
    return prisma_1.default.note.update({
        where: {
            id,
        },
        data: {
            isDeleted: false,
            deletedAt: null,
        },
    });
};
exports.restoreNoteById = restoreNoteById;
const permanentlyDeleteNoteById = async (id, userId) => {
    await getOwnedNoteOrThrow(id, userId);
    return prisma_1.default.note.delete({
        where: {
            id,
        },
    });
};
exports.permanentlyDeleteNoteById = permanentlyDeleteNoteById;
