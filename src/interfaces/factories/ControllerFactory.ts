import AuthController from "../controllers/AuthController"
import TokenController from "../controllers/TokenController"
import ErrorTranslator from "../errors/ErrorTranslator"
import JsendPresenter from "../presenters/JsendPresenter"
import AuthVSchema from "../validators/schemas/AuthVSchema"
import TokenVSchema from "../validators/schemas/TokenVSchema"

interface ControllerFactory {
    createAuthController(authSchemas: AuthVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): AuthController
    createTokenController(tokenSchemas: TokenVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): TokenController
}

export default ControllerFactory
