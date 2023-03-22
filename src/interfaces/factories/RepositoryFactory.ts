import TokenRepository from "../repositories/TokenRepository";
import UserRepository from "../repositories/UserRepository";

interface RepositoryFactory {
    createUserRepository(): UserRepository
    createTokenRepository(): TokenRepository
}

export default RepositoryFactory