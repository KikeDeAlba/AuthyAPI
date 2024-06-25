import { JWT_SECRET } from "@/config";
import jwt from "jsonwebtoken";

export const createAccountToken = (email: string, payload: object) => {
    const secret = JWT_SECRET ?? '';
    const token = jwt.sign({ email, payload }, secret, {
        expiresIn: '5h'
    });

    const refreshToken = jwt.sign({ email, payload, refresh: true }, secret, {
        expiresIn: '10d'
    });

    return {
        token,
        refreshToken
    }
}


export const decodeAccountToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET ?? '')
}

export const refreshAccountToken = (refreshToken: string, payload?: object) => {
    const secret = JWT_SECRET ?? '';

    const decoded = jwt.verify(refreshToken, secret) as {
        email: string,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        payload: any,
        refresh?: boolean
    };

    if (!decoded.refresh) throw new Error('Invalid refresh token');

    const newPayload = payload ?? decoded.payload;

    const token = jwt.sign({ email: decoded.email, payload: newPayload }, secret, {
        expiresIn: '5h'
    })

    const newRefreshToken = jwt.sign({ email: decoded.email, payload: newPayload, refresh: true }, secret, {
        expiresIn: '10d'
    });

    return {
        token,
        refreshToken: newRefreshToken
    }
}