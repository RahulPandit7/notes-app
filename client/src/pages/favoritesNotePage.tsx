import { useDeleteNoteMutation, useGetNotesQuery, useToggleFavoriteMutation } from "@/store/api/noteApi";
import { NoteCard } from "@/components/NoteCard";
import AddNoteForm from "@/components/AddNoteForm";
import type { Note } from "@/types/note";
import { useOutletContext } from "react-router-dom";

export default function FavoriteNotesPage() {
    const { showAddForm, setShowAddForm, editingNote, setEditingNote } = useOutletContext<{
        showAddForm: boolean;
        setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
        editingNote: Note | null;
        setEditingNote: React.Dispatch<React.SetStateAction<Note | null>>;
    }>();

    const { data, isLoading, error } = useGetNotesQuery();
    const [deleteNoteById] = useDeleteNoteMutation();
    // const [pinNoteToggleById] = useTogglePinnedMutation();
    const [favoriteNoteToggleById] = useToggleFavoriteMutation();

    const handleDeleteNote = async (id: number) => {
        try {
            await deleteNoteById(id).unwrap();
            if (editingNote?.id === id) {
                setEditingNote(null);
            }
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    };

    // const handlePinNote = async (id: number) => {
    //     try {
    //         await pinNoteToggleById(id).unwrap();
    //     } catch (err) {
    //         console.error("Error pinning note:", err);
    //     }
    // };

    const handleFavoriteNote = async (id: number) => {
        try {
            await favoriteNoteToggleById(id).unwrap();
        } catch (err) {
            console.error("Error favoring note:", err);
        }
    };

    if (isLoading) return <p className="p-8 text-center text-muted-foreground">Loading...</p>;
    if (error) return <p className="p-8 text-center text-destructive">Error loading notes</p>;

    const notes = data?.data ?? [];
    const favoriteNotes = notes.filter((note) => note.isFavorite);

    return (
        <div className="container mx-auto p-8">
            <div className={`grid gap-8 items-start ${showAddForm || editingNote ? "grid-cols-1 lg:grid-cols-1" : "grid-cols-1"}`}>
                {(showAddForm || editingNote) && (
                    <div className="border border-border/40 p-5 rounded-xl bg-card shadow-sm">
                        <AddNoteForm
                            editingNote={editingNote}
                            onClearEdit={() => {
                                setEditingNote(null);
                                setShowAddForm(false);
                            }}
                        />
                    </div>
                )}

                <div className={showAddForm || editingNote ? "lg:col-span-1" : "w-full"}>
                    <h2 className="text-2xl font-semibold mb-6">Favorite Notes</h2>
                    {favoriteNotes.length === 0 ? (
                        <p className="text-muted-foreground text-center py-12">No favorite notes.</p>
                    ) : (
                        <div className={`space-y-4 grid grid-cols-1 ${showAddForm || editingNote ? "md:grid-cols-1 xl:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"} gap-4`}>
                            {favoriteNotes.map((note) => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    onClick={() => {
                                        setEditingNote({ ...note });
                                        setShowAddForm(false);
                                    }}
                                    // onPinToggle={() => handlePinNote(note.id)}
                                    onFavoriteToggle={() => handleFavoriteNote(note.id)}
                                    onDelete={() => handleDeleteNote(note.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}