import { SignOptions } from "jsonwebtoken";
import TokenService from "../../../domain/services/TokenService";
import UsedTokenService from "../../../domain/services/UsedTokenService";
import UserService from "../../../domain/services/UserService";
import RenewAccessTokenRequestDTO from "../../../interfaces/dtos/token/RenewAccessTokenRequestDTO";
import RenewAccessTokenResponse from "../../../interfaces/dtos/token/RenewAccessTokenResponseDTO";
import EmailDTO from "../../../interfaces/dtos/user/singular/EmailDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceExpiredError from "../../errors/app/ResourceExpiredError";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";
import ResourceProtectedError from "../../errors/app/ResourceProtectedError";

class RenewAccessTokenUseCase {
    private readonly userService: UserService
    private readonly tokenService: TokenService
    private readonly usedTokenService: UsedTokenService

    constructor(tokenService: TokenService, usedTokenService: UsedTokenService, userService: UserService) {
        this.tokenService = tokenService
        this.userService = userService
        this.usedTokenService = usedTokenService
    }
    
    async execute(data: RenewAccessTokenRequestDTO, requestSchema: any): Promise<RenewAccessTokenResponse>{
        // [STEP]
        // 1. Validate user request v
        // 2. Check if refresh token isn't "-" v
        // 3. Check is refresh token is expired? v
        // 4. Fetch refresh token in usedToken Table (previous one is used)? v
        // 5. if exist in usedToken table then -> decode the token v
        // 6. if exist in usedToken table then -> update and invalidate token based on user email v
        // 7. if exist in usedToken table then -> send resource protected error v
        // 8. Fetch the refresh token in db v
        // 9. Is refresh token exist v
        // 10. Check if refresh token is blocked? v
        // 11. Check if (newest) refresh token is invalidated  v
        // 12. if invalidated send resource protected error v
        // 13. decode refreshToken to get user email v
        // 14. get user based on email v
        // 15. Check if user exist / active v
        // 16. generate access token and refresh token pair using user email v
        // 17. Update refresh token related to user using new generated refresh token v
        // 18. Create or update used token entry using previous token v
        // 19. return v

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

        // Check if token is reused
        const usedToken = await this.usedTokenService.fetchByUsedRefreshToken({usedRefreshToken: data.refreshToken})
        if(usedToken){
            const decodedToken = await this.tokenService.decodeToken({token: data.refreshToken}, process.env.REF_TOKEN_SECRET!)
            const currentUser = await this.userService.fetchByEmail({email: decodedToken.email})
            
            if(!currentUser) {
                return Promise.reject(
                    new ResourceNotFoundError("There's no user information found related to the refresh token", true,
                        AppOperationType.FETCHING, ResourceType.USER)
                )
            }

            const currentToken = await this.tokenService.fetchByUserEmail({userEmail: currentUser.getEmail()})
            if(!currentToken) {
                return Promise.reject(
                    new ResourceNotFoundError("There's no token information found related to the refresh token", true,
                        AppOperationType.FETCHING, ResourceType.TOKEN)
                )
            }

            currentToken.setIsInvalidated(true)
            await this.tokenService.updateToken({token: currentToken})
            
            return Promise.reject(
                new ResourceProtectedError("Refresh token reuse detected, access denied", true,
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

        if(token.getIsInvalidated()) {
            return Promise.reject(
                new ResourceProtectedError("Refresh token reuse detected, refresh token invalidated, please login again", true,
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
        
        const previousToken = token.getRefreshToken()
        
        const existedUsedToken = await this.usedTokenService.fetchByUserEmail({userEmail: currentUser.getEmail()})
        
        token.setRefreshToken(refreshToken)
        const updatedToken = await this.tokenService.updateToken({token: token})

        if(existedUsedToken) {
            existedUsedToken.setUsedRefreshToken(previousToken)
            await this.usedTokenService.updateUsedToken({usedToken: existedUsedToken})
        }else{
            await this.usedTokenService.insertUsedToken({
                userEmail: currentUser.getEmail(),
                usedRefreshToken: previousToken
            })
        }

        return Promise.resolve({accessToken: accessToken, refreshToken: updatedToken.getRefreshToken()})
    }
}

export default RenewAccessTokenUseCase
