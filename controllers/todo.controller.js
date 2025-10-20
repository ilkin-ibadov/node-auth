import { Todo } from "../models/todo.model.js";

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ author: req.user.id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOne({ _id: id, author: req.user.id });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = new Todo({ title, description, author: req.user.id });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const todo = await Todo.findOne({ _id: id, author: req.user.id });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.completed = completed || todo.completed;
        await todo.save()

        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error(error);
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteTodoWithId = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}