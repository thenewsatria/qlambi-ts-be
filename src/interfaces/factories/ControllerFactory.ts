import AuthController from "../controllers/AuthController"
import ProductController from "../controllers/ProductController"
import TokenController from "../controllers/TokenController"
import ErrorTranslator from "../errors/ErrorTranslator"
import JsendPresenter from "../presenters/JsendPresenter"
import AuthVSchema from "../validators/schemas/AuthVSchema"
import ProductVSchema from "../validators/schemas/ProductVSchema"
import TokenVSchema from "../validators/schemas/TokenVSchema"

interface ControllerFactory {
    createAuthController(authSchemas: AuthVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): AuthController
    createTokenController(tokenSchemas: TokenVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): TokenController
    createProductController(productSchemas: ProductVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): ProductController
}

export default ControllerFactory
