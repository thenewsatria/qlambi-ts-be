import {Request, Response, NextFunction} from 'express'
import TokenService from '../../../domain/services/TokenService'
import ErrorTranslator from '../../../interfaces/errors/ErrorTranslator'
import AuthMiddleware from '../../../interfaces/middlewares/AuthMiddleware'
import TokenVSchema from '../../../interfaces/validators/schemas/TokenVSchema'
import UnauthorizedError from '../../errors/apis/UnauthorizedError'
import BaseError from '../../errors/BaseError'
import GetUserByAccesTokenUseCase from '../../usecases/middleware/GetUserByAccesTokenUseCase'
class AuthMiddlewareExpress implements AuthMiddleware {
    private readonly tokenSchemas: TokenVSchema
    private readonly errorTranslator: ErrorTranslator

    constructor(tokenSchemas: TokenVSchema, errorTranslator: ErrorTranslator) {
        this.tokenSchemas = tokenSchemas
        this.errorTranslator = errorTranslator
    }

    protect(useCase: GetUserByAccesTokenUseCase): (req: Request, res: Response, next: NextFunction) => void {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const token = req.get("authorization")?.split(" ")[1]
                if(!token) {
                     return next(
                         new UnauthorizedError("There's no token provided, please login", true)
                     )
                }
                
                const loggedUser = await useCase.execute({token: token}, this.tokenSchemas.getStringTokenSchema())
                res.locals.currentLoggedUser = loggedUser
                next()
            }catch(error: unknown){
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

export default AuthMiddlewareExpress