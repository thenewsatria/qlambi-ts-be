import express, {Express, Request, Response, NextFunction} from 'express'
import APIError from '../../errors/apis/APIError'

export function initMiddleware(app: Express) {
    app.use(express.json())
}

export function handleErrors(app: Express) {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        return res.status((err as APIError).statusCode).json({
            test: err.name,
            error: err
        })
    })
}