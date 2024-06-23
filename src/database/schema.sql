DROP TABLE users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    payload TEXT,
    bussiness_code TEXT NOT NULL,
    FOREIGN KEY (bussiness_code) REFERENCES bussiness_codes (bussiness_code)
);

CREATE TABLE bussiness_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bussiness_code TEXT UNIQUE NOT NULL
);
