import { NextFunction, Request, Response } from "express"
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator"
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter"
import CreateItemUseCase from "../../usecases/item/CreateItemUseCase"
import ItemController from "../../../interfaces/controllers/ItemController"
import User from "../../../domain/entities/User"
import BaseError from "../../errors/BaseError"
import ItemGeneralResponseDTO from "../../../interfaces/dtos/item/ItemGeneralResponseDTO"
import { unlink } from "fs"
import InternalServerError from "../../errors/apis/InternalServerError"

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
                // Get uploaded filenames from locals
                const itemImages: string[] = res.locals.fileNames 
                const itemImageRoutes: string[] = []
                
                // Setup item images static path for response
                for (const itemImage of itemImages) {
                    itemImageRoutes.push(`${req.protocol}://${req.get('host')}/static/items/${itemImage}`)
                }

                // Set itemImages request before validation
                req.body.itemImages = itemImageRoutes

                const result = await useCase.execute({...req.body, userEmail: currentLoggedUser.getEmail()},
                    this.itemSchemas.getCreateItemRequestSchema())
                return this.presenter.successReponse<ItemGeneralResponseDTO>(res, 201, result)
            }catch(error: unknown) {
                const itemImagesPath: string[] = res.locals.filePaths
                if (itemImagesPath.length > 0) {
                    for (const path of itemImagesPath) {
                        unlink(path, (err) => {
                            if (err) return next(new InternalServerError(`Failed deleting ${path}}`))
                        })
                    }
                }
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