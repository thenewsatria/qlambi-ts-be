import { Request, Response, NextFunction } from "express";
import {unlink} from "fs"
import ValidationMiddleware from "../../../interfaces/middlewares/ValidationMiddleware";
import BadRequestError from "../../errors/apis/BadRequestError";
import InternalServerError from "../../errors/apis/InternalServerError";

class ValidationMiddlewareExpress implements ValidationMiddleware {
    checkFileIsExist(fieldName: string): (...args: any[]) => any {
        return async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.files)
            console.log(req.file)
            if((req.files && req.files.length != 0) || req.file){
                return next()
            }
            next(new BadRequestError(`File for ${fieldName} is required`, [`File for ${fieldName} is required`]))
        }
    }
    checkFileSize(maxSize: number): (...args: any[]) => any {
        return async (req: Request, res: Response, next: NextFunction) => {
            if(req.files){
                let isFail = false
                const fileLocations = []
                for (const file of req.files as Express.Multer.File[]) {
                    fileLocations.push(file.path)
                    if (file.size >= maxSize) {
                        isFail = true
                    }
                }
                if (isFail) {
                    for (const path of fileLocations) {
                        unlink(path, (err) => {
                            if (err) return next(new InternalServerError(`Failed deleting ${path}}`))
                        })
                    }
                    return next(new BadRequestError(`One of the file is larger than ${maxSize / (1024*1024)}MB`, [`One of the file is larger than ${maxSize / (1024*1024)}MB`]))
                }
                return next()
            }
            if(req.file){
                if (req.file.size >= maxSize) {
                    unlink(req.file.path, (err) => {
                        if (err) return next(new InternalServerError(`Failed deleting ${req.file?.path}}`))
                    })
                    return next(new BadRequestError(`File is larger than ${maxSize / (1024*1024)}MB`, [`File is larger than ${maxSize / (1024*1024)}MB`]))
                }
                return next()
            }
        }
    }
    checkFilesMimetype(allowedExt: string[]): (...args: any[]) => any {
        return async (req: Request, res: Response, next: NextFunction) => {
            if(req.files){
                let isFail = false
                let currentFileMime = ""
                const fileLocations = []
                for (const file of req.files as Express.Multer.File[]) {
                    fileLocations.push(file.path)
                    if (!allowedExt.includes(file.mimetype)) {
                        isFail = true
                        currentFileMime = file.mimetype
                    }
                }
                if (isFail) {
                    for (const path of fileLocations) {
                        unlink(path, (err) => {
                            if (err) return next(new InternalServerError(`Failed deleting ${path}}`))
                        })
                    }
                    return next(new BadRequestError(`One of the file with ${currentFileMime} mimetype is not allowed`, [`One of the file with ${currentFileMime} mimetype is not allowed`]))
                }
                return next()
            }
            if(req.file){
                if (!allowedExt.includes(req.file.mimetype)) {
                    unlink(req.file.path, (err) => {
                        if (err) return next(new InternalServerError(`Failed deleting ${req.file?.path}}`))
                    })
                    return next(new BadRequestError(`File with ${req.file.mimetype} mimetype is not allowed`, [`File with ${req.file.mimetype} mimetype is not allowed`]))
                }
                return next()
            }
            return next()
        }
    }
}

export default ValidationMiddlewareExpress