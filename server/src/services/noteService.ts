import prisma from "../config/prisma";

export const getAllNotes = async () => {
    return prisma.note.findMany({
        where: {
            isDeleted: false,
        },
        orderBy: [
            { isPinned: "desc" },
            { isFavorite: "desc" },
            { createdAt: "desc" }
        ],
    });
};

export const createNote = async (
    title: string,
    content: string
) => {
    return prisma.note.create({
        data: {
            title,
            content,
        },
    });
};

export const deleteNoteById = async (
    id: number
) => {
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
    content: string
) => {
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

export const togglePinnedById = async (id: number) => {
    const note = await prisma.note.findUnique({
        where: { id },
    });

    if (!note) {
        throw new Error("Note not found");
    }

    return prisma.note.update({
        where: { id },
        data: {
            isPinned: !note.isPinned,
        },
    });
};

export const toggleFavoriteById = async (id: number) => {
    const note = await prisma.note.findUnique({
        where: { id },
    });

    if (!note) {
        throw new Error("Note not found");
    }

    return prisma.note.update({
        where: { id },
        data: {
            isFavorite: !note.isFavorite,
        },
    });
};


export const getNotesStatus = async () => {
    const [totalCount, pinnedCount, favoritedCount, trashCount] = await Promise.all([
        prisma.note.count({
            where: {
                isDeleted: false,
            },
        }),
        prisma.note.count({
            where: {
                isPinned: true,
                isDeleted: false,
            },
        }),
        prisma.note.count({
            where: {
                isFavorite: true,
                isDeleted: false,
            },
        }),
        prisma.note.count({
            where: {
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

export const getTrashNotes = async () => {
    return prisma.note.findMany({
        where: {
            isDeleted: true,
        },
        orderBy: {
            deletedAt: "desc",
        },
    });
};

export const restoreNoteById = async (
    id: number
) => {
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
    id: number
) => {
    return prisma.note.delete({
        where: {
            id,
        },
    });
};