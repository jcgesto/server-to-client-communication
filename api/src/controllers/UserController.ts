import { NextFunction, Request, Response, Router } from "express"
import { cpfReport } from "../services/User"

export const UserController: Router = Router()

UserController.post('/', (req: Request, res: Response, next: NextFunction) => {
  cpfReport(req.app.get('socketIOServer'))
  res.status(200).send()
})