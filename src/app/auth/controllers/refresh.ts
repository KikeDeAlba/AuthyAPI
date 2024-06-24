import { refreshAccountToken } from "@/utils/jwt";
import type { Request, Response } from "express";

export const refreshController = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    try {
        const { token, refreshToken: newRefreshToken } =
            refreshAccountToken(refreshToken);

        return res.status(200).json({
            token,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        return res.status(401).json({
            message: "Invalid refresh token",
        });
    }
};
