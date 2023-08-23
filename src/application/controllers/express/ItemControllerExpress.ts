import { NextFunction, Request, Response } from "express"
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator"
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter"
import CreateItemUseCase from "../../usecases/item/CreateItemUseCase"
import ItemController from "../../../interfaces/controllers/ItemController"
import User from "../../../domain/entities/User"
import BaseError from "../../errors/BaseError"
import ItemGeneralResponseDTO from "../../../interfaces/dtos/item/ItemGeneralResponseDTO"
import { stat, unlink } from "fs"
import InternalServerError from "../../errors/apis/InternalServerError"
import GetItemDetailUseCase from "../../usecases/item/GetItemDetailUseCase"
import ToggleItemActiveUseCase from "../../usecases/item/ToggleItemActiveUseCase"
import RemoveItemUseCase from "../../usecases/item/RemoveItemUseCase"
import Default from "../../../domain/enums/Default"
import GetItemListUseCase from "../../usecases/item/GetItemListUseCase"
import ItemGeneralListResponseDTO from "../../../interfaces/dtos/item/ItemGeneralListResponseDTO"
import UpdateItemUseCase from "../../usecases/item/UpdateItemUseCase"

class ItemControllerExpress implements ItemController {
    private itemSchemas: ItemVSchema
    private presenter: ExpressJsendPresenter
    private errorTranslator: ErrorTranslator

    constructor(itemSchemas: ItemVSchema, presenter: ExpressJsendPresenter, errorTranslator: ErrorTranslator) {
        this.itemSchemas = itemSchemas
        this.presenter = presenter
        this.errorTranslator = errorTranslator
    }
    
    toggleItemActive(useCase: ToggleItemActiveUseCase): (...args: any[]) => any {
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const item = await useCase.execute({id: req.params["itemID"]}, this.itemSchemas.getItemByIdRequestSchema())
                return this.presenter.successReponse<ItemGeneralResponseDTO>(res, 200, item)
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
    
    getItemDetail(useCase: GetItemDetailUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try{
               const result = await useCase.execute({id: req.params["itemID"]}, this.itemSchemas.getItemByIdRequestSchema())
               return this.presenter.successReponse<ItemGeneralResponseDTO>(res, 200, result)
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

    getItemList(useCase: GetItemListUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const filter = res.locals.itemFilter
                const order = res.locals.itemSortOrder
                const result = await useCase.execute({filter: filter, sortOrder: order})
                return this.presenter.successReponse<ItemGeneralListResponseDTO>(res, 200, result)
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

    removeItem(useCase: RemoveItemUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await useCase.execute({...req.body, id: req.params["itemID"]}, 
                    this.itemSchemas.getItemDeletionRequestSchema())
                if (result.itemImages.length >= 1 && result.itemImages[0] !== Default.ITEM_IMAGE_URL) {
                    for (const staticPath of result.itemImages) {
                        const filename = staticPath.split("/").pop()
                        unlink(`public/items/${filename}`, (err) => {
                            if (err) return next(new InternalServerError(`Failed deleting public/items/${filename}`))
                        })
                    }
                }
                return this.presenter.successReponse<ItemGeneralResponseDTO>(res, 200, result)
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

    updateItem(useCase: UpdateItemUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try{
               const result = await useCase.execute({...req.body, id: req.params["itemID"]}, this.itemSchemas.getUpdateItemRequestSchema())
               return this.presenter.successReponse<ItemGeneralResponseDTO>(res, 200, result)
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