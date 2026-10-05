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

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no Origin header
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(
            new Error(`CORS policy: origin '${origin}' is not allowed`)
        );
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

app.use(cors(corsOptions));

// Don't add another app.options() handler.
// cors() above automatically handles preflight requests.

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Notes API is running",
    });
});

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

app.use(errorMiddleware);

app.listen(port as number, "0.0.0.0", () => {
    logger.info(`Server running on port ${port}`);
});