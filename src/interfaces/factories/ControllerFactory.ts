import AuthController from "../controllers/AuthController"

interface ControllerFactory {
    createAuthController(): AuthController
}

export default ControllerFactory
