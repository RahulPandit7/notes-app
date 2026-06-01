import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notes", noteRoutes);

app.use(errorMiddleware);


app.listen(3000, () => {
    console.log("Server running on port 3000");
});