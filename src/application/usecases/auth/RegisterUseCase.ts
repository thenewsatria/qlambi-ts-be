import UserService from "../../../domain/services/UserService";
import RegisterRequestDTO from "../../../interfaces/dtos/auth/RegisterRequestDTO";
import User from "../../../domain/entities/User";
import RegisterResponseDTO from "../../../interfaces/dtos/auth/RegisterResponseDTO";

class RegisterUseCase {
    private readonly userService: UserService
    constructor(userService: UserService) {
        this.userService = userService
    }

    async execute(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
        // Validasi body data
        // Cek apakah email dan username sudah digunakan
        // Cek apakah confirmPassword dan password sama
        // Hash password
        // Masukan pada database
        // generate accesstoken dan refreshToken
        // masukan pasangan username / email + refreshtoken kedalam database
        // kirimkan user kembali ke controller
        return Promise.resolve({} as RegisterResponseDTO)
    }
}

export default RegisterUseCase