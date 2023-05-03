import AuthController from "../../../interfaces/controllers/AuthController";
import ProductController from "../../../interfaces/controllers/ProductController";
import SizeController from "../../../interfaces/controllers/SizeController";
import TokenController from "../../../interfaces/controllers/TokenController";
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator";
import ControllerFactory from "../../../interfaces/factories/ControllerFactory";
import JsendPresenter from "../../../interfaces/presenters/JsendPresenter";
import AuthVSchema from "../../../interfaces/validators/schemas/AuthVSchema";
import ColorVSchema from "../../../interfaces/validators/schemas/ColorVSchema";
import ProductVSchema from "../../../interfaces/validators/schemas/ProductVSchema";
import SizeVSchema from "../../../interfaces/validators/schemas/SizeVSchema";
import TokenVSchema from "../../../interfaces/validators/schemas/TokenVSchema";
import AuthControllerExpress from "../express/AuthControllerExpress";
import ColorControllerExpress from "../express/ColorControllerExpress";
import ProductControllerExpress from "../express/ProductControllerExpress";
import SizeControllerExpress from "../express/SizeControllerExpress";
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

    createProductController(productSchemas: ProductVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): ProductController {
        return new ProductControllerExpress(productSchemas, presenter, errorTranslator)
    }

    createColorController(colorSchemas: ColorVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator) {
        return new ColorControllerExpress(colorSchemas, presenter, errorTranslator)
    }

    createSizeController(sizeSchemas: SizeVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): SizeController {
        return new SizeControllerExpress(sizeSchemas, presenter, errorTranslator)
    }
}

export default ControllerFactoryExpress
