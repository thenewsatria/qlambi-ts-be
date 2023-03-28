import GetUserByEmailUsecase from "../../application/usecases/middleware/GetUserByEmailUseCase"

interface AuthMiddleware {
    protect(useCase: GetUserByEmailUsecase): (...args: any[]) => any
}
export default AuthMiddleware