import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import pool from "./db/config.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"; // import payment routes

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Database connection test
pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .catch((err) => console.error("❌ Database connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes); // mount payment routes

// Default route
app.get("/", (req, res) => {
    res.send("OkoaNet Backend Running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
