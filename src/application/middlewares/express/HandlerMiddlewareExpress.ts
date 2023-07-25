import {Request, Response, NextFunction} from 'express'
import multer, { FileFilterCallback } from 'multer'
import HandlerMiddleware from '../../../interfaces/middlewares/HandlerMiddleware'
import APIError from '../../errors/apis/APIError'
import BadRequestError from '../../errors/apis/BadRequestError'
import BaseError from '../../errors/BaseError'
import ExpressJsendPresenter from '../../presenters/express/ExpressJsendPresenter'
import path from 'path'

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

    handleFileUpload(): (destinationPath: string, allowedExt: string[], maxSize: number, option: string) => multer.Multer {
        return (destinationPath: string, allowedExt: string[], maxSize: number, options: string): multer.Multer => {
            const storage = multer.diskStorage({
                destination: destinationPath,
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const fileExtension = path.extname(file.originalname);
                    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
                },
            })

            const upload = multer({
                storage: storage
            })
            return upload
        }
    }
}

export default HandlerMiddlewareExpress