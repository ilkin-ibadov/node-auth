import express from "express";
import { createTodo, deleteTodo, deleteTodoWithId, getAllTodos, getTodoById, updateTodo } from "../controllers/todo.controller.js";
import { isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllTodos);

router.get("/todo/:id", getTodoById);

router.post("/new", createTodo);

router.put("/update/:id", updateTodo);

router.delete("/delete/:id", deleteTodo);

router.delete("/adminDelete/:id", isAdmin, deleteTodoWithId);

export default router;