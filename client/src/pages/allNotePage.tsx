import { useDeleteNoteMutation, useGetOwnNotesQuery, useToggleFavoriteMutation, useTogglePinnedMutation } from "../store/api/noteApi";
import AddNoteForm from "../components/AddNoteForm";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Note } from "@/types/note";
import { useOutletContext } from "react-router-dom";
import { NoteCard } from "@/components/NoteCard";

export default function AllNotePage() {
    const { showAddForm, setShowAddForm, editingNote, setEditingNote } = useOutletContext<{
        showAddForm: boolean;
        setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
        editingNote: Note | null;
        setEditingNote: React.Dispatch<React.SetStateAction<Note | null>>;
    }>();

    const { data, isLoading, error } = useGetOwnNotesQuery();
    const [deleteNoteById] = useDeleteNoteMutation();
    const [pinNoteToggleById] = useTogglePinnedMutation();
    const [favoriteNoteToggleById] = useToggleFavoriteMutation();

    const handleDeleteNote = async (id: number) => {
        try {
            await deleteNoteById(id).unwrap();
            if (editingNote?.id === id) {
                setEditingNote(null);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const handelPinNote = async (id: number) => {
        try {
            await pinNoteToggleById(id).unwrap();
        } catch (error) {
            console.error("Error pinning note:", error);
        }
    };

    const handelFavoriteNote = async (id: number) => {
        try {
            await favoriteNoteToggleById(id).unwrap();
        } catch (error) {
            console.error("Error favoring note:", error);
        }
    };

    if (isLoading) return <p className="p-8 text-center">Loading...</p>;
    if (error) return <p className="p-8 text-center text-red-500">Error loading notes</p>;

    const notes = data?.data ?? [];

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

                {/* Notes List */}
                <div className={showAddForm || editingNote ? "lg:col-span-1" : "w-full"}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Your Notes</h2>
                        {!showAddForm && !editingNote && (
                            <Button
                                onClick={() => setShowAddForm(true)}
                                className="flex items-center gap-1 cursor-pointer bg-primary hover:bg-primary/95"
                            >
                                <Plus size={16} /> Add New Note
                            </Button>
                        )}
                    </div>
                    <div className={`space-y-4 grid grid-cols-1 ${showAddForm || editingNote ? "md:grid-cols-1 xl:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"} gap-4`}>
                        {notes.length === 0 ? (
                            <p className="text-muted-foreground col-span-full flex justify-center items-center py-12">No notes yet. Add one!</p>
                        ) : (
                            notes.map((note) => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    onClick={() => {
                                        setEditingNote({ ...note });
                                        setShowAddForm(false);
                                    }}
                                    onPinToggle={() => handelPinNote(note.id)}
                                    onFavoriteToggle={() => handelFavoriteNote(note.id)}
                                    onDelete={() => handleDeleteNote(note.id)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
