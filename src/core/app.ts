import express from "express";
import cors from "cors";
import { routers } from "@/app/routers";

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    for (const [path, router] of Object.entries(routers)) {
        app.use(path, router);
    }

    return app;
}
