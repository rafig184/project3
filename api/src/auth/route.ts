
import express, { Request, Response, NextFunction } from "express"
import jsonwebtoken from "jsonwebtoken"
import zod from "zod"
import dotenv from "dotenv"
import signUp from "./handlers/signup"
import { login } from "./handlers/login"
import { logger } from "../logger"
dotenv.config()



const authRouter = express.Router();

export const signupSchema = zod.object({
    firstName: zod.string().max(100),
    lastName: zod.string().max(100),
    email: zod.string().email("Incorrect Email"),
    password: zod.string().min(4, "Password is less than 4 characters"),
})


function middlewareSignIn(req: Request, res: Response, next: NextFunction) {
    try {
        signupSchema.parse(req.body)
        return next()
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error")
    }
}

authRouter.post("/sign-up", middlewareSignIn, async function (req, res, next) {
    try {
        const result = await signUp(req.body)
        console.log("User added id", result)
        return res.json({ message: "User successfully added!" })
    } catch (error) {
        console.log(error)
        return res.json({ message: "Email already exists", errorCode: 1062 })
    }
})

const loginSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
})

function middlewareLogin(req: Request, res: Response, next: NextFunction) {
    try {
        loginSchema.parse(req.body)
        return next()
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error")
    }
}

authRouter.post("/login", middlewareLogin, async function (req, res, next) {
    const { email, password } = req.body

    try {
        const { result, userRecord } = await login(email, password);
        console.log(result, userRecord)
        if (!result) throw new Error()
        console.log(userRecord[0].role);
        console.log(`first name is : ${userRecord[0].firstName}`);

        const signedToken = jsonwebtoken.sign({ email: userRecord[0].email, userId: userRecord[0].userId, role: userRecord[0].role, firstName: userRecord[0].firstName }, process.env.SECRET as string, { expiresIn: '10h' })
        res.json({ token: signedToken, role: userRecord[0].role, firstName: userRecord[0].firstName })
    } catch (error) {
        // logger.error({ message: error.message })
        console.log(error);
        return res.status(401).send("User is unauthorized")
    }
})

export { authRouter };