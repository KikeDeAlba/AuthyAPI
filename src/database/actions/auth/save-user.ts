import { turso } from "@/database/client"

export const saveUser = async (email: string, password: string, payload: object) => {
    await turso.execute({
        sql: 'INSERT INTO users (email, password, payload) VALUES (?, ?, ?)',
        args: [email, password, JSON.stringify(payload)]
    })
}