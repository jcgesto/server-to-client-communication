import { NextFunction, Request, Response, Router } from "express"
import { userReadyForQuoting } from "../services/User"

export const SSEController: Router = Router()

SSEController.get('/ready-for-quoting', (req: Request, res: Response, next: NextFunction) => {
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();
  
  const TIME_BETWEEN_CHECKS = 5000
  let numRetries = 5
  const interval = setInterval(() => {
    if (userReadyForQuoting) {
      res.write(`data: ${JSON.stringify(true)}\n\n`)
      clearInterval(interval)
    }
    numRetries--
    if (numRetries === 0) {
      res.write(`data: ${JSON.stringify(false)}\n\n`)
      clearInterval(interval)
    }
  }, TIME_BETWEEN_CHECKS)
})