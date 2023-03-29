import AuthController from "../../../interfaces/controllers/AuthController";
import TokenController from "../../../interfaces/controllers/TokenController";
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator";
import ControllerFactory from "../../../interfaces/factories/ControllerFactory";
import JsendPresenter from "../../../interfaces/presenters/JsendPresenter";
import AuthVSchema from "../../../interfaces/validators/schemas/AuthVSchema";
import TokenVSchema from "../../../interfaces/validators/schemas/TokenVSchema";
import AuthControllerExpress from "../express/AuthControllerExpress";
import TokenControllerExpress from "../express/TokenControllerExpress";

class ControllerFactoryExpress implements ControllerFactory {

    // Implementing Singleton
    private static instance: ControllerFactoryExpress

    public static getInstance(): ControllerFactoryExpress {
        if(!ControllerFactoryExpress.instance) {
            ControllerFactoryExpress.instance = new ControllerFactoryExpress();
        }

        return ControllerFactoryExpress.instance;
    }

    createAuthController(authSchemas: AuthVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): AuthController {
        return new AuthControllerExpress(authSchemas, presenter, errorTranslator)
    }

    createTokenController(tokenSchemas: TokenVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): TokenController {
        return new TokenControllerExpress(tokenSchemas, presenter, errorTranslator)
    }

}

export default ControllerFactoryExpress
