import { Request, Response, NextFunction } from "express";
import User from "../../../domain/entities/User";
import ProductController from "../../../interfaces/controllers/ProductController";
import ProductCreationResponseDTO from "../../../interfaces/dtos/product/ProductCreationResponseDTO";
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator";
import ProductVSchema from "../../../interfaces/validators/schemas/ProductVSchema";
import BaseError from "../../errors/BaseError";
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter";
import AddProductUseCase from "../../usecases/product/AddProductUseCase";

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
                return this.presenter.successReponse<ProductCreationResponseDTO>(res, 201, result)
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