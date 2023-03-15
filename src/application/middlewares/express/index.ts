import express, {Express, Request, Response, NextFunction} from 'express'
import APIError from '../../errors/apis/APIError'
import BadRequestError from '../../errors/apis/BadRequestError'
import BaseError from '../../errors/BaseError'
import ExpressJsendPresenter from '../../presenters/express/ExpressJsendPresenter'

export function initMiddleware(app: Express) {
    app.use(express.json())
}

export function handleErrors(app: Express, presenter: ExpressJsendPresenter) {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if(err instanceof BaseError) {

            if(!err.isOperational){
                console.log(err.message)
                console.log(err.stack)
                process.exit(1)
            }

            if(err instanceof APIError) {
                switch(err.name) {
                    case "BadRequestError":
                        return presenter.failResponse(res, err.statusCode, (err as BadRequestError<any>).messages)
                    default: 
                        return presenter.errorResponse(res, err.statusCode, err.message)
                }
            }
        }
        return presenter.errorResponse(res, 500, err.message)
    })
}
