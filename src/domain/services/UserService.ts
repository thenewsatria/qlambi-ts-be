import User from '../entities/User'
import UserRepository from "../../interfaces/repositories/UserRepository";
import RegisterRequestDTO from '../../interfaces/dtos/auth/RegisterRequestDTO';

class UserService {
    private readonly repository: UserRepository
    
    constructor(repository: UserRepository) {
        this.repository = repository
    }

    async insertUser(data: RegisterRequestDTO): Promise<User> {
        const newUser = new User(data.email, data.username, data.password)
        const insertedUser = await this.repository.createUser(newUser)
        return Promise.resolve(insertedUser)
    }
}

export default UserService