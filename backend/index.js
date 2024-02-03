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

// const corsOptions = {
//   credentials: true, // Enable credentials (cookies)
// };

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["https://tweetxfrontend.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Serving static files 👇
app.use('/uploads', express.static('uploads'));


app.get("/", (req, res) => {
  return res.status(200).send("Working!");
});

app.listen(8000, () => {
  console.log("Server running on port: 8000");
});
