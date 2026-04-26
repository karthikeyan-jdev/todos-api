import express from "express";
import {
  postTodos,
  getTodos,
  updateTodos,
  deleteTodos,
} from "../controllers/todoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CRUD operations for todos
router.post("/", protect, postTodos);
router.get("/", protect, getTodos);
router.put("/:id", protect, updateTodos);
router.delete("/:id", protect, deleteTodos);

export default router;
