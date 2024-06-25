import { JWT_SECRET } from "@/config";
import { updatePayload } from "@/database/actions/auth/update-payload";
import jwt from "jsonwebtoken";

export const createAccountToken = (email: string, payload: object, businessCode: string) => {
    const secret = JWT_SECRET ?? '';
    const token = jwt.sign({ email, payload, businessCode }, secret, {
        expiresIn: '5h'
    });

    const refreshToken = jwt.sign({ email, payload, refresh: true, businessCode }, secret, {
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

export const refreshAccountToken = async (refreshToken: string, payload?: object) => {
    const secret = JWT_SECRET ?? '';

    const decoded = jwt.verify(refreshToken, secret) as {
        email: string,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        payload: { [x: string]: any },
        refresh?: boolean,
        businessCode: string
    };

    if (!decoded.refresh) throw new Error('Invalid refresh token');

    const newPayload = payload ?? decoded.payload;

    await updatePayload(decoded.email, newPayload, decoded.businessCode)

    const objectToSign = { email: decoded.email, payload: newPayload, businessCode: decoded.businessCode }

    const token = jwt.sign(objectToSign, secret, {
        expiresIn: '5h'
    })

    const newRefreshToken = jwt.sign({ ...objectToSign, refresh: true }, secret, {
        expiresIn: '10d'
    });

    return {
        token,
        refreshToken: newRefreshToken
    }
}