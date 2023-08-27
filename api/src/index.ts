// const express = require("express")
import express, { Request, Response, NextFunction } from "express"
import { pool } from "./database"
import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"
import cors from "cors"
import { logger } from "./logger"
import { authRouter } from "./auth/route"
import { vacationsRouter } from "./vacations/routes"
import { followerRouter } from "./followers/routes"
import { addRequestStarted } from "./middleware/addRequestStarted"
import { addRequestFinished } from "./middleware/addRequestFinished"
import { addRequestId } from "./middleware/addRequestId"

dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())
app.use(addRequestId)
app.use(addRequestStarted)
app.use(addRequestFinished)

app.get("/health-check", function (req, res, next) {
    res.send(`API IS OK ${new Date().toISOString()}`)
})

app.use("/auth", authRouter)
app.use(verifyAuthentication)
app.use("/vacations", vacationsRouter)
app.use("/followers", followerRouter)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error({ message: err.message })
    console.log({ message: err.message })
    res.status(500).send("Something went wrong")
})

app.listen(process.env.PORT, () => {
    logger.info({ message: `Api is running on Port ${process.env.PORT}` })
    console.log({ message: `Api is running on Port ${process.env.PORT}` })
})

function verifyAuthentication(req: Request, res: Response, next: NextFunction) {
    const { authorization: token } = req.headers
    jsonwebtoken.verify(token as string, process.env.SECRET as string, function (err: any, decoded: any) {
        if (err) {
            // console.log(`${new Date().toISOString()} => requestId: ${res.getHeader("x-request-id")} | User Token invalid ${err.message}`)
            logger.error(`${new Date().toISOString()} => requestId: ${res.getHeader("x-request-id")} | User Token invalid ${err.message}`)

            return res.status(401).send("Authentication error")
        } else {
            (req as any).currentEmail = decoded.email;
            (req as any).currentUserId = decoded.userId;
            (req as any).currentRole = decoded.role;
            (req as any).currentFirstName = decoded.firstName;
            logger.info(`${new Date().toISOString()} => requestId: ${res.getHeader("x-request-id")} | User authenticated Successfully`)
            return next()
        }
    });
}
