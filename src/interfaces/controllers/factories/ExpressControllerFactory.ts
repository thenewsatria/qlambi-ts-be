import AuthController from "../abstracts/AuthController";
import ControllerFactory from "../abstracts/ControllerFactory";
import ExpressAuthController from "../ExpressAuthController";

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
