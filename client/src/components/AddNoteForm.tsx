import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNoteMutation, useUpdateNoteMutation } from "../store/api/noteApi";
import FormField from "./form/FormField";
import { Button } from "./ui/button";
import { useEffect } from "react";
import type { Note } from "@/types/note";
import { noteSchema, type NoteFormType } from "@/validators/note";

interface AddNoteFormProps {
    editingNote?: Note | null;
    onClearEdit?: () => void;
}

export default function AddNoteForm({ editingNote, onClearEdit }: AddNoteFormProps) {
    const [createNote, { isLoading: isCreating }] = useCreateNoteMutation();
    const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

    const isLoading = isCreating || isUpdating;

    const methods = useForm<NoteFormType>({
        resolver: zodResolver(noteSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    useEffect(() => {
        if (editingNote) {
            methods.reset({
                title: editingNote.title,
                content: editingNote.content,
            });
        } else {
            methods.reset({
                title: "",
                content: "",
            });
        }
    }, [editingNote, methods]);

    const onSubmit = async (data: NoteFormType) => {
        try {
            if (editingNote) {
                await updateNote({ id: editingNote.id, data }).unwrap();
                if (onClearEdit) onClearEdit();
            } else {
                await createNote(data).unwrap();
            }
            methods.reset({ title: "", content: "" });
        } catch (error) {
            console.error("Failed to save note:", error);
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4 max-w-md bg-card p-6 rounded-lg border shadow-sm"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{editingNote ? "Update Note" : "Add New Note"}</h2>
                    {editingNote && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => {
                            if (onClearEdit) onClearEdit();
                            methods.reset({ title: "", content: "" });
                        }}>
                            Cancel
                        </Button>
                    )}
                </div>
                <FormField
                    name="title"
                    label="Title"
                />
                <FormField
                    name="content"
                    label="Content"
                    textarea
                    rows={4}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Saving..." : editingNote ? "Update Note" : "Add Note"}
                </Button>
            </form>
        </FormProvider>
    );
}
