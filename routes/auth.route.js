import express from "express";
import { login, register, getUserInfo, refreshToken } from "../controllers/auth.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.post("/refresh", refreshToken);

router.get("/me", protect, getUserInfo);

export default router;