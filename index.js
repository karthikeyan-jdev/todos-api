import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5174",
    "https://todos-web-eta.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
