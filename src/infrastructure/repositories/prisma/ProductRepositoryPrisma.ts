import Product from "../../../domain/entities/Product"
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
}

export default ProductRepositoryPrisma