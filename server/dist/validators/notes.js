"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteIdParamSchema = exports.noteSchema = void 0;
const zod_1 = require("zod");
exports.noteSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .max(200, "Title must be at most 200 characters")
        .optional(),
    content: zod_1.z
        .string()
        .max(50000, "Content must be at most 50000 characters")
        .optional(),
});
exports.noteIdParamSchema = zod_1.z.object({
    id: zod_1.z
        .string()
        .regex(/^\d+$/, "Invalid note id: must be a positive integer")
        .transform((val) => Number(val))
        .refine((n) => Number.isInteger(n) && n > 0, {
        message: "Invalid note id: must be a positive integer",
    }),
});
