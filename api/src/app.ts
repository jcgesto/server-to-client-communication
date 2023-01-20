import express, { Application } from 'express'
import middlewares from './middlewares'
import routes from './routes'

export const app: Application = express()

middlewares(app)
routes(app)