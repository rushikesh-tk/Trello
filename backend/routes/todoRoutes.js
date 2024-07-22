import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.route("/").get(protect, getTodos);
router.route("/create").post(protect, createTodo);
router.route("/update").put(protect, updateTodo);
router.route("/delete/:id").delete(protect, deleteTodo);

export default router;
