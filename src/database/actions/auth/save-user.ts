import { turso } from "@/database/client"

export const saveUser = async (email: string, password: string, payload: object, bussinessCode: string) => {
    try {
        await turso.execute({
            sql: 'INSERT INTO bussiness_codes (bussiness_code) VALUES (?)',
            args: [bussinessCode]
        })
    } catch {
        // do nothing
    }

    await turso.execute({
        sql: 'INSERT INTO users (email, password, payload, bussiness_code) VALUES (?, ?, ?, ?)',
        args: [email, password, JSON.stringify(payload), bussinessCode]
    })
}