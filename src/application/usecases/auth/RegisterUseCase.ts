import UserService from "../../../domain/services/UserService";
import RegisterRequestDTO from "../../../interfaces/dtos/auth/RegisterRequestDTO";
import RegisterResponseDTO from "../../../interfaces/dtos/auth/RegisterResponseDTO";
import ResourceType from "../../../interfaces/enums/ResourceType";
import Validator from "../../../interfaces/validators/Validator";
import ResourceConflict from "../../errors/app/ResourceConflictError";

class RegisterUseCase {
    private readonly userService: UserService
    private readonly validator: Validator

    constructor(userService: UserService, validator: Validator) {
        this.userService = userService
        this.validator = validator
    }

    async execute(data: RegisterRequestDTO, schema: any): Promise<RegisterResponseDTO> {
        // Validasi body data
        await this.validator.validate(schema, data) //throwing error

        // Cek apakah email dan username sudah digunakan
        const emailIsUsed = await this.userService.isEmailExist({email: data.email})
        if(emailIsUsed) {
            return Promise.reject(
                new ResourceConflict("Email is already used", true, ResourceType.USER, ["email"])
            )
        }
        const usernameIsUsed = await this.userService.isUsernameExist({username: data.username})
        if(usernameIsUsed) {
            return Promise.reject(
                new ResourceConflict("Username is already used", true, ResourceType.USER, ["username"])
            )
        }
        // Cek apakah confirmPassword dan password sama [Dilakukan pada validator]
        // Hash password

        // Masukan pada database
        await this.userService.insertUser(data)
        // generate accesstoken dan refreshToken
        // masukan pasangan username / email + refreshtoken kedalam database
        // kirimkan user kembali ke controller
        return Promise.resolve({accessToken: "testat", refreshToken: "testrt"})
    }
}

export default RegisterUseCase