import AuthController from "../../../interfaces/controllers/AuthController";
import ControllerFactory from "../../../interfaces/factories/ControllerFactory";
import AuthVSchema from "../../../interfaces/validators/schemas/AuthVSchema";
import ErrorTranslator from "../../errors/ErrorTranslator";
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter";
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

    createAuthController(authSchemas: AuthVSchema, presenter: ExpressJsendPresenter, errorTranslator: ErrorTranslator): AuthController {
        return new AuthControllerExpress(authSchemas, presenter, errorTranslator)
    }
}

export default ControllerFactoryExpress
