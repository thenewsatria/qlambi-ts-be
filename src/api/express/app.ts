import express, {Express, Request, Response} from 'express'
import {routeApp} from '../../application/routes/express/index'

const app:Express = express()

app.get("/", (req: Request, res: Response) => {
    res.json({
        status: "ok"
    })
})

routeApp(app)


export default app