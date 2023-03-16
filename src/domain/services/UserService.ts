import User from '../entities/User'
import UserRepository from "../../interfaces/repositories/UserRepository";
import RegisterRequestDTO from '../../interfaces/dtos/auth/RegisterRequestDTO';
import ByEmailDTO from '../../interfaces/dtos/queries/ByEmail';
import ByUsername from '../../interfaces/dtos/queries/ByUsername';

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

    async isEmailExist(data: ByEmailDTO): Promise<boolean> {
        const condition = await this.repository.readByEmail(data.email) != null
        return Promise.resolve(condition)
    }

    async isUsernameExist(data: ByUsername): Promise<boolean> {
        const condition = await this.repository.readByUsername(data.username) != null
        return Promise.resolve(condition)
    }
}

export default UserService