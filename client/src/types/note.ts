export type Note = {
    id: number;
    title: string;
    content: string;
    isPinned: boolean;
    isFavorite: boolean;
    isDeleted?: boolean;
    createdAt: string;
    deletedAt?: string | null;
};

export type NoteStats = {
    totalCount: number;
    pinnedCount: number;
    favoritedCount: number;
    trashCount: number;
};

