import { turso } from "@/database/client"

export const saveUser = async (email: string, password: string, payload: object, businessCode: string) => {
    try {
        await turso.execute({
            sql: 'INSERT INTO business_codes (business_code) VALUES (?)',
            args: [businessCode]
        })
    } catch {
        // do nothing
    }

    await turso.execute({
        sql: 'INSERT INTO users (email, password, payload, business_code) VALUES (?, ?, ?, ?)',
        args: [email, password, JSON.stringify(payload), businessCode]
    })
}