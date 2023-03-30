import ErrorTranslator from "../errors/ErrorTranslator"
import AuthMiddleware from "../middlewares/AuthMiddleware"
import HandlerMiddleware from "../middlewares/HandlerMiddleware"
import SetupMiddleware from "../middlewares/SetupMiddleware"
import TokenVSchema from "../validators/schemas/TokenVSchema"

interface MiddlewareFactory {
    createAuthMiddleware(tokenSchemas: TokenVSchema, errorTranslator: ErrorTranslator): AuthMiddleware 
    createSetupMiddleware(): SetupMiddleware
    createHandlerMiddleware(): HandlerMiddleware
}

export default MiddlewareFactory
