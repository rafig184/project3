
import express, { NextFunction, Request, Response } from "express"
import zod from "zod"
import { addNewFollower } from "./handlers/addNewFollower"
import { removeFollower } from "./handlers/deleteFollower"
import { getAllFollowers } from "./handlers/getAllFollowers"



const followerRouter = express.Router()

followerRouter.get("/", async function (req, res, next) {
    try {
        const result = await getAllFollowers()
        console.log(result);
        return res.json(result)
    } catch (error) {
        console.log(error);
        return next(error)
    }
})

followerRouter.delete("/", async function (req: Request, res: Response, next: NextFunction) {

    try {
        const results = await removeFollower(req.body);
        res.json({ message: "Follower removed successfully", results });
    } catch (error) {
        console.error(error);
        return next(error);
    }
})


export const newFollowerSchema = zod.object({
    userId: zod.number(),
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
        const result = await addNewFollower(req.body)
        console.log(result)
        return res.json({ message: "Follower successfully added!" })
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

// vacationsRouter.get("/search", async function (req: Request, res: Response, next: NextFunction) {
//     try {
//         const groupName = req.query.q
//         const result = await getMeetingSearch(groupName)
//         return res.json(result)
//     } catch (error) {
//         console.log(error);
//         return next(error)
//     }
// })




export { followerRouter }