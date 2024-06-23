import { JWT_SECRET } from "@/config";
import jwt from "jsonwebtoken";

export const createAccountToken = (email: string, payload?: string) => {
    const secret = JWT_SECRET ?? '';
    const jsonPayload = JSON.parse(payload ?? '{}');
    const token = jwt.sign({ email, payload: jsonPayload }, secret, {
        expiresIn: '1h'
    });

    const refreshToken = jwt.sign({ email, payload: jsonPayload, refresh: true }, secret, {
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

export const refreshAccountToken = (refreshToken: string) => {
    const secret = JWT_SECRET ?? '';

    const decoded = jwt.verify(refreshToken, secret) as {
        email: string,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        payload: any,
        refresh?: boolean
    };

    if (!decoded.refresh) throw new Error('Invalid refresh token');

    const token = jwt.sign({ email: decoded.email, payload: decoded.payload }, secret, {
        expiresIn: '1h'
    })

    const newRefreshToken = jwt.sign({ email: decoded.email, payload: decoded.payload, refresh: true }, secret, {
        expiresIn: '10d'
    });

    return {
        token,
        refreshToken: newRefreshToken
    }
}