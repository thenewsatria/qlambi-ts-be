import AuthController from "../../../interfaces/controllers/AuthController";
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator";
import ControllerFactory from "../../../interfaces/factories/ControllerFactory";
import JsendPresenter from "../../../interfaces/presenters/JsendPresenter";
import AuthVSchema from "../../../interfaces/validators/schemas/AuthVSchema";
import AuthControllerExpress from "../express/AuthControllerExpress";

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
}

export default ControllerFactoryExpress
