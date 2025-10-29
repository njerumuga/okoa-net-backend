import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use Render's database URL
    ssl: { rejectUnauthorized: false },         // Required for Render Postgres
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export default pool;
