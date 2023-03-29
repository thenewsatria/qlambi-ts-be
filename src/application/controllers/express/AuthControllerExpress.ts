
import { NextFunction, Request, Response } from "express"
import RegisterUseCase from "../../../application/usecases/auth/RegisterUseCase"
import User from "../../../domain/entities/User"
import AuthController from "../../../interfaces/controllers/AuthController"
import LoginResponseDTO from "../../../interfaces/dtos/auth/LoginResponseDTO"
import LogoutResponseDTO from "../../../interfaces/dtos/auth/LogoutResponseDTO"
import RegisterResponseDTO from "../../../interfaces/dtos/auth/RegisterResponseDTO"
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator"
import AuthVSchema from "../../../interfaces/validators/schemas/AuthVSchema"
import BaseError from "../../errors/BaseError"
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter"
import LoginUseCase from "../../usecases/auth/LoginUseCase"
import LogoutUseCase from "../../usecases/auth/LogoutUseCase"


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
                    const apiError = this.errorTranslator.translateError(error)
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
                    const apiError = this.errorTranslator.translateError(error)
                    next(apiError)
                }else{
                    next(new BaseError("Unkown Error Occured", false, error))
                }
            }
        }
    }

    userLogout(useCase: LogoutUseCase): (...args: any[]) => any {
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const currentLoggedUser: User = res.locals.currentLoggedUser
                const result = await useCase.execute({userEmail: currentLoggedUser.getEmail()})
                return this.presenter.successReponse<LogoutResponseDTO>(res, 200, result)
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

export default AuthControllerExpress