import AuthController from "../../../interfaces/controllers/AuthController";
import ControllerFactory from "../../../interfaces/factories/ControllerFactory";
import ExpressAuthController from "../express/ExpressAuthController";

class ExpressControllerFactory implements ControllerFactory {

    // Implementing Singleton
    private static instance: ExpressControllerFactory

    public static getInstance(): ExpressControllerFactory {
        if(!ExpressControllerFactory.instance) {
            ExpressControllerFactory.instance = new ExpressControllerFactory();
        }

        return ExpressControllerFactory.instance;
    }

    createAuthController(): AuthController {
        return ExpressAuthController.getInstance()
    }
}

export default ExpressControllerFactory
