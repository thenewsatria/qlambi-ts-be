import { Request, Response, NextFunction } from "express";
import User from "../../../domain/entities/User";
import SizeController from "../../../interfaces/controllers/SizeController";
import SizeGeneralResponseDTO from "../../../interfaces/dtos/size/SizeGeneralResponseDTO";
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator";
import SizeVSchema from "../../../interfaces/validators/schemas/SizeVSchema";
import BaseError from "../../errors/BaseError";
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter";
import AddSizeUseCase from "../../usecases/size/AddSizeUseCase";
import GetSizeDetailUseCase from "../../usecases/size/GetSizeDetailUseCase";
import ToggleSizeActiveUseCase from "../../usecases/size/ToggleSizeActiveUseCase";
import UpdateSizeUseCase from "../../usecases/size/UpdateSizeUseCase";

class SizeControllerExpress implements SizeController {
    private sizeSchemas: SizeVSchema
    private presenter: ExpressJsendPresenter
    private errorTranslator: ErrorTranslator

    
    constructor(sizeSchemas: SizeVSchema, presenter: ExpressJsendPresenter, errorTranslator: ErrorTranslator) {
        this.sizeSchemas = sizeSchemas
        this.presenter = presenter
        
        this.errorTranslator = errorTranslator
    }
        
    addSizeToProduct(useCase: AddSizeUseCase): (...args: any[]) => any {
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const currentLoggedUser: User = res.locals.currentLoggedUser
                const result = await useCase.execute({...req.body, userEmail: currentLoggedUser.getEmail(),
                    productId: req.params["productID"]},
                    this.sizeSchemas.getAddSizeRequestVSchema())
                return this.presenter.successReponse<SizeGeneralResponseDTO>(res, 201, result)
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

    updateSize(useCase: UpdateSizeUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const updatedSize = await useCase.execute({...req.body, id: req.params["sizeID"]},
                    this.sizeSchemas.getUpdateSizeRequestVSchema())
                return this.presenter.successReponse<SizeGeneralResponseDTO>(res, 200, updatedSize)
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

    toggleSizeActive(useCase: ToggleSizeActiveUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const toggledActiveSize = await useCase.execute({id: req.params["sizeID"]}, this.sizeSchemas.getSizeByIdRequestVSchema())
                return this.presenter.successReponse<SizeGeneralResponseDTO>(res, 200, toggledActiveSize)
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

    getSizeDetail(useCase: GetSizeDetailUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const sizeDetail = await useCase.execute({id: req.params["sizeID"]}, this.sizeSchemas.getSizeByIdRequestVSchema())
                return this.presenter.successReponse<SizeGeneralResponseDTO>(res, 200, sizeDetail)
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

export default SizeControllerExpress
