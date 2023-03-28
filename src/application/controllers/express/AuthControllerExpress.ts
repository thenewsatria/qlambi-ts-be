
import { NextFunction, Request, Response } from "express"
import RegisterUseCase from "../../../application/usecases/auth/RegisterUseCase"
import AuthController from "../../../interfaces/controllers/AuthController"
import LoginResponseDTO from "../../../interfaces/dtos/auth/LoginResponseDTO"
import RegisterResponseDTO from "../../../interfaces/dtos/auth/RegisterResponseDTO"
import AuthVSchema from "../../../interfaces/validators/schemas/AuthVSchema"
import BaseError from "../../errors/BaseError"
import ErrorTranslator from "../../errors/ErrorTranslator"
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter"
import LoginUseCase from "../../usecases/auth/LoginUseCase"


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
                    {...req.body, IP: req.ip, userAgent: req.headers["user-agent"]},
                    this.authSchemas.getRegisterRequestSchema(),
                )
                return this.presenter.successReponse<RegisterResponseDTO>(res, 201, tokens)
            }catch(error: unknown) {
                if(error instanceof Error) {
                    const apiError = this.errorTranslator.xErrorToAPIError(error)
                    next(apiError)
                }else{
                    next(new BaseError("Unkown Error Occured", false, error))
                }
            }
            
        }
    }

    userLogin(useCase: LoginUseCase): (...args: any[]) => any {
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const result = await useCase.execute(
                    {...req.body, IP: req.ip, userAgent: req.headers['user-agent']}, 
                    this.authSchemas.getLoginRequestSchema(),
                    this.authSchemas.getValidEmailSchema()
                )

                return this.presenter.successReponse<LoginResponseDTO>(res, 200, result)
            }catch(error: unknown) {
                if(error instanceof Error) {
                    const apiError = this.errorTranslator.xErrorToAPIError(error)
                    next(apiError)
                }else{
                    next(new BaseError("Unkown Error Occured", false, error))
                }
            }
        }
    }

    userLogout(): (...args: any[]) => any {
        return (req: Request, res: Response, next: NextFunction) => {
            return this.presenter.successReponse(res, 200, res.locals.currentLoggedUser.getEmail())
        }
    }
}

export default AuthControllerExpress