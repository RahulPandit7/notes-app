import prisma from "../config/prisma";

export const getAllNotes = async () => {
    return prisma.note.findMany({
        orderBy: {
            createdAt: "desc",
        },
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
    return prisma.note.delete({
        where: {
            id,
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