import { Request, Response } from "express";
import {
    loginUser,
    registerUser,
} from "../services/authService";
import {
    sendError,
    sendSuccess,
} from "../utils/apiResponse";

export const login = async (
    req: Request,
    res: Response
) => {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    return sendSuccess(res, "Login successful", result);
};

export const register = async (
    req: Request,
    res: Response
) => {
    const { name, email, password } = req.body;

    const result = await registerUser(
        name,
        email,
        password
    );

    return sendSuccess(
        res,
        "Registration successful",
        result,
        201
    );
};