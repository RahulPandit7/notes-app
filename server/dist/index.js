"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://randrnotes.toolbaaar.com",
    "http://randrnotes.toolbaaar.com",
    "https://www.randrnotes.toolbaaar.com",
    "http://www.randrnotes.toolbaaar.com"
];
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no Origin header
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS policy: origin '${origin}' is not allowed`));
    },
    credentials: true,
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
    ],
};
app.use((0, cors_1.default)(corsOptions));
// Don't add another app.options() handler.
// cors() above automatically handles preflight requests.
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Notes API is running",
    });
});
app.use("/auth", authRoutes_1.default);
app.use("/notes", noteRoutes_1.default);
app.use(errorMiddleware_1.errorMiddleware);
app.listen(port, "0.0.0.0", () => {
    logger_1.default.info(`Server running on port ${port}`);
});
