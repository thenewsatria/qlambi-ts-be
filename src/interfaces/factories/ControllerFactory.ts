import RegisterUseCase from "../../application/usecases/auth/RegisterUseCase"
import AuthController from "../controllers/AuthController"
import AuthVSchema from "../validators/schemas/AuthVSchema"

interface ControllerFactory {
    createAuthController(registerUseCase: RegisterUseCase, authSchemas: AuthVSchema): AuthController
}

export default ControllerFactory
