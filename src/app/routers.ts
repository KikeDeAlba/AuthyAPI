import type { Router } from "express";
import { authRouter } from "./auth/router";
import { bussinessRouter } from "./bussiness/router";

export const routers: {
    [key: string]: Router
} = {
    '/auth': authRouter,
    '/bussiness': bussinessRouter
};
