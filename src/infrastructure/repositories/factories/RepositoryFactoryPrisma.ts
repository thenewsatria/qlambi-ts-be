import RepositoryFactory from "../../../interfaces/factories/RepositoryFactory";
import ColorRepository from "../../../interfaces/repositories/ColorRepository";
import ItemRepository from "../../../interfaces/repositories/ItemRepository";
import PrintMethodRepository from "../../../interfaces/repositories/PrintMethodRepository";
import ProductRepository from "../../../interfaces/repositories/ProductRepository";
import SizeRepository from "../../../interfaces/repositories/SizeRepository";
import TokenRepository from "../../../interfaces/repositories/TokenRepository";
import UsedTokenRepository from "../../../interfaces/repositories/UsedTokenRepository";
import UserRepository from "../../../interfaces/repositories/UserRepository";
import ColorRepositoryPrisma from "../prisma/ColorRepositoryPrisma";
import ItemRepositoryPrisma from "../prisma/ItemRepositoryPrisma";
import PrintMethodRepositoryPrisma from "../prisma/PrintMethodRepositoryPrisma";
import ProductRepositoryPrisma from "../prisma/ProductRepositoryPrisma";
import SizeRepositoryPrisma from "../prisma/SizeRepositoryPrisma";
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

    createProductRepository(): ProductRepository {
        return ProductRepositoryPrisma.getInstance()
    }

    createColorRepository(): ColorRepository {
        return ColorRepositoryPrisma.getInstance()
    }

    createSizeRepository(): SizeRepository {
        return SizeRepositoryPrisma.getInstance()
    }

    createItemRepository(): ItemRepository {
        return ItemRepositoryPrisma.getInstance()
    }

    createPrintMethodRepository(): PrintMethodRepository {
        return PrintMethodRepositoryPrisma.getInstance()
    }
}

export default RepositoryFactoryPrisma