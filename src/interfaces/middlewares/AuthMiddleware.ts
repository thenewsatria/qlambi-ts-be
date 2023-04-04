import GetUserByEmailUsecase from "../../application/usecases/middleware/GetUserByAccesTokenUseCase"

interface AuthMiddleware {
    protect(useCase: GetUserByEmailUsecase): (...args: any[]) => any
    checkAllowedRoles(allowedRoles: string[]): (...args: any[]) => any
}
export default AuthMiddleware