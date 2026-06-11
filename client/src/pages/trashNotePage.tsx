import { NoteCard } from "@/components/NoteCard";
import { useFetchTrashNotesQuery, useRestoreMutation, useDeleteForeverMutation } from "@/store/api/noteApi";

const TrashNotePage = () => {
    const { data: trashNotes, isError, isLoading } = useFetchTrashNotesQuery();
    const [restoreNote] = useRestoreMutation();
    const [deleteForeverNote] = useDeleteForeverMutation();

    const handleRestore = async (id: number) => {
        try {
            await restoreNote(id).unwrap();
        } catch (error) {
            console.error("Failed to restore note:", error);
        }
    };

    const handleDeleteForever = async (id: number) => {
        try {
            await deleteForeverNote(id).unwrap();
        } catch (error) {
            console.error("Failed to delete note permanently:", error);
        }
    };

    if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;

    if (isError) return <div className="p-8 text-center text-destructive">Error: Failed to fetch trash notes</div>;

    const notes = trashNotes?.data ?? [];

    return (
        <div className="container mx-auto py-8 ">
            <h2 className="text-2xl font-semibold mb-6">Trash Notes</h2>
            {notes.length === 0 ? (
                <p className="text-muted-foreground text-center py-12">No notes in Trash.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            isTrash={true}
                            onRestore={() => handleRestore(note.id)}
                            onDeleteForever={() => handleDeleteForever(note.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrashNotePage;