import User from '../entities/User'
import UserRepository from "../../interfaces/repositories/UserRepository";
import CreateUserDTO from '../../interfaces/dtos/user/CreateUserDTO'

class UserService {
    private readonly repository: UserRepository
    
    constructor(repository: UserRepository) {
        this.repository = repository
    }

    async insertUser(data: CreateUserDTO): Promise<User> {
        return Promise.resolve({} as User)
    }
}

export default UserService