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

    async readAll(detailed: boolean): Promise<Product[]> {
        const products: Product[] = []
        const productsRes = await this._client.product.findMany({
            include: {
                creator: detailed
            }
        })
        for (const currProd of productsRes) {
            const product = new Product(currProd.userEmail, currProd.productName, currProd.productClass,
                currProd.productType, currProd.material, currProd.description)
            product.setId(currProd.id+"")
            product.setIsActive(currProd.isActive)
            currProd.deactivatedAt ? product.setDeactivatedAt(currProd.deactivatedAt) : null
            currProd.creator ? 
                product.setCreator(new User(currProd.creator.email, currProd.creator.username, "")) 
                : null
            product.setCreatedAt(currProd.createdAt)
            product.setUpdatedAt(currProd.updatedAt)
            products.push(product)
        }
        
        return Promise.resolve(products)
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


    async deleteById(product: Product, detailed: boolean = false): Promise<Product> {
        const deletedProduct = await this._client.product.delete({
            where: {
                id: +product.getId()!
            },
            include: {
                creator: detailed
            }
        })
        if(deletedProduct){
            product = new Product(deletedProduct.userEmail, deletedProduct.productName, deletedProduct.productClass,
                deletedProduct.productType, deletedProduct.material, deletedProduct.description)
            product.setId(deletedProduct.id+"")
            product.setIsActive(deletedProduct.isActive)
            deletedProduct.deactivatedAt ? product.setDeactivatedAt(deletedProduct.deactivatedAt) : null
            deletedProduct.creator ? 
                product.setCreator(new User(deletedProduct.creator.email, deletedProduct.creator.username, "")) 
                : null
            product.setCreatedAt(deletedProduct.createdAt)
            product.setUpdatedAt(deletedProduct.updatedAt)
        }

        return Promise.resolve(product)
    }
}

export default ProductRepositoryPrisma