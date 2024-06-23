import type { Router } from "express";
import { authRouter } from "./auth/router";

export const routers: {
    [key: string]: Router
} = {
    '/auth': authRouter
};
