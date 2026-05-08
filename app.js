import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:4173", "https://todos-web-eta.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

export default app;