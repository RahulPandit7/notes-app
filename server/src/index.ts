import "dotenv/config";
import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes";
import authRoutes from "./routes/authRoutes";
import { errorMiddleware } from "./middleware/errorMiddleware";
import logger from "./utils/logger";

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://randrnotes.toolbaaar.com",
    "https://www.randrnotes.toolbaaar.com",
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS policy: origin '${origin}' is not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Explicitly handle preflight OPTIONS requests (regex wildcard for Express v5 compatibility)
app.options(/\/.*/, cors());
app.use(express.json());

app.get(["/"], (req, res) => {
    res.json({ status: "ok", message: "Notes API is running" });
});

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);


app.use(errorMiddleware);

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});