import express, {Express, Request, Response} from 'express'
import routeApp from './routes'

const app:Express = express()

routeApp(app)

app.get("/", (req: Request, res: Response) => {
    res.json({
        status: "ok"
    })
})

export default app