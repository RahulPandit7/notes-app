"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const logger_1 = __importDefault(require("../utils/logger"));
const validateRequest = (schema, source = "body") => {
    return (req, res, next) => {
        try {
            const validatedData = schema.parse(req[source]);
            req[source] = validatedData;
            next();
        }
        catch (error) {
            logger_1.default.error("Request Validation Failed: " + error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: error.issues.map((e) => ({
                        path: e.path.join("."),
                        message: e.message,
                    })),
                });
            }
            next(error);
        }
    };
};
exports.validateRequest = validateRequest;
