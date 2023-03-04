import AuthController from "./AuthController"

interface ControllerFactory {
    createAuthController(): AuthController
}

export default ControllerFactory
