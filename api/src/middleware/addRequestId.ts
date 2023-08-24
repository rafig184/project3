
import { Request, Response, NextFunction } from "express"
import uuid4 from "uuid4";

const addRequestId = (req: Request, res: Response, next: NextFunction) => {
    const rid = uuid4()
    res.setHeader("x-request-id", rid)
    next()
}

export { addRequestId }