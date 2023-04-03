import TokenRepository from "../repositories/TokenRepository";
import UsedTokenRepository from "../repositories/UsedTokenRepository";
import UserRepository from "../repositories/UserRepository";

interface RepositoryFactory {
    createUserRepository(): UserRepository
    createTokenRepository(): TokenRepository
    createUsedTokenRepository(): UsedTokenRepository
}

export default RepositoryFactory