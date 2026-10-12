import { useDeleteNoteMutation, useGetOwnNotesQuery, useTogglePinnedMutation } from "@/store/api/noteApi";
import { NoteCard } from "@/components/NoteCard";
import { NoteFormPanel } from "@/components/NoteFormPanel";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNoteForm } from "@/hooks/useNoteForm";

export default function PinnedNotePage() {
    const { showForm, editingNote, openForm, closeForm, startEditing } = useNoteForm();

    const { data, isLoading, error } = useGetOwnNotesQuery();
    const [deleteNoteById] = useDeleteNoteMutation();
    const [pinNoteToggleById] = useTogglePinnedMutation();

    const handleDeleteNote = async (id: number) => {
        try {
            await deleteNoteById(id).unwrap();
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    };

    const handlePinNote = async (id: number) => {
        try {
            await pinNoteToggleById(id).unwrap();
        } catch (err) {
            console.error("Error pinning note:", err);
        }
    };

    if (isLoading) return <p className="p-8 text-center text-muted-foreground">Loading...</p>;
    if (error) return <p className="p-8 text-center text-destructive">Error loading notes</p>;

    const notes = data?.data ?? [];
    const pinnedNotes = notes.filter((note) => note.isPinned);

    return (
        <div className="container mx-auto">
            <NoteFormPanel showForm={showForm} editingNote={editingNote} onClose={closeForm} />

            <div className="flex justify-between items-center mb-6">
                {editingNote ? (
                    <h2 className="text-md font-semibold text-gray-700"></h2>
                ) : (
                    <h2 className="text-md font-semibold text-gray-700">Pinned Notes</h2>
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

            {pinnedNotes.length === 0 ? (
                <p className="text-muted-foreground text-center py-12">No pinned notes.</p>
            ) : (
                <div className={`grid ${showForm ? "grid-cols-1 md:grid-cols-1 xl:grid-cols-2" : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"} gap-2.5 sm:gap-4`}>
                    {pinnedNotes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onClick={() => startEditing(note)}
                            onPinToggle={() => handlePinNote(note.id)}
                            onDelete={() => handleDeleteNote(note.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}