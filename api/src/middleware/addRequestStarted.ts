
import { Request, Response, NextFunction } from "express"
import { logger } from "../logger"
const addRequestStarted = (req: Request, res: Response, next: NextFunction) => {
    logger.info({ message: "Request Started", path: req.path, requestId: res.getHeader("x-request-id") })
    next()
}

export { addRequestStarted }