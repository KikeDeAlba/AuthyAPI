import type { Router } from "express";
import { authRouter } from "./auth/router";
import { businessRouter } from "./bussiness/router";

export const routers: {
    [key: string]: Router
} = {
    '/auth': authRouter,
    '/business': businessRouter
};
