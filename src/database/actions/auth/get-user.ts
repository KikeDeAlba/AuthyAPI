import { turso } from "@/database/client"
import { formatResultData } from "@/database/utils/format";

export const getUser = async (email: string, bussinessCode: string) => {
    const users = await turso.execute({
        sql: 'SELECT * FROM users WHERE email = ? AND bussiness_code = ?',
        args: [email, bussinessCode]
    })

    const formattedUsers = formatResultData(users);

    return formattedUsers[0]
}