import { turso } from "@/database/client"

// user:
// {
//     columns: [ 'id', 'email', 'password', 'payload' ],
//     columnTypes: [ 'INTEGER', 'TEXT', 'TEXT', 'TEXT' ],
//     rows: [
//       [
//         8,
//         '287371@test.com',
//         '$2b$10$Sl8RthNwrTkCZ9zrDvEd8.0.IYUhO79nxDWbtmXlDaOjJcM.MFEFu',
//         '{"test":"test"}'
//       ]
//     ],
//     rowsAffected: 0,
//     lastInsertRowid: null
//   }


// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function formatUserData(data: { columns: any; rows: any; }) {
    const { columns, rows } = data;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return rows.map((row: { [x: string]: any; }) => {
        const user = {};
        columns.forEach((col: string | number, index: string | number) => {
            // @ts-expect-error - this is a hack to get around the fact that the types are wrong
            user[col] = row[index];
        });
        return user;
    });
}

export const getUser = async (email: string, bussinessCode: string) => {
    const users = await turso.execute({
        sql: 'SELECT * FROM users WHERE email = ? AND bussiness_code = ?',
        args: [email, bussinessCode]
    })

    const formattedUsers = formatUserData(users);

    return formattedUsers[0]
}