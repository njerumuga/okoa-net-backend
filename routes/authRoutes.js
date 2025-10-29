import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, findByEmail } from "../models/User.js";

dotenv.config();

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: "Email and password required" });

        const existing = await findByEmail(email);
        if (existing) return res.status(409).json({ error: "Email already registered" });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await createUser(email, hash);
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ message: "Signup successful", user: { id: user.id, email: user.email }, token });
    } catch (err) {
        console.error("signup error", err);
        res.status(500).json({ error: "Server error during signup" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findByEmail(email);
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ message: "Login successful", user: { id: user.id, email: user.email }, token });
    } catch (err) {
        console.error("login error", err);
        res.status(500).json({ error: "Server error during login" });
    }
});

export default router;
