



import { Request, Response, NextFunction } from "express"
import { logger } from "../logger"
const addRequestFinished = (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
        logger.info({ message: "Request Finished", path: req.path, requestId: res.getHeader("x-request-id") })
    })
    next()
}
export { addRequestFinished }