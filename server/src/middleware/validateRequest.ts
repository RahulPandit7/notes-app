import { Request, Response, NextFunction } from "express";
import { ZodError, ZodIssue, ZodSchema } from "zod";
import logger from "../utils/logger";

export const validateRequest = (
    schema: ZodSchema,
    source: "body" | "query" | "params" = "body"
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = schema.parse(req[source]);
            req[source] = validatedData;
            next();
        } catch (error) {
            logger.error("Request Validation Failed: " + error);
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: error.issues.map((e: ZodIssue) => ({
                        path: e.path.join("."),
                        message: e.message,
                    })),
                });
            }
            next(error);
        }
    };
};
