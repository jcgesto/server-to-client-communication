import { NextFunction, Request, Response, Router } from "express"
import { userReadyForQuoting } from "../services/User"

export const PollingController: Router = Router()

PollingController.get('/ready-for-quoting', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send(userReadyForQuoting)
})