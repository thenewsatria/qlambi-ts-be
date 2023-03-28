import { SignOptions } from "jsonwebtoken";
import User from "../../../domain/entities/User";
import TokenService from "../../../domain/services/TokenService";
import UserService from "../../../domain/services/UserService";
import LoginRequestDTO from "../../../interfaces/dtos/auth/LoginRequestDTO";
import LoginResponseDTO from "../../../interfaces/dtos/auth/LoginResponseDTO";
import EmailDTO from "../../../interfaces/dtos/user/singular/EmailDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import Hasher from "../../../interfaces/utils/encryption/Hasher";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";
import ResourceProtectedError from "../../errors/app/ResourceProtectedError";

class LoginUseCase {
    private readonly userService: UserService
    private readonly tokenService: TokenService
    private readonly hasher: Hasher
    
    constructor(userService: UserService, tokenService: TokenService, hasher: Hasher) {
        this.userService = userService
        this.tokenService = tokenService
        this.hasher = hasher
    }

    async execute(data: LoginRequestDTO, requestSchema: any, validEmailSchema: any): Promise<LoginResponseDTO>{
        let loggedUser: User
        // Validasi inputan user
        await this.userService.validateData<LoginRequestDTO>(requestSchema, data)
        
        // Check apakah menggunakan credential username atau email
        const isEmail = await this.userService.isValid<string>(validEmailSchema, data.credential)

        // Check apakah username atau email ada pada database
            // Kirim Error jika tidak ada
        if (isEmail) {
            const user = await this.userService.fetchByEmail({email: data.credential})
            if(user === null) {
                return Promise.reject(
                    new ResourceNotFoundError("User with provided email doesn't exist", true,
                        AppOperationType.FETCHING, ResourceType.USER)
                )
            }
            loggedUser = user
        }else{
            const user = await this.userService.fetchByUsername({username: data.credential})
            if (user ==  null) {
                return Promise.reject(
                    new ResourceNotFoundError("User with provided username doesn't exist", true,
                        AppOperationType.FETCHING, ResourceType.USER)
                )
            }
            loggedUser = user
        }
        // Compare hash dari password pada database dengan input dari user
            // Kirim Error jika tidak sama
        const isPasswordCorrect = await this.hasher.compare(data.password, loggedUser.getPassword())
        if(!isPasswordCorrect) {
            return Promise.reject(
                new ResourceProtectedError("Password provided doesn't matcth", true,
                    AppOperationType.VALIDATION, ResourceType.USER)
            )
        }

        // Cari token berdasarkan email pada database
            // Jika tidak ada error
        const loggedUserToken = await this.tokenService.fetchByUserEmail({userEmail: loggedUser.getEmail()})
        if(loggedUserToken === null) {
            return Promise.reject(
                new ResourceNotFoundError("User token information isn't found", true, 
                    AppOperationType.FETCHING, ResourceType.TOKEN)
            )
        }
        // Generate access token dan refresh token baru
        const accessToken = await this.tokenService.generateToken<EmailDTO, SignOptions>(
            {email: loggedUser.getEmail()},
            process.env.ACC_TOKEN_SECRET!,
            {expiresIn: process.env.ACC_TOKEN_EXPIRE}
        )

        const refreshToken = await this.tokenService.generateToken<EmailDTO, SignOptions>(
            {email: loggedUser.getEmail()},
            process.env.REF_TOKEN_SECRET!,
            {expiresIn: process.env.REF_TOKEN_EXPIRE}
        )

        loggedUserToken.setRefreshToken(refreshToken)
        loggedUserToken.setIP(data.IP)
        loggedUserToken.setUserAgent(data.userAgent)

        // Update token pada database sesuai dengan email
        const updatedToken = await this.tokenService.updateToken({token: loggedUserToken})
        // Kirim response data
        return Promise.resolve({accessToken: accessToken, refreshToken: updatedToken.getRefreshToken()})
    }
}

export default LoginUseCase