-- Create schema for OkoaNet
CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS plans (
                                     id SERIAL PRIMARY KEY,
                                     name VARCHAR(100) NOT NULL,
    description TEXT,
    price_ksh INTEGER NOT NULL,
    duration_days INTEGER,
    data_limit_gb DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS payments (
                                        id SERIAL PRIMARY KEY,
                                        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    plan_id INTEGER REFERENCES plans(id) ON DELETE SET NULL,
    amount_ksh INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    provider_txn_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Insert sample OkoaNet plans
INSERT INTO plans (name, description, price_ksh, duration_days, data_limit_gb)
VALUES
    ('Daily Fast', '24 hours high-speed', 40, 1, NULL),
    ('Daily Lite', '24 hours normal-speed', 30, 1, NULL),
    ('Daily 1GB', '1 GB data', 15, 1, 1.0),
    ('Daily 400MB', '400 MB data', 12, 1, 0.4),
    ('Daily 150MB', '150 MB data', 5, 1, 0.15),
    ('12 Hrs Unlimited', 'Unlimited for 12 hours', 20, 0, NULL),
    ('Weekly 2GB', '2 GB valid for 7 days', 40, 7, 2.0),
    ('Weekly Unlimited', '7 days unlimited', 200, 7, NULL),
    ('Monthly 40GB', '40 GB valid 30 days', 500, 30, 40.0),
    ('Monthly Unlimited', '30 days unlimited', 750, 30, NULL)
    ON CONFLICT DO NOTHING;
