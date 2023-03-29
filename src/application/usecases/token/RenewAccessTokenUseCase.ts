import TokenService from "../../../domain/services/TokenService";
import RenewAccessTokenRequestDTO from "../../../interfaces/dtos/token/RenewAccessTokenRequestDTO";
import RenewAccessTokenResponse from "../../../interfaces/dtos/token/RenewAccessTokenResponseDTO";

class RenewAccessTokenUseCase {
    private readonly tokenService: TokenService

    constructor(tokenService: TokenService) {
        this.tokenService = tokenService
    }
    
    async execute(data: RenewAccessTokenRequestDTO, requestSchema: any): Promise<RenewAccessTokenResponse>{
        await this.tokenService.validateData<RenewAccessTokenRequestDTO>(requestSchema, data)
        return Promise.resolve({accessToken: 'at', refreshToken: 'rt'})
    }
}

export default RenewAccessTokenUseCase
