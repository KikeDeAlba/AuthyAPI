import { turso } from "@/database/client"

export const getUser = async (email: string) => {
    const user = await turso.execute({
        sql: 'SELECT * FROM users WHERE email = ?',
        args: [email]
    })

    return user.toJSON()
}