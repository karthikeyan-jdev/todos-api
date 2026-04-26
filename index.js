import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

// ✅ ONLY run locally
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
