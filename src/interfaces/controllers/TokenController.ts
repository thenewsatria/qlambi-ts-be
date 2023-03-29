import RenewAccessTokenUseCase from "../../application/usecases/token/RenewAccessTokenUseCase";

interface TokenController {
    refreshToken(useCase: RenewAccessTokenUseCase): (...args: any[]) => any
}

export default TokenController