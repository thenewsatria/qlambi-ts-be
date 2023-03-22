import User from '../entities/User'
import UserRepository from "../../interfaces/repositories/UserRepository";
import UserCreationDTO from '../../interfaces/dtos/auth/UserCreationDTO';
import EmailDTO from '../../interfaces/dtos/auth/singular/EmailDTO';
import UsernameDTO from '../../interfaces/dtos/auth/singular/UsernameDTO';
import Validator from '../../interfaces/validators/Validator';

class UserService {
    private readonly repository: UserRepository
    private readonly validator: Validator
    
    
    constructor(repository: UserRepository, validator: Validator) {
        this.repository = repository
        this.validator = validator
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

    async validateData<DataT>(schema: any, data: DataT): Promise<DataT> {
        return this.validator.validate<DataT>(schema, data)
    }
}

export default UserService