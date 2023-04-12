import { Request, Response, NextFunction } from "express";
import User from "../../../domain/entities/User";
import ProductController from "../../../interfaces/controllers/ProductController";
import ProductGeneralResponseDTO from "../../../interfaces/dtos/product/ProductGeneralResponse";
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator";
import ProductVSchema from "../../../interfaces/validators/schemas/ProductVSchema";
import BaseError from "../../errors/BaseError";
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter";
import AddProductUseCase from "../../usecases/product/AddProductUseCase";
import GetProductDetailUseCase from "../../usecases/product/GetProductDetailUseCase";
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