import { NextFunction, Request, Response } from "express";
import PrintMethodController from "../../../interfaces/controllers/PrintMethodController";
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator";
import PrintMethodVSchema from "../../../interfaces/validators/schemas/PrintMethodVSchema";
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter";
import CreatePrintMethodUseCase from "../../usecases/printMethod/CreatePrintMethodUseCase";
import PrintMethodGeneralResponseDTO from "../../../interfaces/dtos/printMethod/PrintMethodGeneralResponseDTO";
import BaseError from "../../errors/BaseError";
import User from "../../../domain/entities/User";
import GetPrintMethodDetailUseCase from "../../usecases/printMethod/GetPrintMethodDetailUseCase";

class PrintMethodControllerExpress implements PrintMethodController {
    private printMethodSchemas: PrintMethodVSchema
    private presenter: ExpressJsendPresenter
    private errorTranslator: ErrorTranslator

    constructor(printMethodSchemas: PrintMethodVSchema, presenter: ExpressJsendPresenter, errorTranslator: ErrorTranslator) {
        this.printMethodSchemas = printMethodSchemas
        this.presenter = presenter
        this.errorTranslator = errorTranslator
    }

    createPrintMethod(useCase: CreatePrintMethodUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const currentLoggedUser: User = res.locals.currentLoggedUser
                const result = await useCase.execute({...req.body, userEmail: currentLoggedUser.getEmail()},
                    this.printMethodSchemas.getCreatePrintMethodRequestSchema())
                return this.presenter.successReponse<PrintMethodGeneralResponseDTO>(res, 201, result)
            }catch(error: unknown) {
                if(error instanceof Error) {
                    const apiError = this.errorTranslator.translateError(error)
                    next(apiError)
                }else{
                    next(new BaseError("Unknown Error Occured", false, error))
                }
            }
        }
    }

    getPrintMethodDetail(useCase: GetPrintMethodDetailUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const printMethod = await useCase.execute({id: req.params["printMethodID"]}, 
                    this.printMethodSchemas.getPrintMethodByIdRequestSchema())
                return this.presenter.successReponse<PrintMethodGeneralResponseDTO>(res, 200, printMethod)
            }catch(error: unknown) {
                if(error instanceof Error) {
                    const apiError = this.errorTranslator.translateError(error)
                    next(apiError)
                }else{
                    next(new BaseError("Unknown Error Occured", false, error))
                }
            }
        }
    }
}

export default PrintMethodControllerExpress