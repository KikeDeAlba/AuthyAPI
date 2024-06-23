import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";

type ValidatorType = "body" | "query" | "params" | "header";

export const zodValidator =
    <SchemeType>(type: ValidatorType, schema: z.ZodType<SchemeType>) =>
        (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.safeParse(req[type]);

            if (error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return next();
        };
