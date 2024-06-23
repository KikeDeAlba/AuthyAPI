import * as dotenv from "dotenv";
dotenv.config();

export const {
    TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN,
    JWT_SECRET,
    NODE_ENV
} = process.env;