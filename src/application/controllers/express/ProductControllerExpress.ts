import { Request, Response, NextFunction } from "express";
import User from "../../../domain/entities/User";
import ProductController from "../../../interfaces/controllers/ProductController";
import ProductGeneralListReponseDTO from "../../../interfaces/dtos/product/ProductGeneralListResponseDTO";
import ProductGeneralResponseDTO from "../../../interfaces/dtos/product/ProductGeneralResponse";
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator";
import ProductVSchema from "../../../interfaces/validators/schemas/ProductVSchema";
import BaseError from "../../errors/BaseError";
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter";
import AddColorToProductUseCase from "../../usecases/product/AddColorToProductUseCase";
import AddProductUseCase from "../../usecases/product/AddProductUseCase";
import ClearColorFromProductUseCase from "../../usecases/product/ClearColorFromProductUseCase";
import GetProductDetailUseCase from "../../usecases/product/GetProductDetailUseCase";
import GetProductListUseCase from "../../usecases/product/GetProductListUseCase";
import RemoveColorFromProductUseCase from "../../usecases/product/RemoveColorFromProductUseCase";
import RemoveProductUseCase from "../../usecases/product/RemoveProductUseCase";
import ToggleProductActiveUseCase from "../../usecases/product/ToggleProductActiveUseCase";
import UpdateProductUseCase from "../../usecases/product/UpdateProductUseCase";

class ProductControllerExpress implements ProductController {
    private productSchemas: ProductVSchema
    private presenter: ExpressJsendPresenter
    private errorTranslator: ErrorTranslator

    
    constructor(productSchemas: ProductVSchema, presenter: ExpressJsendPresenter, errorTranslator: ErrorTranslator) {
        this.productSchemas = productSchemas
        this.presenter = presenter
        this.errorTranslator = errorTranslator
    }
    addProduct(useCase: AddProductUseCase): (...args: any[]) => any {
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const currentLoggedUser: User = res.locals.currentLoggedUser
                const result = await useCase.execute({...req.body, userEmail: currentLoggedUser.getEmail()},
                    this.productSchemas.getAddProductRequestSchema())
                return this.presenter.successReponse<ProductGeneralResponseDTO>(res, 201, result)
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

    updateProduct(useCase: UpdateProductUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try{
               const result = await useCase.execute({...req.body, id: req.params["productID"]}, this.productSchemas.getUpdateProductRequestSchema())
               return this.presenter.successReponse<ProductGeneralResponseDTO>(res, 200, result)
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

    getProductList(useCase: GetProductListUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try{
                const filter = res.locals.productFilter
                const order = res.locals.productSortOrder
                const result = await useCase.execute({filter: filter, sortOrder: order})
                return this.presenter.successReponse<ProductGeneralListReponseDTO>(res, 200, result)
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

    getProductDetail(useCase: GetProductDetailUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try{
               const result = await useCase.execute({id: req.params["productID"]}, this.productSchemas.getProductByIdRequestSchema())
               return this.presenter.successReponse<ProductGeneralResponseDTO>(res, 200, result)
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

    toggleProductActive(useCase: ToggleProductActiveUseCase): (...args: any[]) => any {
        return async(req: Request, res:Response, next: NextFunction) => {
            try {
                const result = await useCase.execute({id: req.params["productID"]}, this.productSchemas.getProductByIdRequestSchema())
                return this.presenter.successReponse<ProductGeneralResponseDTO>(res, 200, result)
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

    removeProduct(useCase: RemoveProductUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await useCase.execute({...req.body, id: req.params["productID"]}, this.productSchemas.getProductDeletionRequestSchema())
                return this.presenter.successReponse<ProductGeneralResponseDTO>(res, 200, result)
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

    addColorToProduct(useCase: AddColorToProductUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const currentLoggedUser: User = res.locals.currentLoggedUser
                const result = await useCase.execute({colorId: req.params["colorID"],
                    productId: req.params["productID"], userEmail: currentLoggedUser.getEmail()},
                    this.productSchemas.getAddColorToProductRequestSchema())
                return this.presenter.successReponse<ProductGeneralResponseDTO>(res, 200, result)
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

    removeColorFromProduct(useCase: RemoveColorFromProductUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await useCase.execute({colorId: req.params["colorID"],
                    productId: req.params["productID"]},
                    this.productSchemas.getRemoveColorFromProductRequestSchema())
                return this.presenter.successReponse<ProductGeneralResponseDTO>(res, 200, result)
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

    clearColorFromProduct(useCase: ClearColorFromProductUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await useCase.execute({id: req.params["productID"]}, this.productSchemas.getProductByIdRequestSchema())
                return this.presenter.successReponse<ProductGeneralResponseDTO>(res, 200, result)
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

export default ProductControllerExpress