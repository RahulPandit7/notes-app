"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
const AppError_1 = require("../utils/AppError");
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const generateToken = (userId) => {
    const options = {
        expiresIn: JWT_EXPIRES_IN,
    };
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, options);
};
const loginUser = async (email, password) => {
    const user = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new AppError_1.AppError("Invalid email or password", 401);
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError_1.AppError("Invalid email or password", 401);
    }
    const token = generateToken(user.id);
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
    };
};
exports.loginUser = loginUser;
const registerUser = async (name, email, password) => {
    const existingUser = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new AppError_1.AppError("Email already exists", 409);
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    const token = generateToken(user.id);
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
    };
};
exports.registerUser = registerUser;
