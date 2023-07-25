import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator";
import MiddlewareFactory from "../../../interfaces/factories/MiddlewareFactory";
import AuthMiddleware from "../../../interfaces/middlewares/AuthMiddleware";
import HandlerMiddleware from "../../../interfaces/middlewares/HandlerMiddleware";
import QueryMiddleware from "../../../interfaces/middlewares/QueryMiddleware";
import SetupMiddleware from "../../../interfaces/middlewares/SetupMiddleware";
import ValidationMiddleware from "../../../interfaces/middlewares/ValidationMiddleware";
import TokenVSchema from "../../../interfaces/validators/schemas/TokenVSchema";
import AuthMiddlewareExpress from "../express/AuthMiddlewareExpress";
import HandlerMiddlewareExpress from "../express/HandlerMiddlewareExpress";
import QueryMiddlewareExpress from "../express/QueryMiddlewareExpress";
import SetupMiddlewareExpress from "../express/SetupMiddlewareExpress";
import ValidationMiddlewareExpress from "../express/ValidationMiddlewareExpress";

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
    createQueryMiddleware(): QueryMiddleware {
        return new QueryMiddlewareExpress()
    }
    createValidationMiddleware(): ValidationMiddleware {
        return new ValidationMiddlewareExpress()
    }
}

export default MiddlewareFactoryExpress
