sqlite3 liftsqlite.db

CREATE TABLE IF NOT EXISTS todoData (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  value TEXT NOT NULL
);

INSERT INTO todoData (value) VALUES ('First todo');

SELECT * FROM todoData;





-- Table for users
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Auto-incrementing primary key
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,  -- Ensures email is unique across users
    password TEXT NOT NULL,
    avatar TEXT,  -- Optional field for user avatar
    weight_unit TEXT DEFAULT 'kg',  -- Preferred weight unit (e.g., kg, lb)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table for biometric histories
CREATE TABLE biometric_histories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Auto-incrementing primary key
    weight REAL NOT NULL,  -- Weight in base unit (kilograms)
    height REAL NOT NULL,  -- Height in centimeters (with decimals)
    bmi REAL,  -- Body mass index, optional
    fat_percentage REAL,  -- Optional body fat percentage
    date DATE NOT NULL,  -- Date of the biometric record
    user_id INTEGER NOT NULL,  -- Foreign key to users table
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for better query performance
CREATE INDEX idx_user_id ON biometric_histories(user_id);
CREATE INDEX idx_biometric_date ON biometric_histories(date);
