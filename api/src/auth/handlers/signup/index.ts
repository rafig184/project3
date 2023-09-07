import bcrypt from "bcrypt";
import { pool } from "../../../database"


interface IPayload {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}
const saltRounds = 10
export default async function signUp(signUpPayload: IPayload): Promise<any> {
    const { email, firstName, lastName, password } = signUpPayload
    const hashedPassword = await getHashedPassword(password)
    const query = "INSERT INTO `vacationsapp`.`users` (`firstName`, `lastName`, `email`, `password`, `salt`) VALUES (?,?,?,?,?)";
    const result = await pool.execute(query, [firstName, lastName, email, hashedPassword.password, hashedPassword.salt])
    const [data] = result;
    console.log(data);

    return data
}

export async function getHashedPassword(password: string, salt?: string): Promise<{ password: string, salt?: string }> {
    const s = salt || bcrypt.genSaltSync(saltRounds)
    const hashed = await bcrypt.hash(password, s)
    return { password: hashed, salt: s }
}

