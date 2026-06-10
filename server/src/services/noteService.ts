import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export const getOwnNotes = async (userId: number) => {
    return prisma.note.findMany({
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

export const getAllNotes = async () => {
    return prisma.note.findMany({
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

export const createNote = async (
    title: string,
    content: string,
    userId: number
) => {
    return prisma.note.create({
        data: {
            title,
            content,
            userId,
        },
    });
};

const getOwnedNoteOrThrow = async (id: number, userId: number) => {
    const note = await prisma.note.findUnique({
        where: { id },
    });

    if (!note) {
        throw new AppError("Note not found", 404);
    }

    if (note.userId !== userId) {

        throw new AppError("Note not found", 404);
    }

    return note;
};

export const deleteNoteById = async (
    id: number,
    userId: number
) => {
    await getOwnedNoteOrThrow(id, userId);

    return prisma.note.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        },
    });
};

export const updateNoteById = async (
    id: number,
    title: string,
    content: string,
    userId: number
) => {
    await getOwnedNoteOrThrow(id, userId);

    return prisma.note.update({
        where: {
            id,
        },
        data: {
            title,
            content,
        },
    });
};

export const togglePinnedById = async (
    id: number,
    userId: number
) => {
    const note = await getOwnedNoteOrThrow(id, userId);

    return prisma.note.update({
        where: { id },
        data: {
            isPinned: !note.isPinned,
        },
    });
};

export const toggleFavoriteById = async (
    id: number,
    userId: number
) => {
    const note = await getOwnedNoteOrThrow(id, userId);

    return prisma.note.update({
        where: { id },
        data: {
            isFavorite: !note.isFavorite,
        },
    });
};

export const getNotesStatus = async (userId: number) => {
    const [totalCount, pinnedCount, favoritedCount, trashCount] =
        await Promise.all([
            prisma.note.count({
                where: {
                    userId,
                    isDeleted: false,
                },
            }),
            prisma.note.count({
                where: {
                    userId,
                    isPinned: true,
                    isDeleted: false,
                },
            }),
            prisma.note.count({
                where: {
                    userId,
                    isFavorite: true,
                    isDeleted: false,
                },
            }),
            prisma.note.count({
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

export const getTrashNotes = async (userId: number) => {
    return prisma.note.findMany({
        where: {
            userId,
            isDeleted: true,
        },
        orderBy: {
            deletedAt: "desc",
        },
    });
};

export const restoreNoteById = async (
    id: number,
    userId: number
) => {
    await getOwnedNoteOrThrow(id, userId);

    return prisma.note.update({
        where: {
            id,
        },
        data: {
            isDeleted: false,
            deletedAt: null,
        },
    });
};

export const permanentlyDeleteNoteById = async (
    id: number,
    userId: number
) => {
    await getOwnedNoteOrThrow(id, userId);

    return prisma.note.delete({
        where: {
            id,
        },
    });
};
