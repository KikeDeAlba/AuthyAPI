import { decodeAccountToken } from "@/utils/jwt";
import type { Request, Response } from "express";

export const validateController = async (req: Request, res: Response) => {
    const { token } = req.body;

    const decoded = decodeAccountToken(token);

    if (!decoded) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }

    return res.status(200).json(decoded);
};
