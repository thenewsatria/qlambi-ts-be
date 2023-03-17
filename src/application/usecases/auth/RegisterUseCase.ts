import UserService from "../../../domain/services/UserService";
import RegisterRequestDTO from "../../../interfaces/dtos/auth/RegisterRequestDTO";
import RegisterResponseDTO from "../../../interfaces/dtos/auth/RegisterResponseDTO";
import ResourceType from "../../../interfaces/enums/ResourceType";
import Hasher from "../../../interfaces/utils/encryption/Hasher";
import Validator from "../../../interfaces/validators/Validator";
import ResourceConflict from "../../errors/app/ResourceConflictError";

class RegisterUseCase {
    private readonly userService: UserService
    private readonly validator: Validator
    private readonly hasher: Hasher

    constructor(userService: UserService, validator: Validator, hasher: Hasher) {
        this.userService = userService
        this.validator = validator
        this.hasher = hasher
    }

    async execute(data: RegisterRequestDTO, schema: any): Promise<RegisterResponseDTO> {
        // Validasi body data
        //throwing error if theres validation error
        await this.validator.validate<RegisterRequestDTO>(schema, data) 

        // Cek apakah email dan username sudah digunakan
        const emailIsUsed = await this.userService.isEmailExist(data)
        if(emailIsUsed) {
            return Promise.reject(
                new ResourceConflict("Email is already used", true, ResourceType.USER, ["email"])
            )
        }
        const usernameIsUsed = await this.userService.isUsernameExist(data)
        if(usernameIsUsed) {
            return Promise.reject(
                new ResourceConflict("Username is already used", true, ResourceType.USER, ["username"])
            )
        }
        // Cek apakah confirmPassword dan password sama [Dilakukan pada validator]
        
        // Hash password
        const hashedPassword = await this.userService.hashPassword(data, this.hasher)

        // Masukan pada database
        await this.userService.insertUser({...data, password: hashedPassword})

        // generate accesstoken dan refreshToken
        // masukan pasangan username / email + refreshtoken kedalam database
        // kirimkan user kembali ke controller
        return Promise.resolve({accessToken: "testat", refreshToken: "testrt"})
    }
}

export default RegisterUseCase