import LoginUseCase from "../../application/usecases/auth/LoginUseCase"
import RegisterUseCase from "../../application/usecases/auth/RegisterUseCase"

interface AuthController {
    userLogin(useCase: LoginUseCase): (...args: any[]) => any
    userRegister(useCase: RegisterUseCase): (...args: any[]) => any
    userLogout(): (...args: any[]) => any
}

export default AuthController