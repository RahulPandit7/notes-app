import { Router } from "express";

import {
    fetchNotes,
    addNote,
    deleteNote,
    updateNote,
    togglePinned,
    toggleFavorite,
    fetchNotesStatus,
    fetchTrashNotes,
    restoreNote,
    permanentlyDeleteNote,
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

router.patch("/:id/pin", asyncHandler(togglePinned));
router.patch("/:id/favorite", asyncHandler(toggleFavorite));
router.get("/stats", asyncHandler(fetchNotesStatus));
router.get(
    "/trash",
    asyncHandler(fetchTrashNotes)
);

router.patch(
    "/:id/restore",
    asyncHandler(restoreNote)
);

router.delete(
    "/:id/permanent",
    asyncHandler(permanentlyDeleteNote)
);

export default router;