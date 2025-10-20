import { User } from "../models/user.model.js"
import { generateAccessToken, generateRefreshToken } from "../utils/tokenGenerator.js"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await user.matchPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const accessToken = generateAccessToken(user, res);
        const refreshToken = generateRefreshToken(user, res);

        user.refreshToken = refreshToken
        await user.save()

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const newUser = new User({ firstname, lastname, email, password });

        const accessToken = generateAccessToken(newUser, res);
        const refreshToken = generateRefreshToken(newUser, res);

        newUser.refreshToken = refreshToken
        await newUser.save()

        res.status(201).json({ message: "User registered successfully", accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -refreshToken");

        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken || req.body.refreshToken
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id)
        if (!user) return res.status(404).json({ error: "User not found" })
        if (user.refreshToken !== token) return res.status(403).json({ error: "Invalid token" })

        const newAccessToken = generateAccessToken(user, res)

        res.status(200).json({ accessToken: newAccessToken })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}