DROP TABLE users;
DROP TABLE business_codes;

CREATE TABLE business_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    business_code TEXT UNIQUE NOT NULL
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    payload TEXT,
    business_code TEXT NOT NULL,
    FOREIGN KEY (business_code) REFERENCES business_codes (business_code) ON DELETE CASCADE
);


