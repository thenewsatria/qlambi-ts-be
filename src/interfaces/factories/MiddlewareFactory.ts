import ErrorTranslator from "../errors/ErrorTranslator"
import AuthMiddleware from "../middlewares/AuthMiddleware"
import HandlerMiddleware from "../middlewares/HandlerMiddleware"
import QueryMiddleware from "../middlewares/QueryMiddleware"
import SetupMiddleware from "../middlewares/SetupMiddleware"
import TokenVSchema from "../validators/schemas/TokenVSchema"

interface MiddlewareFactory {
    createAuthMiddleware(tokenSchemas: TokenVSchema, errorTranslator: ErrorTranslator): AuthMiddleware 
    createSetupMiddleware(): SetupMiddleware
    createHandlerMiddleware(): HandlerMiddleware
    createQueryMiddleware(): QueryMiddleware
}

export default MiddlewareFactory
