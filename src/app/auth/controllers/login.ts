import { UserSchema } from "@/app/models/user";
import { getUser } from "@/database/actions/auth/get-user";
import { comparePassword } from "@/utils/bcrypt";
import { createAccountToken } from "@/utils/jwt";
import type { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
    const { email, password, businessCode } = UserSchema.parse(req.body);

    try {
        const { password: hashedPassword, payload } = await getUser(
            email,
            businessCode,
        );

        const isValid = await comparePassword(password, hashedPassword);

        if (!isValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const { refreshToken, token } = createAccountToken(
            email,
            JSON.parse(payload),
            businessCode
        );

        return res.status(200).json({
            token,
            refreshToken,
        });
    } catch (error) {
        return res.status(401).json({
            message: "Invalid user or bussiness code",
        });
    }
};
