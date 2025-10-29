import pool from "../db/config.js";

export async function createUser(email, hashedPassword) {
    const result = await pool.query(
        `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at`,
        [email, hashedPassword]
    );
    return result.rows[0];
}

export async function findByEmail(email) {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return result.rows[0];
}

export async function findById(id) {
    const result = await pool.query(`SELECT id, email, created_at FROM users WHERE id = $1`, [id]);
    return result.rows[0];
}
