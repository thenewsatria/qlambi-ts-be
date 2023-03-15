import User from '../../domain/entities/User'

interface UserRepository {
    createUser(user: User): Promise<User>
    readByEmail(email: string): Promise<User | null>
    readByUsername(username: string): Promise<User | null>
}

export default UserRepository