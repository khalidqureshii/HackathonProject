import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { fileURLToPath } from "url";
import router from "./router/auth-router.js";
import { connectDB } from "./utils/db.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import cors from "cors";
import postRoutes from "./router/post-router.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/posts", postRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(errorMiddleware);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
  });
});
