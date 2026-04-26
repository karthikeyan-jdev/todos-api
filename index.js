import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// Connect DB
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

// ✅ ONLY run locally
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
