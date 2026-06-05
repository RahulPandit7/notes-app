import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNoteMutation, useUpdateNoteMutation } from "../store/api/noteApi";
import Editor from "../editor/Editor";
import { Button } from "./ui/button";
import { useEffect } from "react";
import type { Note } from "@/types/note";
import { noteSchema, type NoteFormType } from "@/validators/note";
import { closeNoteForm } from "@/store/slices/uiSlice";
import { useDispatch } from "react-redux";
import generateTitle from "@/helper/generateTitle ";

interface AddNoteFormProps {
    editingNote?: Note | null;
    onClearEdit?: () => void;
}

export default function AddNoteForm({ editingNote, onClearEdit }: AddNoteFormProps) {
    const dispatch = useDispatch();
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
            const payload = {
                title: generateTitle(data.title, data.content),
                content: data.content || "",
            };

            if (editingNote) {
                await updateNote({
                    id: editingNote.id,
                    data: payload,
                }).unwrap();

                onClearEdit?.();
            } else {
                await createNote(payload).unwrap();

                onClearEdit?.();
            }

            methods.reset({
                title: "",
                content: "",
            });

            dispatch(closeNoteForm());
        } catch (error) {
            console.error("Failed to save note:", error);
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4 w-full"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{editingNote ? "Update Note" : "Add New Note"}</h2>
                    {(editingNote || onClearEdit) && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => {
                            if (onClearEdit) onClearEdit();
                            methods.reset({ title: "", content: "" });
                        }}>
                            Cancel
                        </Button>
                    )}
                </div>
                <div className="mb-4">
                    <Editor
                        title={methods.watch("title")}
                        content={methods.watch("content")}
                        onChangeTitle={(val) => methods.setValue("title", val, { shouldValidate: true, shouldDirty: true })}
                        onChangeContent={(val) => methods.setValue("content", val, { shouldValidate: true, shouldDirty: true })}
                    />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Saving..." : editingNote ? "Update Note" : "Add Note"}
                </Button>
            </form>
        </FormProvider>
    );
}
