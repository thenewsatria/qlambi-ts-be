import RegisterUseCase from "../../application/usecases/auth/RegisterUseCase"

interface AuthController {
    userLogin(): (...args: any[]) => any
    userRegister(useCase: RegisterUseCase): (...args: any[]) => any
}

export default AuthController