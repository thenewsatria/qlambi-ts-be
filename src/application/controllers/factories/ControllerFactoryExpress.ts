import AuthController from "../../../interfaces/controllers/AuthController";
import ControllerFactory from "../../../interfaces/factories/ControllerFactory";
import AuthVSchema from "../../../interfaces/validators/schemas/AuthVSchema";
import RegisterUseCase from "../../usecases/auth/RegisterUseCase";
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

    createAuthController(registerUseCase: RegisterUseCase, authSchemas: AuthVSchema): AuthController {
        return new AuthControllerExpress(registerUseCase, authSchemas)
    }
}

export default ControllerFactoryExpress
