import AuthMiddleware from "../middlewares/AuthMiddleware"
import HandlerMiddleware from "../middlewares/HandlerMiddleware"
import SetupMiddleware from "../middlewares/SetupMiddleware"
import TokenChecker from "../utils/token/TokenChecker"
import TokenDecoder from "../utils/token/TokenDecoder"

interface MiddlewareFactory {
    createAuthMiddleware(tokenTools: TokenDecoder & TokenChecker): AuthMiddleware
    createSetupMiddleware(): SetupMiddleware
    createHandlerMiddleware(): HandlerMiddleware
}

export default MiddlewareFactory
