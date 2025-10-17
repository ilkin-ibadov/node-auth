import express from "express";
import { login, register, getUserInfo } from "../controllers/auth.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

// router.post("/refreshToken",);

router.get("/me", protect, getUserInfo);

export default router;