import ErrorTranslator from "../../application/errors/ErrorTranslator"
import AuthController from "../controllers/AuthController"
import JsendPresenter from "../presenters/JsendPresenter"
import AuthVSchema from "../validators/schemas/AuthVSchema"

interface ControllerFactory {
    createAuthController(authSchemas: AuthVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): AuthController
}

export default ControllerFactory
