import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-me";

export interface AuthRequest extends Request {
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

export const authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError(
                "Access denied. No token provided.",
                401
            );
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: number;
        };

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, name: true, email: true },
        });

        if (!user) {
            throw new AppError("User not found", 401);
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof AppError) {
            return next(error);
        }

        if (
            error instanceof jwt.JsonWebTokenError ||
            error instanceof jwt.TokenExpiredError
        ) {
            return next(
                new AppError("Invalid or expired token", 401)
            );
        }

        next(error);
    }
};
