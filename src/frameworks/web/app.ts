import express, {Express, Request, Response} from 'express'

const app:Express = express()

app.get("/", (req: Request, res: Response) => {
    res.json({
        status: "ok"
    })
})

export default app