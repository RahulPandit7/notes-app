import { Router } from "express";

import {
    fetchNotes,
    addNote,
    deleteNote,
    updateNote,
} from "../controllers/noteController";

import { asyncHandler } from "../middleware/asyncHandler";
import { validateRequest } from "../middleware/validateRequest";
import { noteSchema } from "../validators/notes";

const router = Router();

router.get(
    "/",
    asyncHandler(fetchNotes)
);

router.post(
    "/",
    validateRequest(noteSchema, "body"),
    asyncHandler(addNote)
);

router.delete(
    "/:id",
    asyncHandler(deleteNote)
);

router.put(
    "/:id",
    validateRequest(noteSchema, "body"),
    asyncHandler(updateNote)
);

export default router;