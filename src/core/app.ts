import express from "express";
import cors from "cors";
import { routers } from "@/app/routers";
import { NODE_ENV } from "@/config";
import morgan from 'morgan';

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    if (NODE_ENV !== 'production') {
        app.use(morgan('dev'))
    }

    for (const [path, router] of Object.entries(routers)) {
        app.use(path, router);
    }

    return app;
}
