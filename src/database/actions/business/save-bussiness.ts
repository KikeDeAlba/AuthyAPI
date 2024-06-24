import { turso } from "@/database/client"

export const saveBussiness = async (businessCode: string) => {
    await turso.execute({
        sql: 'INSERT INTO business_codes (business_code) VALUES (?)',
        args: [businessCode]
    })
}