import User from "../../../domain/entities/User";
import UserRepository from "../../../interfaces/repositories/UserRepository";

class UserRepositoryPrisma implements UserRepository {
    private static instance: UserRepositoryPrisma
    public static getInstance() {
        if(!UserRepositoryPrisma.instance){
            UserRepositoryPrisma.instance = new UserRepositoryPrisma()
        }

        return UserRepositoryPrisma.instance
    }

    createUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
}

export default UserRepositoryPrisma