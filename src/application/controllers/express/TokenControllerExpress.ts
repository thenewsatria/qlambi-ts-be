import {NextFunction, Request, Response} from 'express'
import TokenController from "../../../interfaces/controllers/TokenController";
import RenewAccessTokenResponse from '../../../interfaces/dtos/token/RenewAccessTokenResponseDTO';
import ErrorTranslator from '../../../interfaces/errors/ErrorTranslator';
import TokenVSchema from '../../../interfaces/validators/schemas/TokenVSchema';
import BaseError from '../../errors/BaseError';
import ExpressJsendPresenter from '../../presenters/express/ExpressJsendPresenter';
import RenewAccessTokenUseCase from "../../usecases/token/RenewAccessTokenUseCase";

class TokenControllerExpress implements TokenController {
    private readonly tokenSchemas: TokenVSchema
    private readonly presenter: ExpressJsendPresenter
    private readonly errorTranslator: ErrorTranslator
    
    constructor(tokenSchemas: TokenVSchema, presenter: ExpressJsendPresenter, errorTranslator: ErrorTranslator) {
        this.tokenSchemas = tokenSchemas
        this.presenter = presenter
        this.errorTranslator = errorTranslator
    }

    refreshToken(useCase: RenewAccessTokenUseCase): (...args: any[]) => any {
        return async(req: Request, res: Response, next: NextFunction) => {
            try{
                const result = await useCase.execute({...req.body}, this.tokenSchemas.getAccessTokenRenewalRequestSchema())
                return this.presenter.successReponse<RenewAccessTokenResponse>(res, 200, result)
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
}

export default TokenControllerExpress