import express, {Express, Request, Response} from 'express'
import ExpressJsendPresenter from '../../presenters/express/ExpressJsendPresenter'
import authRoutes from './authRoutes'
import MiddlewareFactoryExpress from '../../middlewares/factories/MiddlewareFactoryExpress'
import tokenRoutes from './tokenRoutes'
const APIRouter = express.Router()
const V1Router = express.Router()

export function routeApp(app: Express) {
    const middlewareFactory = MiddlewareFactoryExpress.getInstance()
    const setupMW = middlewareFactory.createSetupMiddleware()
    const handlerMW = middlewareFactory.createHandlerMiddleware()

    app.use(setupMW.initialSetup())

    app.use('/api', APIRouter)
    APIRouter.use('/v1', V1Router)

    V1Router.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            status: "API version 1 ok"
        })
    })

    V1Router.use('/auth', authRoutes)
    V1Router.use('/token', tokenRoutes)
    app.use(handlerMW.handleErrors(ExpressJsendPresenter.getInstance()))
}