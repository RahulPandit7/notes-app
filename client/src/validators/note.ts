import z from "zod";

export const noteSchema = z.object({
    title: z.string(),
    content: z.string(),
});

export type NoteFormType = z.infer<typeof noteSchema>;