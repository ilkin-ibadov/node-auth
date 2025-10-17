import { User } from "../models/user.model.js"
import { generateAccessToken } from "../utils/tokenGenerator.js"

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

        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const newUser = new User({ firstname, lastname, email, password });
        await newUser.save();
        const accessToken = generateAccessToken(newUser, res);
        res.status(201).json({ message: "User registered successfully", accessToken });
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