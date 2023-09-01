import { Request, Response, NextFunction } from "express";
import {unlink} from "fs"
import ValidationMiddleware from "../../../interfaces/middlewares/ValidationMiddleware";
import BadRequestError from "../../errors/apis/BadRequestError";
import InternalServerError from "../../errors/apis/InternalServerError";

class ValidationMiddlewareExpress implements ValidationMiddleware {
    checkFileIsExist(fieldName: string): (...args: any[]) => any {
        return async (req: Request, res: Response, next: NextFunction) => {
            if((req.files && req.files.length != 0) || req.file){
                if(req.files){
                    const fileLocations = []
                    const fileNames = []
                    for (const file of req.files as Express.Multer.File[]) {
                        fileLocations.push(file.path)
                        fileNames.push(file.filename)
                    }
                    res.locals.filePaths = fileLocations
                    res.locals.fileNames = fileNames
                }
                if(req.file){
                    res.locals.filePath = req.file.path
                    res.locals.fileName = req.file.filename
                }
                return next()
            }
            const output: {[index: string]: string} = {}
            output[fieldName] = `File for ${fieldName} is required`
            next(new BadRequestError(`File for ${fieldName} is required`, [output]))
        }
    }
    checkFileSize(maxSize: number): (...args: any[]) => any {
        return async (req: Request, res: Response, next: NextFunction) => {
            if(req.files){
                let isFail = false
                let failedOriginalFileName = ""
                const fileLocations = []
                const fileNames = []
                for (const file of req.files as Express.Multer.File[]) {
                    fileLocations.push(file.path)
                    fileNames.push(file.filename)
                    if (file.size >= maxSize) {
                        failedOriginalFileName = file.originalname
                        isFail = true
                    }
                }
                if (isFail) {
                    for (const path of fileLocations) {
                        unlink(path, (err) => {
                            if (err) return next(new InternalServerError(`Failed deleting ${path}}`))
                        })
                    }
                    return next(new BadRequestError(`File ${failedOriginalFileName} is larger than ${maxSize / (1024*1024)}MB`, [`File ${failedOriginalFileName} is larger than ${maxSize / (1024*1024)}MB`]))
                }
                res.locals.filePaths = fileLocations
                res.locals.fileNames = fileNames
                return next()
            }
            if(req.file){
                if (req.file.size >= maxSize) {
                    unlink(req.file.path, (err) => {
                        if (err) return next(new InternalServerError(`Failed deleting ${req.file?.path}}`))
                    })
                    return next(new BadRequestError(`File ${req.file.originalname} is larger than ${maxSize / (1024*1024)}MB`, [`File ${req.file.originalname} is larger than ${maxSize / (1024*1024)}MB`]))
                }
                res.locals.filePath = req.file.path
                res.locals.fileName = req.file.filename
                return next()
            }
        }
    }
    checkFilesMimetype(allowedExt: string[]): (...args: any[]) => any {
        return async (req: Request, res: Response, next: NextFunction) => {
            if(req.files){
                let isFail = false
                let currentFileMime = ""
                let failedOriginalFileName = ""
                const fileLocations = []
                const fileNames = []
                for (const file of req.files as Express.Multer.File[]) {
                    fileLocations.push(file.path)
                    fileNames.push(file.filename)
                    if (!allowedExt.includes(file.mimetype)) {
                        isFail = true
                        currentFileMime = file.mimetype
                        failedOriginalFileName = file.originalname
                    }
                }
                if (isFail) {
                    for (const path of fileLocations) {
                        unlink(path, (err) => {
                            if (err) return next(new InternalServerError(`Failed deleting ${path}}`))
                        })
                    }
                    return next(new BadRequestError(`${failedOriginalFileName} file with ${currentFileMime} mimetype is not allowed`, [`${failedOriginalFileName} file with ${currentFileMime} mimetype is not allowed`]))
                }
                res.locals.filePaths = fileLocations
                res.locals.fileNames = fileNames
                return next()
            }
            if(req.file){
                if (!allowedExt.includes(req.file.mimetype)) {
                    unlink(req.file.path, (err) => {
                        if (err) return next(new InternalServerError(`Failed deleting ${req.file?.path}}`))
                    })
                    return next(new BadRequestError(`File ${req.file.originalname} with ${req.file.mimetype} mimetype is not allowed`, [`File ${req.file.originalname} with ${req.file.mimetype} mimetype is not allowed`]))
                }
                res.locals.filePath = req.file.path
                res.locals.fileName = req.file.filename
                return next()
            }
            return next()
        }
    }
}

export default ValidationMiddlewareExpress