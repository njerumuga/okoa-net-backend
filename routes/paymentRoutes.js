// routes/paymentRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import pool from "../db/config.js";

const router = express.Router();

// Create a simulated payment
router.post("/create", authMiddleware, async (req, res) => {
    try {
        const { plan_id, amount_ksh, phone_number } = req.body;
        if (!plan_id || !amount_ksh || !phone_number) {
            return res.status(400).json({ error: "plan_id, amount_ksh, and phone_number are required" });
        }

        const result = await pool.query(
            `INSERT INTO payments (user_id, plan_id, amount_ksh, status, provider_txn_id)
       VALUES ($1, $2, $3, 'pending', $4) RETURNING *`,
            [req.user.userId, plan_id, amount_ksh, phone_number]
        );

        res.json({
            message: "Payment simulated successfully (pending).",
            payment: result.rows[0],
        });
    } catch (err) {
        console.error("Payment creation error:", err);
        res.status(500).json({ error: "Server error creating payment" });
    }
});

export default router;
