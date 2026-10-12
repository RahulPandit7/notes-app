import { useDeleteNoteMutation, useGetOwnNotesQuery, useToggleFavoriteMutation, useTogglePinnedMutation } from "../store/api/noteApi";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NoteCard } from "@/components/NoteCard";
import { NoteFormPanel } from "@/components/NoteFormPanel";
import { useNoteForm } from "@/hooks/useNoteForm";

export default function AllNotePage() {
    const { showForm, editingNote, openForm, closeForm, startEditing } = useNoteForm();

    const { data, isLoading, error } = useGetOwnNotesQuery();
    const [deleteNoteById] = useDeleteNoteMutation();
    const [pinNoteToggleById] = useTogglePinnedMutation();
    const [favoriteNoteToggleById] = useToggleFavoriteMutation();

    const handleDeleteNote = async (id: number) => {
        try {
            await deleteNoteById(id).unwrap();
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
        <div className="container mx-auto">
            <NoteFormPanel showForm={showForm} editingNote={editingNote} onClose={closeForm} />

            <div className="flex justify-between items-center mb-6">
                {editingNote ? (
                    <h2 className="text-md font-semibold text-gray-700">Recent Notes</h2>
                ) : (
                    <h2 className="text-md font-semibold text-gray-700">Notes</h2>
                )}
                {!showForm && (
                    <Button
                        onClick={openForm}
                        className="flex items-center gap-1 cursor-pointer bg-primary hover:bg-primary/95"
                    >
                        <Plus size={16} /> Add New Note
                    </Button>
                )}
            </div>

            <div className={`grid ${showForm ? "grid-cols-1 md:grid-cols-1 xl:grid-cols-2" : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"} gap-2.5 sm:gap-4`}>
                {notes.length === 0 ? (
                    <p className="text-muted-foreground col-span-full flex justify-center items-center py-12">No notes yet. Add one!</p>
                ) : (
                    notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onClick={() => startEditing(note)}
                            onPinToggle={() => handelPinNote(note.id)}
                            onFavoriteToggle={() => handelFavoriteNote(note.id)}
                            onDelete={() => handleDeleteNote(note.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
