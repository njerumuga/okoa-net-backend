import express from "express";
import { getAllPlans, getPlanById } from "../models/Plan.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const plans = await getAllPlans();
        res.json({ plans });
    } catch (err) {
        console.error("get plans error", err);
        res.status(500).json({ error: "Server error fetching plans" });
    }
});

router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const plan = await getPlanById(req.params.id);
        if (!plan) return res.status(404).json({ error: "Plan not found" });
        res.json({ plan });
    } catch (err) {
        console.error("get plan by id error", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
