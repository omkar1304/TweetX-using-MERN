import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./database/db.js";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  // origin: 'http://localhost:5173',
  credentials: true, // Enable credentials (cookies)
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("Working!");
});

app.listen(8000, () => {
  console.log("Server running on port: 8000");
});
