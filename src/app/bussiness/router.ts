import { Router } from "express";

export const businessRouter = Router();

businessRouter.get('/register', (_, res) => {
    const newBusinessCode = crypto.randomUUID()

    return res.status(200).json({
        bussinessCode: newBusinessCode
    })
})