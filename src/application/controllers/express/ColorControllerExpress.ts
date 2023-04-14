import {Request, Response, NextFunction} from "express"
import User from "../../../domain/entities/User";
import ColorController from "../../../interfaces/controllers/ColorController";
import ColorGeneralResponse from "../../../interfaces/dtos/color/ColorGeneralResponse";
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator";
import ColorVSchema from "../../../interfaces/validators/schemas/ColorVSchema";
import BaseError from "../../errors/BaseError";
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter";
import AddColorUseCase from "../../usecases/color/AddColorUseCase";
import ToggleColorActiveUseCase from "../../usecases/color/ToggleColorActiveUseCase";
import UpdateColorUseCase from "../../usecases/color/UpdateColorUseCase";

class ColorControllerExpress implements ColorController{
    private colorSchemas: ColorVSchema
    private presenter: ExpressJsendPresenter
    private errorTranslator: ErrorTranslator

    constructor(colorSchemas: ColorVSchema, presenter: ExpressJsendPresenter, errorTranslator: ErrorTranslator) {
        this.colorSchemas = colorSchemas
        this.presenter = presenter
        this.errorTranslator = errorTranslator
    }
    
    addColor(useCase: AddColorUseCase): (...args: any[]) => any {
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const currentLoggedUser: User = res.locals.currentLoggedUser
                const result = await useCase.execute({...req.body, userEmail: currentLoggedUser.getEmail()},
                    this.colorSchemas.getAddColorRequestSchema())
                return this.presenter.successReponse<ColorGeneralResponse>(res, 201, result)
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
    
    updateColor(useCase: UpdateColorUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await useCase.execute({...req.body, id: req.params["colorID"]}, this.colorSchemas.getUpdateColorRequestSchema())
                return this.presenter.successReponse<ColorGeneralResponse>(res, 200, result)
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

    toggleColorActive(useCase: ToggleColorActiveUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await useCase.execute({id: req.params["colorID"]}, this.colorSchemas.getColorByIdRequestSchema())
                return this.presenter.successReponse<ColorGeneralResponse>(res, 200, result)
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

export default ColorControllerExpress