import {Express, Request, Response, NextFunction} from 'express'
import HandlerMiddleware from '../../../interfaces/middlewares/HandlerMiddleware'
import APIError from '../../errors/apis/APIError'
import BadRequestError from '../../errors/apis/BadRequestError'
import BaseError from '../../errors/BaseError'
import ExpressJsendPresenter from '../../presenters/express/ExpressJsendPresenter'

class HandlerMiddlewareExpress implements HandlerMiddleware{
    handleErrors(presenter: ExpressJsendPresenter): (err: Error, req: Request, res: Response, next: NextFunction) => Response {
        return (err: Error, req: Request, res: Response, next: NextFunction) => {
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
        }
    }
}

export default HandlerMiddlewareExpress