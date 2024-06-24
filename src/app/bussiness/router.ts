import { saveBussiness } from "@/database/actions/business/save-bussiness";
import { Router } from "express";

export const businessRouter = Router();

businessRouter.get('/register', async (_, res) => {
    const newBusinessCode = crypto.randomUUID()

    try {

        await saveBussiness(newBusinessCode)

        return res.status(200).json({
            businessCode: newBusinessCode
        })

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            message: "Error creating bussiness",
        });
    }
})