CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    payload TEXT,
    bussiness_code TEXT UNIQUE NOT NULL
);

DROP TABLE users;