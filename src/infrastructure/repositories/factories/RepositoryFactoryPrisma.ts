import RepositoryFactory from "../../../interfaces/factories/RepositoryFactory";
import TokenRepository from "../../../interfaces/repositories/TokenRepository";
import UsedTokenRepository from "../../../interfaces/repositories/UsedTokenRepository";
import UserRepository from "../../../interfaces/repositories/UserRepository";
import TokenRepositoryPrisma from "../prisma/TokenRepositoryPrisma";
import UsedTokenRepositoryPrisma from "../prisma/UsedTokenRepositoryPrisma";
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

    createTokenRepository(): TokenRepository {
        return TokenRepositoryPrisma.getInstance()
    }
    
    createUsedTokenRepository(): UsedTokenRepository {
        return UsedTokenRepositoryPrisma.getInstance()
    }
}

export default RepositoryFactoryPrisma