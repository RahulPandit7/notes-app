import "dotenv/config";
import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes";
import authRoutes from "./routes/authRoutes";
import { errorMiddleware } from "./middleware/errorMiddleware";
import logger from "./utils/logger";

const app = express();
const port = Number(process.env.PORT) || 3000

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});