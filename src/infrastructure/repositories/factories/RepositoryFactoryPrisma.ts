import RepositoryFactory from "../../../interfaces/factories/RepositoryFactory";
import UserRepository from "../../../interfaces/repositories/UserRepository";

class RepositoryFactoryPrisma implements RepositoryFactory {
    private static instance: RepositoryFactoryPrisma
    
    public static getInstance() {
        if(!RepositoryFactoryPrisma.instance) {
            RepositoryFactoryPrisma.instance = new RepositoryFactoryPrisma()
        }

        return RepositoryFactoryPrisma.instance
    }

    createUserRepository(): UserRepository {
        return {} as UserRepository
    }
}

export default RepositoryFactoryPrisma