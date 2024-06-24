import { UnregisterUserSchema } from "@/app/models/user";
import { saveUser } from "@/database/actions/auth/save-user";
import { hashPassword } from "@/utils/bcrypt";
import { createAccountToken } from "@/utils/jwt";
import type { Request, Response } from "express";

export const registerController = async (req: Request, res: Response) => {
    const { email, password, payload, businessCode } = UnregisterUserSchema.parse(
        req.body,
    );

    // CREATE hashpassword
    const hashedPassword = await hashPassword(password);

    // CREATE user
    const { refreshToken, token } = createAccountToken(email, payload);

    try {
        // SAVE user
        await saveUser(email, hashedPassword, payload, businessCode);
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
};
