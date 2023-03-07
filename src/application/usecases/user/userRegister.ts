import User from "../../../domain/entities/User";
import UserService from "../../../domain/services/UserService";

class UserRegisterUseCase {
    private userService: UserService
    constructor(userService: UserService) {
        this.userService = userService
    }
    
    async execute(): Promise<User> {
        return Promise.resolve({} as User)
    }
}

export default UserRegisterUseCase