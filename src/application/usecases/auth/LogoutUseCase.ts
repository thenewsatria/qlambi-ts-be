import TokenService from "../../../domain/services/TokenService";
import LogoutResponseDTO from "../../../interfaces/dtos/auth/LogoutResponseDTO";
import UserEmailDTO from "../../../interfaces/dtos/token/singular/UserEmailDTO";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";

class LogoutUseCase {
    private readonly tokenService: TokenService

    constructor(tokenService: TokenService) {
        this.tokenService = tokenService
    }

    async execute(data: UserEmailDTO): Promise<LogoutResponseDTO> {
        const currentUserToken = await this.tokenService.fetchByUserEmail(data)
        if(!currentUserToken) {
            return Promise.reject(
                new ResourceNotFoundError("Token related with user's email doesn't exist, please register first", true, 
                AppOperationType.FETCHING, ResourceType.TOKEN)
            )
        }
        currentUserToken.setRefreshToken("-")
        const updatedToken = await this.tokenService.updateToken({token: currentUserToken})
        return Promise.resolve({accessToken: "-", refreshToken: updatedToken.getRefreshToken()})
    }
}

export default LogoutUseCase