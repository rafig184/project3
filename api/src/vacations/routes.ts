
import express, { NextFunction, Request, Response } from "express"
import zod from "zod"
import { format } from 'date-fns'
import { getAllVacations } from "./handlers/getAllVacations"
import { removeVacation } from "./handlers/deleteVacation"
import { addVacation } from "./handlers/addVacation"



const vacationsRouter = express.Router()

vacationsRouter.get("/", async function (req, res, next) {
    try {
        const result = await getAllVacations()
        console.log(result);
        return res.json(result)
    } catch (error) {
        console.log(error);
        return next(error)
    }
})

vacationsRouter.delete("/:vacationId", async function (req: Request, res: Response, next: NextFunction) {
    const { vacationId } = req.params;
    try {
        const results = await removeVacation(parseInt(vacationId));
        res.json({ message: "Vacation removed successfully", results });
    } catch (error) {
        console.error(error);
        return next(error);
    }
})

export const newVacationSchema = zod.object({
    destination: zod.string(),
    startDate: zod.string(),
    endDate: zod.string(),
    price: zod.number(),
    desc: zod.string(),
    image: zod.string()
})


function middlewareNewVacation(req: Request, res: Response, next: NextFunction) {
    try {
        newVacationSchema.parse(req.body)
        console.log(req.body);
        return next()
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

vacationsRouter.post("/new-vacation", middlewareNewVacation, async function (req, res, next) {
    try {
        const { destination, startDate, endDate, desc, price, image } = req.body
        const formatedStartDate = format(new Date(startDate), "dd/MM/yyyy")
        const formatedEndtDate = format(new Date(endDate), "dd/MM/yyyy")
        const result = await addVacation(destination, desc, formatedStartDate, formatedEndtDate, price, image)
        console.log(result)
        return res.json({ message: "Vacation successfully added!" })
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




export { vacationsRouter }