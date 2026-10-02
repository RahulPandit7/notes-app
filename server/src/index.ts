import "dotenv/config";
import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes";
import authRoutes from "./routes/authRoutes";
import { errorMiddleware } from "./middleware/errorMiddleware";
import logger from "./utils/logger";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Health check route
app.get(["/", "/randrnotes"], (req, res) => {
    res.json({ status: "ok", message: "Notes API is running" });
});

// Support both standard routes and /randrnotes base URI
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/randrnotes/auth", authRoutes);
app.use("/randrnotes/notes", noteRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});