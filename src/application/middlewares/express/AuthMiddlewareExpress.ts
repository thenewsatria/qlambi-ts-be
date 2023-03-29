import {Request, Response, NextFunction} from 'express'
import ErrorTranslator from '../../../interfaces/errors/ErrorTranslator'
import AuthMiddleware from '../../../interfaces/middlewares/AuthMiddleware'
import TokenChecker from '../../../interfaces/utils/token/TokenChecker'
import TokenDecoder from '../../../interfaces/utils/token/TokenDecoder'
import UnauthorizedError from '../../errors/apis/UnauthorizedError'
import BaseError from '../../errors/BaseError'
import GetUserByEmailUsecase from '../../usecases/middleware/GetUserByEmailUseCase'

class AuthMiddlewareExpress implements AuthMiddleware {
    private readonly tokenTools: TokenDecoder & TokenChecker
    private readonly errorTranslator: ErrorTranslator

    constructor(tokenTools: TokenDecoder & TokenChecker, errorTranslator: ErrorTranslator) {
        this.tokenTools = tokenTools
        this.errorTranslator = errorTranslator
    }

    protect(useCase: GetUserByEmailUsecase): (req: Request, res: Response, next: NextFunction) => void {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const token = req.get("authorization")?.split(" ")[1]
                if(!token) {
                     return next(
                         new UnauthorizedError("There's no token provided, please login", true)
                     )
                }
                const tokenIsExpired = await this.tokenTools.isExpired(token!, process.env.ACC_TOKEN_SECRET!)
                if(tokenIsExpired) {
                    return next(
                        new UnauthorizedError("Token is expired, please renew it", true)
                    )
                }
                const decoded = await this.tokenTools.decode(token!, process.env.ACC_TOKEN_SECRET!)
                const loggedUser = await useCase.execute({email: decoded.email})
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