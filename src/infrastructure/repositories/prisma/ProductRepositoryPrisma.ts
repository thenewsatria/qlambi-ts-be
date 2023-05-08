import Color from "../../../domain/entities/Color"
import Product from "../../../domain/entities/Product"
import Size from "../../../domain/entities/Size"
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
        let colors: Color[] = []
        let sizes: Size[] = []
        const productResult = await this._client.product.findUnique({
            where: {
                id: +productId
            },
            include: {
                creator: detailed,
                availableColors: {
                    include: {
                        color: detailed
                    }
                },
                availableSizes: detailed
            }
        })

        if (productResult) {
            if(productResult.availableColors) {
                for(const currColor of productResult.availableColors) {
                    const color = new Color(currColor.color.userEmail, currColor.color.colorName,
                        currColor.color.hexValue, currColor.color.description)
                    color.setId(currColor.color.id+"")
                    color.setIsActive(currColor.color.isActive)
                    currColor.color.deactivatedAt ? color.setDeactivatedAt(currColor.color.deactivatedAt) : null
                    color.setCreatedAt(currColor.color.createdAt)
                    color.setUpdatedAt(currColor.color.updatedAt)
                    colors.push(color)
                }
            }

            if(productResult.availableSizes) {
                for(const currSize of productResult.availableSizes) {
                    const size = new Size(currSize.userEmail, currSize.productId+"", currSize.sizeName,
                        currSize.sizeCategory, currSize.length, currSize.width, currSize.description)
                    size.setId(currSize.id+"")
                    size.setActive(currSize.isActive)
                    currSize.deactivatedAt ? size.setDeactivatedAt(currSize.deactivatedAt) : null
                    size.setCreatedAt(currSize.createdAt)
                    size.setUpdatedAt(currSize.updatedAt)
                    sizes.push(size)
                }
            }

            product = new Product(productResult.userEmail, productResult.productName, productResult.productClass,
                productResult.productType, productResult.material, productResult.description)
            product.setId(productResult.id+"")
            product.setIsActive(productResult.isActive)
            productResult.deactivatedAt ? product.setDeactivatedAt(productResult.deactivatedAt) : null
            productResult.creator ? 
                product.setCreator(new User(productResult.creator.email, productResult.creator.username, "")) 
                : null
            product.setAvailableColors(colors)
            product.setAvailableSizes(sizes)
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
        
        const currentColors = product.getAvailableColors()
        if(currentColors){
            colors = currentColors
        }
        colors.push(color)

        product.setAvailableColors(colors)
        return Promise.resolve(product)
    }

    async removeColor(product: Product, color: Color): Promise<Product> {
        await this._client.colorsOnProducts.delete({
            where: {
                colorId_productId: {
                    productId: +product.getId()!,
                    colorId: +color.getId()!,
                }    
            }
        })
        
        let currentColors = product.getAvailableColors()!
        currentColors = currentColors.filter(el => el.getId() !== color.getId())
        product.setAvailableColors(currentColors)
        return Promise.resolve(product)
    }

    async clearColors(product: Product): Promise<Product> {
        await this._client.colorsOnProducts.deleteMany({
            where: {
                productId: +product.getId()!
            }
        })

        product.setAvailableColors([])
        return Promise.resolve(product)
    }

    async addSize(product: Product, size: Size): Promise<Product> {
        let sizes: Size[] = []
        const insertedSize = await this._client.size.create({
            data: {
                sizeName: size.getSizeName(),
                sizeCategory: size.getSizeCategory(),
                length: size.getLength(),
                width: size.getWidth(),
                description: size.getDescription(),
                userEmail: size.getUserEmail(),
                productId: +product.getId()!,
            }
        })
        
        size.setId(insertedSize.id+"")
        size.setCreatedAt(insertedSize.createdAt)
        size.setUpdatedAt(insertedSize.updatedAt) 

        const currentSizes = product.getAvailableSizes()
        if(currentSizes){
            sizes = currentSizes
        }
        sizes.push(size)

        return Promise.resolve(product)
    }
}

export default ProductRepositoryPrisma