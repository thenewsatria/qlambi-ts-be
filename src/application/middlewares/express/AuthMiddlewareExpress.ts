import {Express, Request, Response, NextFunction, Router} from 'express'
import AuthMiddleware from '../../../interfaces/middlewares/AuthMiddleware'
import TokenChecker from '../../../interfaces/utils/token/TokenChecker'
import TokenDecoder from '../../../interfaces/utils/token/TokenDecoder'
import UnauthorizedError from '../../errors/apis/UnauthorizedError'
import GetUserByEmailUsecase from '../../usecases/middleware/GetUserByEmailUseCase'

class AuthMiddlewareExpress implements AuthMiddleware {
    private readonly tokenTools: TokenDecoder & TokenChecker

    constructor(tokenTools: TokenDecoder & TokenChecker) {
        this.tokenTools = tokenTools
    }

    protect(useCase: GetUserByEmailUsecase): (req: Request, res: Response, next: NextFunction) => void {
        return async(req: Request, res: Response, next: NextFunction) => {
            const token = req.get("authorization")?.split(" ")[1]
            console.log(token)
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
            console.log(decoded)
            console.log(decoded.email)
            const loggedUser = await useCase.execute({email: decoded.email})
            res.locals.currentLoggedUser = loggedUser
            next()
        }
    }
}

export default AuthMiddlewareExpress