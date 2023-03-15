import express, {Express, Request, Response} from 'express'
import { initMiddleware, handleErrors } from '../../middlewares/express'
import ExpressJsendPresenter from '../../presenters/express/ExpressJsendPresenter'
import authRoutes from './authRoutes'
const APIRouter = express.Router()
const V1Router = express.Router()

export function routeApp(app: Express) {
    initMiddleware(app)
    app.use('/api', APIRouter)
    APIRouter.use('/v1', V1Router)

    V1Router.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            status: "API version 1 ok"
        })
    })

    V1Router.use('/auth', authRoutes)
    handleErrors(app, ExpressJsendPresenter.getInstance())
}