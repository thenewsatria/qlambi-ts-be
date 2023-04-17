import ColorRepository from "../repositories/ColorRepository";
import ProductRepository from "../repositories/ProductRepository";
import TokenRepository from "../repositories/TokenRepository";
import UsedTokenRepository from "../repositories/UsedTokenRepository";
import UserRepository from "../repositories/UserRepository";

interface RepositoryFactory {
    createUserRepository(): UserRepository
    createTokenRepository(): TokenRepository
    createUsedTokenRepository(): UsedTokenRepository
    createProductRepository(): ProductRepository
    createColorRepository(): ColorRepository
}

export default RepositoryFactory