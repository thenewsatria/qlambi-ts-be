import Color from "../../../domain/entities/Color"
import Product from "../../../domain/entities/Product"
import User from "../../../domain/entities/User"
import ProductGeneralListRequestDTO from "../../../interfaces/dtos/product/ProductGeneralListRequestDTO"
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
        product.setDeactivatedAt(updatedProduct.deactivatedAt!)
        product.setUpdatedAt(updatedProduct.updatedAt)
        return Promise.resolve(product)
    }

    async readAllwSearch(query: ProductGeneralListRequestDTO, detailed: boolean): Promise<Product[]> {
        const products: Product[] = []
        const productsRes = await this._client.product.findMany({
            where: query.filter as any,
            orderBy: query.sortOrder as any,
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


    async deleteProduct(product: Product, detailed: boolean = false): Promise<Product> {
        const colorRelation = await this._client.product.delete({
            where: {
                id: +product.getId()!
            },
            include: {
                creator: detailed
            }
        })
        if(colorRelation){
            product = new Product(colorRelation.userEmail, colorRelation.productName, colorRelation.productClass,
                colorRelation.productType, colorRelation.material, colorRelation.description)
            product.setId(colorRelation.id+"")
            product.setIsActive(colorRelation.isActive)
            colorRelation.deactivatedAt ? product.setDeactivatedAt(colorRelation.deactivatedAt) : null
            colorRelation.creator ? 
                product.setCreator(new User(colorRelation.creator.email, colorRelation.creator.username, "")) 
                : null
            product.setCreatedAt(colorRelation.createdAt)
            product.setUpdatedAt(colorRelation.updatedAt)
        }

        return Promise.resolve(product)
    }


    async hasColor(product: Product, color: Color): Promise<Boolean> {        
        const colorRelation = await this._client.colorsOnProducts.findFirst({
            where: {
                productId: +product.getId()!,
                colorId: +color.getId()!
            }
        })

        return Promise.resolve(colorRelation !== null)
    }

    async addColor(product: Product, color: Color, assigner: string): Promise<Product> {
        let colors: Color[] = []
        await this._client.colorsOnProducts.create({
            data: {
                productId: +product.getId()!,
                colorId: +color.getId()!,
                userEmail: assigner
            }
        })
        
        const curretColors = product.getAvailableColors()
        if(curretColors){
            colors = curretColors
        }
        colors.push(color)

        product.setAvailableColors(colors)
        return Promise.resolve(product)
    }
}

export default ProductRepositoryPrisma