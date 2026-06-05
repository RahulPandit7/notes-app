import "dotenv/config";
import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes";
import authRoutes from "./routes/authRoutes";
import { errorMiddleware } from "./middleware/errorMiddleware";
import logger from "./utils/logger";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

app.use(errorMiddleware);

app.listen(3000, "0.0.0.0", () => {
    logger.info("Server running on port 3000");
});