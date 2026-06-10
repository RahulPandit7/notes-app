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
    ownNotes,
} from "../controllers/noteController";

import { asyncHandler } from "../middleware/asyncHandler";
import { validateRequest } from "../middleware/validateRequest";
import { authenticate } from "../middleware/authMiddleware";
import {
    noteSchema,
    noteIdParamSchema,
} from "../validators/notes";

const router = Router();

// All note routes require a valid JWT
router.use(authenticate);

router.get(
    "/own",
    authenticate,
    asyncHandler(ownNotes)
);

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
    validateRequest(noteIdParamSchema, "params"),
    asyncHandler(deleteNote)
);

router.put(
    "/:id",
    validateRequest(noteIdParamSchema, "params"),
    validateRequest(noteSchema, "body"),
    asyncHandler(updateNote)
);

router.patch(
    "/:id/pin",
    validateRequest(noteIdParamSchema, "params"),
    asyncHandler(togglePinned)
);

router.patch(
    "/:id/favorite",
    validateRequest(noteIdParamSchema, "params"),
    asyncHandler(toggleFavorite)
);

router.get(
    "/stats",
    asyncHandler(fetchNotesStatus)
);

router.get(
    "/trash",
    asyncHandler(fetchTrashNotes)
);

router.patch(
    "/:id/restore",
    validateRequest(noteIdParamSchema, "params"),
    asyncHandler(restoreNote)
);

router.delete(
    "/:id/permanent",
    validateRequest(noteIdParamSchema, "params"),
    asyncHandler(permanentlyDeleteNote)
);

export default router;
