import { comparePassword, hashPassword } from "@/utils/bcrypt";
import { Router } from "express";
import { zodValidator } from "../middlewares/validators";
import { z } from "zod";
import { UnregisterUserSchema, UserSchema } from "../models/user";
import { createAccountToken, decodeAccountToken, refreshAccountToken } from "@/utils/jwt";
import { saveUser } from "@/database/actions/auth/save-user";
import { getUser } from "@/database/actions/auth/get-user";

export const authRouter = Router();

authRouter.get("/", (_, res) => {
    res.send("Auth Router");
});

authRouter.post(
    "/register",
    zodValidator("body", UnregisterUserSchema),
    async (req, res) => {
        const { email, password, payload, bussinessCode } = UnregisterUserSchema.parse(req.body);

        // CREATE hashpassword
        const hashedPassword = await hashPassword(password);

        // CREATE user
        const { refreshToken, token } = createAccountToken(email, payload);

        try {
            // SAVE user
            await saveUser(email, hashedPassword, payload, bussinessCode);
        } catch (error) {
            console.log(error);

            return res.status(400).json({
                message: "Error creating user",
            });
        }

        // RETURN A SESSION
        return res.status(200).json({
            token,
            refreshToken,
        });
    },
);

authRouter.post(
    "/login",
    zodValidator("body", UserSchema),
    async (req, res) => {
        const { email, password, bussinessCode } = UserSchema.parse(req.body);

        try {
            const { password: hashedPassword, payload } = await getUser(email, bussinessCode);

            const isValid = await comparePassword(password, hashedPassword);

            if (!isValid) {
                return res.status(401).json({
                    message: "Invalid email or password",
                });
            }

            const { refreshToken, token } = createAccountToken(email, payload);

            return res.status(200).json({
                token,
                refreshToken,
            });
        }
        catch (error) {
            return res.status(401).json({
                message: 'Invalid user or bussiness code',
            })
        }
    },
);

authRouter.post('/refresh', zodValidator('body', z.object({ refreshToken: z.string() })), async (req, res) => {
    const { refreshToken } = req.body;

    try {
        const { token, refreshToken: newRefreshToken } = refreshAccountToken(refreshToken)

        return res.status(200).json({
            token,
            refreshToken: newRefreshToken
        })
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid refresh token'
        })
    }
})

authRouter.post('/validate', zodValidator('body', z.object({ token: z.string() })), async (req, res) => {
    const { token } = req.body;

    const decoded = decodeAccountToken(token);

    if (!decoded) {
        return res.status(401).json({
            message: 'Invalid token'
        })
    }

    return res.status(200).json(decoded)
})

