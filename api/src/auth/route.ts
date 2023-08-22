
import express, { Request, Response, NextFunction } from "express"
import jsonwebtoken from "jsonwebtoken"
import zod from "zod"
import dotenv from "dotenv"
import { logger } from "../logger"
import signUp from "./handlers/signup"
import { login } from "./handlers/login"
dotenv.config()



const authRouter = express.Router();

export const signupSchema = zod.object({
    firstName: zod.string().max(100),
    lastName: zod.string().max(100),
    email: zod.string(),
    password: zod.string(),
})


function middlewareSignIn(req: Request, res: Response, next: NextFunction) {
    try {
        signupSchema.parse(req.body)
        return next()
    } catch (error) {
        return res.status(400).send("Error")
    }
}

authRouter.post("/sign-up", middlewareSignIn, async function (req, res, next) {
    try {
        const result = await signUp(req.body)
        console.log("User added id", result)
        return res.json({ message: "user successfully added!" })
    } catch (error) {
        return next(error)
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

        const signedToken = jsonwebtoken.sign({ email: userRecord.email, userId: userRecord.userId, role: userRecord.role, firstName: userRecord.firstName }, "PASSWORD123456789", { expiresIn: '60h' })
        res.json({ token: signedToken, role: userRecord[0].role, firstName: userRecord[0].firstName })
    } catch (error) {
        console.log(error);
        return res.status(401).send("User is unauthorized")
    }
})

export { authRouter };