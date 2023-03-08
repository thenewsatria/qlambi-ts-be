import RepositoryFactory from "../../../interfaces/factories/RepositoryFactory";
import UserRepository from "../../../interfaces/repositories/UserRepository";
import UserRepositoryPrisma from "../prisma/UserRepositoryPrisma";

class RepositoryFactoryPrisma implements RepositoryFactory {
    private static instance: RepositoryFactoryPrisma
    
    public static getInstance() {
        if(!RepositoryFactoryPrisma.instance) {
            RepositoryFactoryPrisma.instance = new RepositoryFactoryPrisma()
        }

        return RepositoryFactoryPrisma.instance
    }

    createUserRepository(): UserRepository {
        return UserRepositoryPrisma.getInstance()
    }
}

export default RepositoryFactoryPrisma