import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { AuthResponse } from "../types/auth";
import { AppError } from "../utils/AppError";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const generateToken = (userId: number): string => {
    const options: jwt.SignOptions = {
        expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    };
    return jwt.sign({ userId }, JWT_SECRET, options);
};

export const loginUser = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken(user.id);

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
    };
};

export const registerUser = async (
    name: string,
    email: string,
    password: string
): Promise<AuthResponse> => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new AppError("Email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
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