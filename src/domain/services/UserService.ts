import User from '../entities/User'
import UserRepository from "../../interfaces/repositories/UserRepository";
import UserCreationDTO from '../../interfaces/dtos/auth/UserCreationDTO';
import EmailDTO from '../../interfaces/dtos/auth/singular/EmailDTO';
import UsernameDTO from '../../interfaces/dtos/auth/singular/UsernameDTO';
import PasswordDTO from '../../interfaces/dtos/auth/singular/PasswordDTO';
import Hasher from '../../interfaces/utils/encryption/Hasher';
import { hash } from 'bcrypt';

class UserService {
    private readonly repository: UserRepository
    
    constructor(repository: UserRepository) {
        this.repository = repository
    }

    async insertUser(data: UserCreationDTO): Promise<User> {
        const newUser = new User(data.email, data.username, data.password)
        const insertedUser = await this.repository.createUser(newUser)
        return Promise.resolve(insertedUser)
    }

    async isEmailExist(data: EmailDTO): Promise<boolean> {
        const condition = await this.repository.readByEmail(data.email) != null
        return Promise.resolve(condition)
    }

    async isUsernameExist(data: UsernameDTO): Promise<boolean> {
        const condition = await this.repository.readByUsername(data.username) != null
        return Promise.resolve(condition)
    }

    async hashPassword(data: PasswordDTO, hasher: Hasher): Promise<string> {
       return hasher.hash(data.password, 10)
    }
}

export default UserService