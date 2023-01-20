import { Application } from "express"
import cors from 'cors'

export default function middlewares(app: Application): void {
  app.use(cors())
}