import { Router } from "express";

import {
    fetchNotes,
    addNote,
    deleteNote,
    updateNote,
} from "../controllers/noteController";

import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.get(
    "/",
    asyncHandler(fetchNotes)
);

router.post(
    "/",
    asyncHandler(addNote)
);

router.delete(
    "/:id",
    asyncHandler(deleteNote)
);

router.put(
    "/:id",
    asyncHandler(updateNote)
);

export default router;