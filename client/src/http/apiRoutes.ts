const NOTE_BASE = 'notes'
const AUTH_BASE = 'auth'

export default {
    note: {
        create: `${NOTE_BASE}`,
        own: `${NOTE_BASE}/own`,
        getAll: `${NOTE_BASE}`,
        update: `${NOTE_BASE}`,
        delete: `${NOTE_BASE}`,
        togglePinned: (id: number) => `${NOTE_BASE}/${id}/pin`,
        toggleFavorite: (id: number) => `${NOTE_BASE}/${id}/favorite`,
        noteStats: `${NOTE_BASE}/stats`,
        trash: `${NOTE_BASE}/trash`,
        deleteForever: (id: number) => `${NOTE_BASE}/${id}/permanent`,
        restore: (id: number) => `${NOTE_BASE}/${id}/restore`,
    },


    auth: {
        register: `${AUTH_BASE}/register`,
        login: `${AUTH_BASE}/login`,
    },
}