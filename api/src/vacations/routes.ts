
import express, { NextFunction, Request, Response } from "express"
import zod from "zod"
import { format } from 'date-fns'
import { getAllVacations } from "./handlers/getAllVacations"
import { removeVacation } from "./handlers/deleteVacation"
import { addVacation } from "./handlers/addVacation"
import { editVacation } from "./handlers/editVacation"
import { log } from "winston"
import { getVacationById } from "./handlers/getVacationById"



const vacationsRouter = express.Router()

vacationsRouter.get("/", async function (req, res, next) {
    try {
        const result = await getAllVacations()
        // console.log(result);
        return res.json(result)
    } catch (error) {
        console.log(error);
        return next(error)
    }
})

vacationsRouter.delete("/:vacationId", async function (req: Request, res: Response, next: NextFunction) {
    if ((req as any).currentRole !== "admin") return res.status(401).send("Authentication error")
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
    description: zod.string(),
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
    if ((req as any).currentRole !== "admin") return res.status(401).send("Authentication error")
    try {
        const { destination, startDate, endDate, description, price, image } = req.body
        const formatStartDate = new Date(startDate)
        const formatEndDate = new Date(endDate)
        const result = await addVacation(destination, description, formatStartDate, formatEndDate, price, image)
        console.log(result)
        return res.json({ message: "Vacation successfully added!" })
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

vacationsRouter.put("/edit-vacation", async function (req: Request, res: Response, next: NextFunction) {
    if ((req as any).currentRole !== "admin") return res.status(401).send("Authentication error")
    const vacationId: any = req.query.q;
    const { destination, description, startDate, endDate, price, image } = req.body;
    const formatStartDate = new Date(startDate)
    const formatEndDate = new Date(endDate)

    try {
        const results = await editVacation(destination, description, formatStartDate, formatEndDate, price, image, vacationId);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating Vacation" });
    }
})

vacationsRouter.get("/search", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const vacationId: any = req.query.q
        console.log(`<<${{ vacationId }}>>>`);
        const result = await getVacationById(vacationId)
        return res.json(result)
    } catch (error) {
        console.log(error);
        return next(error)
    }
})




export { vacationsRouter }