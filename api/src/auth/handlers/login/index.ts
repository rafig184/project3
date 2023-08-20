import { pool } from "../../../database"
import { getHashedPassword } from "../signup"
export async function getUserByEmail(email: string): Promise<any> {
    if (!email) throw new Error("getUserByEmail() Fn missing Email")
    const query = `SELECT * FROM vacationsapp.users where email = ?`
    const result = await pool.execute(query, [email])
    console.log(result[0]);
    const data = result[0];
    return data
}

export async function login(email: string, passwords: string): Promise<{ result: boolean, userRecord: any }> {
    const userRecord = await getUserByEmail(email);
    if (!userRecord) throw new Error("User not exist");
    const { password: userRecordPassword, salt: userRecordSalt } = userRecord[0] as any
    const hashedPassword = await getHashedPassword(passwords, userRecordSalt)
    const result = hashedPassword.password === userRecordPassword
    console.log(hashedPassword.password);

    return { result, userRecord };
}