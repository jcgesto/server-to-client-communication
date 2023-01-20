import { Application, NextFunction, Request, Response, Router } from "express";
import { PollingController } from "./controllers/PollingController";
import { SSEController } from "./controllers/SSEController";
import { QuoteController } from "./controllers/QuoteController";
import { UserController } from "./controllers/UserController";

const apiRoutes: Array<[string, Router]> = [
  ['/polling', PollingController],
  ['/sse', SSEController],
  ['/quote', QuoteController],
  ['/user', UserController]
]

export default (app: Application): void => {
  app.get('/health', async (_: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200)
    } catch (e) {
      next(e)
    }
  })

  apiRoutes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}