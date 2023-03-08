import RegisterUseCase from "../../application/usecases/auth/RegisterUseCase"
import AuthController from "../controllers/AuthController"

interface ControllerFactory {
    createAuthController(registerUseCase: RegisterUseCase): AuthController
}

export default ControllerFactory
