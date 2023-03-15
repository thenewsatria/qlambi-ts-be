
import { NextFunction, Request, Response } from "express"
import RegisterUseCase from "../../../application/usecases/auth/RegisterUseCase"
import AuthController from "../../../interfaces/controllers/AuthController"
import RegisterResponseDTO from "../../../interfaces/dtos/auth/RegisterResponseDTO"
import AuthVSchema from "../../../interfaces/validators/schemas/AuthVSchema"
import BaseError from "../../errors/BaseError"
import ErrorTranslator from "../../errors/ErrorTranslator"
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter"


class AuthControllerExpress implements AuthController {
    private authSchemas: AuthVSchema
    private presenter: ExpressJsendPresenter
    private errorTranslator: ErrorTranslator

    constructor(authShemas: AuthVSchema, presenter: ExpressJsendPresenter, errorTranslator: ErrorTranslator) {
        this.authSchemas = authShemas
        this.presenter = presenter
        this.errorTranslator = errorTranslator
    }

    userRegister(useCase: RegisterUseCase): (...args: any[]) => any {
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const tokens = await useCase.execute(
                    {...req.body},
                    this.authSchemas.getRegisterRequestSchema(),
                )
                return this.presenter.successReponse<RegisterResponseDTO>(res, 200, tokens)
            }catch(error: any) {
                if(error instanceof Error) {
                    const apiError = this.errorTranslator.xErrorToAPIError(error)
                    next(apiError)
                }else{
                    next(new BaseError("Unkown Error Occured", false, error))
                }
            }
            
        }
    }

    userLogin(): (...args: any[]) => any {
        return async (req: Request, res: Response) => {
            return res.status(404).json({
                rute: "signin"
            })
        }
    }
}

export default AuthControllerExpress