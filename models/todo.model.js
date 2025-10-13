import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minLength: [3, "Title must be at least 3 characters long"],
        maxLength: [20, "Title must be at most 20 characters long"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minLength: [3, "Description must be at least 3 characters long"],
        maxLength: [50, "Description must be at most 20 characters long"],
    },
    completed: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })


export const Todo = mongoose.model("Todo", todoSchema);