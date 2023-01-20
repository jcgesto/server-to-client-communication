import { NextFunction, Request, Response, Router } from "express"
import { v4 } from "uuid"
import { userReadyForQuoting } from "../services/User"
import { IQuote } from "../types/IQuote"

export const QuoteController: Router = Router()

QuoteController.post('/', (req: Request, res: Response, next: NextFunction) => {
  if (!userReadyForQuoting) {
    throw new Error('User not ready for quoting')
  }
  const quote: IQuote = {
    id: v4(),
    price: 200
  }
  res.status(200).send(quote)
})
