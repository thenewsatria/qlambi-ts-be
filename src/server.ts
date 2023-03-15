import app from './api/express/app'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at port ${port}`);
})

process.on("uncaughtException", (err: Error) => {
    console.log(err.message)
    console.log(err)
    process.exit(1)
})