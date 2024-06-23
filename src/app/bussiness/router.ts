import { Router } from "express";

export const bussinessRouter = Router();

bussinessRouter.get('/register', (_, res) => {
    const newBusinessCode = crypto.randomUUID()

    return res.send(200).json({
        bussinessCode: newBusinessCode
    })
})