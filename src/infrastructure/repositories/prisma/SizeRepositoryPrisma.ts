
import Product from "../../../domain/entities/Product";
import Size from "../../../domain/entities/Size";
import User from "../../../domain/entities/User";
import SizeRepository from "../../../interfaces/repositories/SizeRepository";
import prismaClient from "../../databases/prisma/client";

class SizeRepositoryPrisma implements SizeRepository {
        
    private readonly _client = prismaClient
    private static instance: SizeRepositoryPrisma
    
    public static getInstance() {
        if(!SizeRepositoryPrisma.instance) {
            SizeRepositoryPrisma.instance = new SizeRepositoryPrisma()
        }
        
        return SizeRepositoryPrisma.instance
    }

    async createSize(size: Size): Promise<Size> {
        const newSize = await this._client.size.create({
            data: {
                sizeName: size.getSizeName(),
                sizeCategory: size.getSizeCategory(),
                length: size.getLength(),
                width: size.getWidth(),
                description: size.getDescription(),
                userEmail: size.getUserEmail(),
                productId: +size.getProductId()
            }
        })

        size.setId(newSize.id+"")
        size.setCreatedAt(newSize.createdAt)
        size.setUpdatedAt(newSize.updatedAt) 
        return Promise.resolve(size)
    }
    
    async updateSize(size: Size): Promise<Size> {
        const updatedSize = await this._client.size.update({
            where: {
                id: +size.getId()!
            },
            data: {
                sizeName: size.getSizeName(),
                sizeCategory: size.getSizeCategory(),
                length: size.getLength(),
                width: size.getWidth(),
                description: size.getDescription(),
            }
        })
        
        size.setUpdatedAt(updatedSize.updatedAt)
        return Promise.resolve(size)
    }


    async readById(sizeId: string, detailed: boolean = false): Promise<Size | null> {
        let size: Size|null = null
        const sizeResult = await this._client.size.findUnique({
            where: {
                id: +sizeId
            },
            include: {
                creator: detailed,
                product: detailed
            }
        })

        if(sizeResult) {
            size = new Size(sizeResult.userEmail, sizeResult.productId+"", 
                sizeResult.sizeName, sizeResult.sizeCategory, sizeResult.length,
                sizeResult.width, sizeResult.description)
            size.setId(sizeResult.id+"")
            size.setIsActive(sizeResult.isActive)
            sizeResult.deactivatedAt ? size.setDeactivatedAt(sizeResult.deactivatedAt) : null
            sizeResult.creator ? size.setCreator(new User(sizeResult.creator.email, sizeResult.creator.username, ""))
                : null
            if(sizeResult.product) {
                const relatedProduct = new Product(sizeResult.product.userEmail, sizeResult.product.productName,
                    sizeResult.product.productClass, sizeResult.product.productType, sizeResult.product.material, sizeResult.product.description)

                relatedProduct.setId(sizeResult.product.id+"")
                relatedProduct.setIsActive(sizeResult.product.isActive)
                relatedProduct.setCreatedAt(sizeResult.product.createdAt)
                relatedProduct.setUpdatedAt(sizeResult.product.updatedAt)
                
                sizeResult.product.deactivatedAt ? relatedProduct.setDeactivatedAt(sizeResult.product.deactivatedAt)
                    : null

                size.setProduct(relatedProduct)
            }
            size.setCreatedAt(sizeResult.createdAt)
            size.setUpdatedAt(sizeResult.updatedAt)
        }
        return Promise.resolve(size)
    }

    async updateActiveStatus(size: Size): Promise<Size> {
        const now = new Date()
        const updatedSize = await this._client.size.update({
            where: {
                id: +size.getId()!
            },
            data: {
                isActive: size.getIsActive(),
                
                // update only when its deactivated
                deactivatedAt: !size.getIsActive() ? now : size.getDeactivatedAt()
            }
        })
        
        size.setDeactivatedAt(updatedSize.deactivatedAt!)
        size.setUpdatedAt(updatedSize.updatedAt)
        return Promise.resolve(size)
    }
}

export default SizeRepositoryPrisma