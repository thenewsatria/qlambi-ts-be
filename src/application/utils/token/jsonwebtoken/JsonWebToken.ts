import jwt, {SignOptions, TokenExpiredError, VerifyOptions} from "jsonwebtoken"
import AppOperationType from "../../../../interfaces/enums/AppOperationType"
import ResourceType from "../../../../interfaces/enums/ResourceType"
import TokenDecoder from "../../../../interfaces/utils/token/TokenDecoder"
import TokenGenerator from "../../../../interfaces/utils/token/TokenGenerator"
import AppError from "../../../errors/app/AppError"
import ResourceExpiredError from "../../../errors/app/ResourceExpiredError"
import BaseError from "../../../errors/BaseError"

class JsonWebToken implements TokenGenerator, TokenDecoder {
    async decode(token: string, key: string, opts:VerifyOptions): Promise<string | jwt.Jwt | jwt.JwtPayload> {
        try {
            const decoded = await jwt.verify(token, key, opts)
            return Promise.resolve(decoded)
        }catch(error: unknown) {
            if(error instanceof Error) {
                if(error instanceof TokenExpiredError) {
                    return Promise.reject(
                        new ResourceExpiredError(error.message, true, AppOperationType.TOKEN_DECODING, ResourceType.TOKEN, error, error.name)
                    )
                }
                return Promise.reject(
                    new AppError(error.message, true, AppOperationType.TOKEN_DECODING, error, error.name)
                )
            }
            return Promise.reject(
                new BaseError("Unknown error occured ", false, error)
            )
        }
    }

    async generate(payload: object, key: string, opts: SignOptions): Promise<string> {
        try {
            const result = await jwt.sign(payload, key, opts)
            return Promise.resolve(result) 
        }catch(error: unknown) {
            if(error instanceof Error) {
                return Promise.reject(
                    new AppError(error.message, true, AppOperationType.TOKEN_GENERATION, error, error.name)
                )
            }
            return Promise.reject(
                new BaseError("Unknown error occured ", false, error)
            )
        }
    }
}

export default JsonWebToken