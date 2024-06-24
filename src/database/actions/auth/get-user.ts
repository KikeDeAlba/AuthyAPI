import { turso } from "@/database/client"
import { formatResultData } from "@/database/utils/format";

export const getUser = async (email: string, businessCode: string) => {
    const users = await turso.execute({
        sql: 'SELECT * FROM users WHERE email = ? AND business_code = ?',
        args: [email, businessCode]
    })

    const formattedUsers = formatResultData(users);

    if (formattedUsers.length === 0) throw new Error('User not found');

    return formattedUsers[0]
}