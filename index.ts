import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.json({
        status: "ok"
    })
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at port ${port}`);
})