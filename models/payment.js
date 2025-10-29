const pool = require('../db/config');

const createPayment = async ({ user_id, plan_id, amount_ksh, status = 'pending', provider_txn_id = null }) => {
    const result = await pool.query(
        `INSERT INTO payments (user_id, plan_id, amount_ksh, status, provider_txn_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [user_id, plan_id, amount_ksh, status, provider_txn_id]
    );
    return result.rows[0];
};

const updatePaymentStatus = async (paymentId, status, providerTxnId = null) => {
    const result = await pool.query(
        `UPDATE payments SET status = $1, provider_txn_id = COALESCE($2, provider_txn_id) WHERE id = $3 RETURNING *`,
        [status, providerTxnId, paymentId]
    );
    return result.rows[0];
};

module.exports = { createPayment, updatePaymentStatus };
