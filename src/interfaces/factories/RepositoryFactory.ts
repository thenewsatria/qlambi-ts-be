import ColorRepository from "../repositories/ColorRepository";
import ItemRepository from "../repositories/ItemRepository";
import ProductRepository from "../repositories/ProductRepository";
import SizeRepository from "../repositories/SizeRepository";
import TokenRepository from "../repositories/TokenRepository";
import UsedTokenRepository from "../repositories/UsedTokenRepository";
import UserRepository from "../repositories/UserRepository";

interface RepositoryFactory {
    createUserRepository(): UserRepository
    createTokenRepository(): TokenRepository
    createUsedTokenRepository(): UsedTokenRepository
    createProductRepository(): ProductRepository
    createColorRepository(): ColorRepository
    createSizeRepository(): SizeRepository
    createItemRepository(): ItemRepository
}

export default RepositoryFactory