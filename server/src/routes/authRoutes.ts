import { Router } from "express";

import { login, register } from "../controllers/authController";
import { asyncHandler } from "../middleware/asyncHandler";
import { validateRequest } from "../middleware/validateRequest";
import {
    loginSchema,
    registerSchema,
} from "../validators/auth";

const router = Router();

router.post(
    "/register",
    validateRequest(registerSchema),
    asyncHandler(register)
);

router.post(
    "/login",
    validateRequest(loginSchema),
    asyncHandler(login)
);

export default router;
