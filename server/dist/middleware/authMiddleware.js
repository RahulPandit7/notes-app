"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
const AppError_1 = require("../utils/AppError");
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-me";
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError_1.AppError("Access denied. No token provided.", 401);
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await prisma_1.default.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, name: true, email: true },
        });
        if (!user) {
            throw new AppError_1.AppError("User not found", 401);
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            return next(error);
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError ||
            error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return next(new AppError_1.AppError("Invalid or expired token", 401));
        }
        next(error);
    }
};
exports.authenticate = authenticate;
