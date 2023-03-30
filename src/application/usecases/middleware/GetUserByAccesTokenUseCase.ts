import User from "../../../domain/entities/User";
import TokenService from "../../../domain/services/TokenService";
import UserService from "../../../domain/services/UserService";
import StringTokenDTO from "../../../interfaces/dtos/token/singular/StringTokenDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceExpiredError from "../../errors/app/ResourceExpiredError";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";
import ResourceProtectedError from "../../errors/app/ResourceProtectedError";

class GetUserByAccesTokenUseCase {
    private readonly tokenService: TokenService
    private readonly userService: UserService

    constructor(tokenService: TokenService, userService: UserService) {
        this.tokenService = tokenService
        this.userService = userService
    }
    
    async execute(data: StringTokenDTO, requestSchema: any): Promise<User> {
        await this.tokenService.validateData(requestSchema, data)

        if(data.token === "-") {
            return Promise.reject(
                new ResourceProtectedError("User have been logged out, please login again", true,
                    AppOperationType.VALIDATION, ResourceType.TOKEN)
            )
        }

        const isTokenExpired = await this.tokenService.checkTokenIsExpired(data, process.env.ACC_TOKEN_SECRET!)
        if(isTokenExpired) {
            return Promise.reject(
                new ResourceExpiredError("Access token is expired, please renew the token", true,
                    AppOperationType.VALIDATION, ResourceType.TOKEN)
            )
        }
        const decodedToken = await this.tokenService.decodeToken(data, process.env.ACC_TOKEN_SECRET!)
        const user = await this.userService.fetchByEmail({email: decodedToken.email})

        if(!user){
            return Promise.reject(
                new ResourceNotFoundError("User with provided email doesn't exist", true,
                        AppOperationType.FETCHING, ResourceType.USER)
            )
        }

        return Promise.resolve(user)
    }
}

export default GetUserByAccesTokenUseCase