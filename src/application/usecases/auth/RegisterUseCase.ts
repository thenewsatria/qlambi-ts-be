import { SignOptions } from "jsonwebtoken";
import Role from "../../../domain/enums/Role";
import TokenService from "../../../domain/services/TokenService";
import UserService from "../../../domain/services/UserService";
import RegisterRequestDTO from "../../../interfaces/dtos/auth/RegisterRequestDTO";
import RegisterResponseDTO from "../../../interfaces/dtos/auth/RegisterResponseDTO";
import EmailDTO from "../../../interfaces/dtos/user/singular/EmailDTO";
import UserTokenDTO from "../../../interfaces/dtos/user/UserTokenDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import Hasher from "../../../interfaces/utils/encryption/Hasher";
import ResourceConflict from "../../errors/app/ResourceConflictError";

class RegisterUseCase {
    private readonly userService: UserService
    private readonly tokenService: TokenService
    private readonly hasher: Hasher

    constructor(userService: UserService, tokenService: TokenService, hasher: Hasher) {
        this.userService = userService
        this.tokenService = tokenService
        this.hasher = hasher
    }

    async execute(data: RegisterRequestDTO, schema: any): Promise<RegisterResponseDTO> {
        // Validasi body data
        //throwing error if theres validation error
        await this.userService.validateData<RegisterRequestDTO>(schema, data)

        // Cek apakah email dan username sudah digunakan
        const emailIsUsed = await this.userService.isEmailExist(data)
        if(emailIsUsed) {
            return Promise.reject(
                new ResourceConflict("Email is already used", true, AppOperationType.VALIDATION, ResourceType.USER, ["email"])
            )
        }
        const usernameIsUsed = await this.userService.isUsernameExist(data)
        if(usernameIsUsed) {
            return Promise.reject(
                new ResourceConflict("Username is already used", true, AppOperationType.VALIDATION, ResourceType.USER, ["username"])
            )
        }
        // Cek apakah confirmPassword dan password sama [Dilakukan pada validator]
        
        // Hash password
        const hashedPassword = await this.hasher.hash(data.password, 10)

        // generate accesstoken dan refreshToken
        const accessToken = await this.tokenService.generateToken<UserTokenDTO, SignOptions>(
            {email: data.email, role: Role.USER},
            process.env.ACC_TOKEN_SECRET!,
            {expiresIn: process.env.ACC_TOKEN_EXPIRE})

        const refreshToken = await this.tokenService.generateToken<UserTokenDTO, SignOptions>(
            {email: data.email, role: Role.USER},
            process.env.REF_TOKEN_SECRET!,
            {expiresIn: process.env.REF_TOKEN_EXPIRE}
        )

        // Masukan pada database
        await this.userService.insertUser({...data, password: hashedPassword, role: Role.USER}) 
        
        // masukan pasangan username / email + refreshtoken kedalam database
        await this.tokenService.insertToken({
            userEmail: data.email,
            IP: data.IP,
            refreshToken: refreshToken,
            isBlocked: false,
            userAgent: data.userAgent})
        // kirimkan user kembali ke controller
        return Promise.resolve({accessToken: accessToken, refreshToken: refreshToken})
    }
}

export default RegisterUseCase