import { NextFunction, Request, Response } from "express"
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator"
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter"
import CreateItemUseCase from "../../usecases/item/CreateItemUseCase"
import ItemController from "../../../interfaces/controllers/ItemController"
import User from "../../../domain/entities/User"
import BaseError from "../../errors/BaseError"
import ItemGeneralResponseDTO from "../../../interfaces/dtos/item/ItemGeneralResponseDTO"

class ItemControllerExpress implements ItemController {
    private itemSchemas: ItemVSchema
    private presenter: ExpressJsendPresenter
    private errorTranslator: ErrorTranslator

    constructor(itemSchemas: ItemVSchema, presenter: ExpressJsendPresenter, errorTranslator: ErrorTranslator) {
        this.itemSchemas = itemSchemas
        this.presenter = presenter
        this.errorTranslator = errorTranslator
    }
    createItem(useCase: CreateItemUseCase): (...args: any[]) => any{
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const currentLoggedUser: User = res.locals.currentLoggedUser
                const result = await useCase.execute({...req.body, userEmail: currentLoggedUser.getEmail()},
                    this.itemSchemas.getCreateItemRequestSchema())
                return this.presenter.successReponse<ItemGeneralResponseDTO>(res, 201, result)
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

export default ItemControllerExpress