import TokenService from "../../../domain/services/TokenService";
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator";
import MiddlewareFactory from "../../../interfaces/factories/MiddlewareFactory";
import AuthMiddleware from "../../../interfaces/middlewares/AuthMiddleware";
import HandlerMiddleware from "../../../interfaces/middlewares/HandlerMiddleware";
import SetupMiddleware from "../../../interfaces/middlewares/SetupMiddleware";
import TokenChecker from "../../../interfaces/utils/token/TokenChecker";
import TokenDecoder from "../../../interfaces/utils/token/TokenDecoder";
import TokenVSchema from "../../../interfaces/validators/schemas/TokenVSchema";
import AuthMiddlewareExpress from "../express/AuthMiddlewareExpress";
import HandlerMiddlewareExpress from "../express/HandlerMiddlewareExpress";
import SetupMiddlewareExpress from "../express/SetupMiddlewareExpress";

class MiddlewareFactoryExpress implements MiddlewareFactory {
    private static instance: MiddlewareFactoryExpress
    public static getInstance(): MiddlewareFactoryExpress {
        if(!MiddlewareFactoryExpress.instance) {
            MiddlewareFactoryExpress.instance = new MiddlewareFactoryExpress()
        }

        return MiddlewareFactoryExpress.instance
    }
    createAuthMiddleware(tokenSchemas: TokenVSchema, errorTranslator: ErrorTranslator): AuthMiddleware {
        return new AuthMiddlewareExpress(tokenSchemas, errorTranslator)
    }
    createSetupMiddleware(): SetupMiddleware {
        return new SetupMiddlewareExpress()
    }
    createHandlerMiddleware(): HandlerMiddleware {
        return new HandlerMiddlewareExpress()
    }
}

export default MiddlewareFactoryExpress
