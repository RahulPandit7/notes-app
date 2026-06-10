import { z } from "zod";

export const noteSchema = z.object({
    title: z
        .string()
        .trim()
        .max(200, "Title must be at most 200 characters")
        .optional(),
    content: z
        .string()
        .max(50_000, "Content must be at most 50000 characters")
        .optional(),
});

export const noteIdParamSchema = z.object({
    id: z
        .string()
        .regex(/^\d+$/, "Invalid note id: must be a positive integer")
        .transform((val) => Number(val))
        .refine((n) => Number.isInteger(n) && n > 0, {
            message: "Invalid note id: must be a positive integer",
        }),
});

export type NoteInput = z.infer<typeof noteSchema>;
export type NoteIdParam = z.infer<typeof noteIdParamSchema>;
