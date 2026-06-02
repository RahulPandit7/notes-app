const NOTE_BASE = 'notes'

export default {
    note: {
        create: `${NOTE_BASE}`,
        getAll: `${NOTE_BASE}`,
        update: `${NOTE_BASE}`,
        delete: `${NOTE_BASE}`,
        togglePinned: (id: number) => `${NOTE_BASE}/${id}/pin`,
        toggleFavorite: (id: number) => `${NOTE_BASE}/${id}/favorite`,
        noteStats: `${NOTE_BASE}/stats`,
        trash: `${NOTE_BASE}/trash`,
        deleteForever: (id: number) => `${NOTE_BASE}/trash/${id}`,
        restore: (id: number) => `${NOTE_BASE}/trash/${id}/restore`,
    },
}