import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error(err.message || err);

    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};