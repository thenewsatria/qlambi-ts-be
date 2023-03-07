import User from '../../domain/entities/User'

interface UserRepository {
    createUser(user: User): Promise<User>
}

export default UserRepository