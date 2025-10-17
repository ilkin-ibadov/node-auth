import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.route.js"
import authRoutes from "./routes/auth.route.js"

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
  connectDB()
})