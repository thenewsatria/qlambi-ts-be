import UserService from "../../../domain/services/UserService";
import RegisterRequestDTO from "../../../interfaces/dtos/auth/RegisterRequestDTO";
import RegisterResponseDTO from "../../../interfaces/dtos/auth/RegisterResponseDTO";
import Validator from "../../../interfaces/validators/Validator";

class RegisterUseCase {
    private readonly userService: UserService
    private readonly validator: Validator

    constructor(userService: UserService, validator: Validator) {
        this.userService = userService
        this.validator = validator
    }

    async execute(data: RegisterRequestDTO, schema: any): Promise<RegisterResponseDTO> {
        // Validasi body data
        await this.validator.validate(schema, data)

        // Cek apakah email dan username sudah digunakan
        
        // Cek apakah confirmPassword dan password sama
        // Hash password
        // Masukan pada database
        await this.userService.insertUser(data)
        // generate accesstoken dan refreshToken
        // masukan pasangan username / email + refreshtoken kedalam database
        // kirimkan user kembali ke controller
        return Promise.resolve({} as RegisterResponseDTO)
    }
}

export default RegisterUseCase