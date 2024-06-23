import { turso } from "@/database/client"

export const saveUser = async (email: string, password: string, payload: object, bussinessCode: string) => {
    await turso.execute({
        sql: 'INSERT INTO users (email, password, payload, bussiness_code) VALUES (?, ?, ?, ?)',
        args: [email, password, JSON.stringify(payload), bussinessCode]
    })
}