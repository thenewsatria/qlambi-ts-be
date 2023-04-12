import Product from "../../../domain/entities/Product"
import User from "../../../domain/entities/User"
import ProductRepository from "../../../interfaces/repositories/ProductRepository"
import prismaClient from "../../databases/prisma/client"

class ProductRepositoryPrisma implements ProductRepository {
    
    private readonly _client = prismaClient
    private static instance: ProductRepositoryPrisma
    
    public static getInstance() {
        if(!ProductRepositoryPrisma.instance) {
            ProductRepositoryPrisma.instance = new ProductRepositoryPrisma()
        }
        
        return ProductRepositoryPrisma.instance
    }

    async createProduct(product: Product): Promise<Product> {
        const newProduct = await this._client.product.create({
            data: {
                productName: product.getProductName(),
                productClass: product.getProductClass(),
                productType: product.getProductType(),
                material: product.getMaterial(),
                description: product.getDescription(),
                userEmail: product.getUserEmail()
            },
        })

        product.setId(newProduct.id+"")
        product.setCreatedAt(newProduct.createdAt)
        product.setUpdatedAt(newProduct.updatedAt) 
        return Promise.resolve(product)
    }

    async updateProduct(product: Product): Promise<Product> {
        const updateRes = await this._client.product.update({
            where: {
                id: +product.getId()!
            },
            data: {
                productName: product.getProductName(),
                productClass: product.getProductClass(),
                productType: product.getProductType(),
                material: product.getMaterial(),
                description: product.getDescription(),
            }
        })

        product.setUpdatedAt(updateRes.updatedAt)
        return Promise.resolve(product)
    }

    async updateActiveStatus(product: Product): Promise<Product> {
        const now = new Date()
        const updatedProduct = await this._client.product.update({
            where: {
                id: +product.getId()!
            },
            data: {
                isActive: product.getIsActive(),
                deactivatedAt: now
            }
        })
        product.setDeactivatedAt(now)
        return Promise.resolve(product)
    }

    async readById(productId: string, detailed: boolean = false): Promise<Product|null> {
        let product: Product | null = null

        const productResult = await this._client.product.findUnique({
            where: {
                id: +productId
            },
            include: {
                creator: detailed
            }
        })

        if (productResult) {
            product = new Product(productResult.userEmail, productResult.productName, productResult.productClass,
                productResult.productType, productResult.material, productResult.description)
            product.setId(productResult.id+"")
            product.setIsActive(productResult.isActive)
            productResult.deactivatedAt ? product.setDeactivatedAt(productResult.deactivatedAt) : null
            productResult.creator ? 
                product.setCreator(new User(productResult.creator.email, productResult.creator.username, "")) 
                : null
            product.setCreatedAt(productResult.createdAt)
            product.setUpdatedAt(productResult.updatedAt)
        }

        return Promise.resolve(product)
    }
}

export default ProductRepositoryPrisma