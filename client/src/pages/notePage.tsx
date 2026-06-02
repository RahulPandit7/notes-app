import { useDeleteNoteMutation, useGetNotesQuery, useToggleFavoriteMutation, useTogglePinnedMutation } from "../store/api/noteApi";
import AddNoteForm from "../components/AddNoteForm";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Pencil, Pin, Star, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Note } from "@/types/note";
import SafeHtml from "@/components/SafeHtml";

export default function NotePage() {
    const { data, isLoading, error } = useGetNotesQuery();
    const [deleteNoteById] = useDeleteNoteMutation();
    const [pinNoteToggleById] = useTogglePinnedMutation();
    const [favoriteNoteToggleById] = useToggleFavoriteMutation();
    const [editingNote, setEditingNote] = useState<Note | null>(null);

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
            <h1 className="text-3xl font-bold mb-8 text-center">Notes App</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Form Sidebar */}
                <div className="sticky top-8">
                    <AddNoteForm
                        editingNote={editingNote}
                        onClearEdit={() => setEditingNote(null)}
                    />
                </div>

                {/* Notes List */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Your Notes</h2>
                    <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {notes.length === 0 ? (
                            <p className="text-muted-foreground">No notes yet. Add one!</p>
                        ) : (
                            notes.map((note) => (
                                <Card key={note.id}>
                                    <CardHeader className="relative">
                                        <CardTitle>{note.title}</CardTitle>
                                        <div className="flex gap-1 absolute right-2 top-0">
                                            <Button
                                                onClick={() => setEditingNote({ ...note })}
                                                variant="ghost"
                                                size="icon"
                                                className="cursor-pointer h-6 w-6"
                                            >
                                                <Pencil className="h-3 w-3" />
                                            </Button>
                                            <Button onClick={() => handelPinNote(note.id)} className="cursor-pointer h-6 w-6" variant="ghost" size="icon">
                                                <Pin
                                                    className={`h-3 w-3 transition-colors ${note.isPinned
                                                        ? "fill-orange-500 text-orange-500"
                                                        : "text-muted-foreground hover:text-orange-500"
                                                        }`}
                                                />
                                            </Button>
                                            <Button onClick={() => handelFavoriteNote(note.id)} className="cursor-pointer h-6 w-6" variant="ghost" size="icon">
                                                <Star
                                                    className={`h-3 w-3 transition-colors ${note.isFavorite
                                                        ? "fill-orange-500 text-orange-500"
                                                        : "text-muted-foreground hover:text-orange-500"
                                                        }`}
                                                />
                                            </Button>
                                            <Button
                                                onClick={() => handleDeleteNote(note.id)}
                                                variant="ghost"
                                                size="icon"
                                                className="cursor-pointer h-6 w-6"
                                            >
                                                <Trash className="h-2.5 w-2.5" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <SafeHtml html={note.content} />
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
