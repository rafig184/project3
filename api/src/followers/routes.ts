
import express, { NextFunction, Request, Response } from "express"
import zod from "zod"
import { addNewFollower } from "./handlers/addNewFollower"
import { removeFollower } from "./handlers/deleteFollower"
import { getAllFollowersReports } from "./handlers/getAllFollowers"
import { getFollowersById } from "./handlers/getFollowersById"



const followerRouter = express.Router()

followerRouter.get("/reports", async function (req, res, next) {
    try {
        const result = await getAllFollowersReports()
        console.log(result);
        return res.json(result)
    } catch (error) {
        console.log(error);
        return next(error)
    }
})

followerRouter.delete("/", async function (req: Request, res: Response, next: NextFunction) {

    try {
        const vacationId: any = req.query.q;
        const userId = (req as any).currentUserId
        const results = await removeFollower(vacationId, userId);
        res.json({ message: "Follower removed successfully", results });
    } catch (error) {
        console.error(error);
        return next(error);
    }
})


export const newFollowerSchema = zod.object({
    vacationId: zod.number(),
})


function middlewareNewFollower(req: Request, res: Response, next: NextFunction) {
    try {
        newFollowerSchema.parse(req.body)
        console.log(req.body);
        return next()
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

followerRouter.post("/new-follower", middlewareNewFollower, async function (req, res, next) {
    try {
        const { vacationId } = req.body
        const userId = (req as any).currentUserId
        const result = await addNewFollower(userId, vacationId)
        console.log(result)
        return res.json({ message: "Follower successfully added!" })
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

followerRouter.get("/user-id", async function (req, res, next) {
    try {
        const userId = (req as any).currentUserId
        const result = await getFollowersById(userId)
        console.log(result);
        return res.json(result)
    } catch (error) {
        console.log(error);
        return next(error)
    }
})



export { followerRouter }