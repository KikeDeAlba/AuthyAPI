import { Router } from "express";
import { zodValidator } from "../middlewares/validators";
import { z } from "zod";
import { UnregisterUserSchema, UserSchema } from "../models/user";
import { registerController } from "./controllers/register";
import { loginController } from "./controllers/login";
import { refreshController } from "./controllers/refresh";
import { validateController } from "./controllers/validate";

export const authRouter = Router();

authRouter.get("/", (_, res) => {
    res.send("Auth Router");
});

authRouter.post(
    "/register",
    zodValidator("body", UnregisterUserSchema),
    registerController
);

authRouter.post(
    "/login",
    zodValidator("body", UserSchema),
    loginController
);

authRouter.post(
    '/refresh',
    zodValidator('body', z.object({ refreshToken: z.string() })),
    refreshController
)

authRouter.post(
    '/validate',
    zodValidator('body', z.object({ token: z.string() })),
    validateController
)

