import { throws } from "assert";
import { SignOptions } from "jsonwebtoken";
import TokenService from "../../../domain/services/TokenService";
import UserService from "../../../domain/services/UserService";
import RenewAccessTokenRequestDTO from "../../../interfaces/dtos/token/RenewAccessTokenRequestDTO";
import RenewAccessTokenResponse from "../../../interfaces/dtos/token/RenewAccessTokenResponseDTO";
import UserEmailDTO from "../../../interfaces/dtos/token/singular/UserEmailDTO";
import EmailDTO from "../../../interfaces/dtos/user/singular/EmailDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceExpiredError from "../../errors/app/ResourceExpiredError";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";
import ResourceProtectedError from "../../errors/app/ResourceProtectedError";

class RenewAccessTokenUseCase {
    private readonly userService: UserService
    private readonly tokenService: TokenService

    constructor(tokenService: TokenService, userService: UserService) {
        this.tokenService = tokenService
        this.userService = userService
    }
    
    async execute(data: RenewAccessTokenRequestDTO, requestSchema: any): Promise<RenewAccessTokenResponse>{
        // [STEP]
        // 1. Validate user request v
        // 2. Check if refresh token isn't "-" v
        // 3. Check is refresh token is expired? v
        // 4. Fetch the refresh token in db v
        // 5. Is refresh token exist v
        // 6. Check if refresh token is blocked? v
        // 7. decode refreshToken to get user email v
        // 8. get user based on email v
        // 9. Check if user exist / active v
        // 10. generate access token and refresh token pair using user email v
        // 11. Update refresh token related to user using new generated refresh token v
        // 11. return v

        await this.tokenService.validateData<RenewAccessTokenRequestDTO>(requestSchema, data)
        if (data.refreshToken === "-") {
            return Promise.reject(
                new ResourceProtectedError("User have been logged out, please login again", true,
                    AppOperationType.VALIDATION, ResourceType.TOKEN)
            )
        }
        const isExpired = await this.tokenService.checkTokenIsExpired({token: data.refreshToken}, process.env.REF_TOKEN_SECRET!)
        if (isExpired) {
            return Promise.reject(
                new ResourceExpiredError("Refresh token is expired, please login again", true,
                    AppOperationType.VALIDATION, ResourceType.TOKEN)
            )
        }
        const token = await this.tokenService.fetchByRefreshToken({token: data.refreshToken})
        if(!token) {
            return Promise.reject(
                new ResourceNotFoundError("There's no token information found related to the refresh token", true,
                    AppOperationType.FETCHING, ResourceType.TOKEN)
            )
        }

        if(token.getIsBlocked()) {
            return Promise.reject(
                new ResourceExpiredError("Refresh token is blocked, please contact the admin", true,
                    AppOperationType.VALIDATION, ResourceType.TOKEN)
            )
        }

        const decodedToken = await this.tokenService.decodeToken({token: data.refreshToken}, process.env.REF_TOKEN_SECRET!)
        const currentUser = await this.userService.fetchByEmail({email: decodedToken.email})
        
        if(!currentUser) {
            return Promise.reject(
                new ResourceNotFoundError("There's no user information found related to the refresh token", true,
                    AppOperationType.FETCHING, ResourceType.USER)
            )
        }

        const accessToken = await this.tokenService.generateToken<EmailDTO, SignOptions>(
            {email: currentUser.getEmail()},
            process.env.ACC_TOKEN_SECRET!,
            {expiresIn: process.env.ACC_TOKEN_EXPIRE}
        )

        const refreshToken = await this.tokenService.generateToken<EmailDTO, SignOptions>(
            {email: currentUser.getEmail()},
            process.env.REF_TOKEN_SECRET!,
            {expiresIn: process.env.REF_TOKEN_EXPIRE}
        )
        
        token.setRefreshToken(refreshToken)
        const updatedToken = await this.tokenService.updateToken({token: token})

        return Promise.resolve({accessToken: accessToken, refreshToken: updatedToken.getRefreshToken()})
    }
}

export default RenewAccessTokenUseCase
