import { turso } from "@/database/client"

export const updatePayload = async (email: string, payload: object, businessCode: string) => {
    await turso.execute({
        sql: 'UPDATE users SET payload = ? WHERE email = ? AND business_code = ?',
        args: [JSON.stringify(payload), email, businessCode]
    })
}