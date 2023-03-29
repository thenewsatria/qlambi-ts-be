import LoginUseCase from "../../application/usecases/auth/LoginUseCase"
import LogoutUseCase from "../../application/usecases/auth/LogoutUseCase"
import RegisterUseCase from "../../application/usecases/auth/RegisterUseCase"

interface AuthController {
    userLogin(useCase: LoginUseCase): (...args: any[]) => any
    userRegister(useCase: RegisterUseCase): (...args: any[]) => any
    userLogout(useCase: LogoutUseCase): (...args: any[]) => any
}

export default AuthController