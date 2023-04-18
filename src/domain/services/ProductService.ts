import ProductAddColorDTO from "../../interfaces/dtos/product/ProductAddColorDTO";
import ProductCreationRequestDTO from "../../interfaces/dtos/product/ProductCreationRequestDTO";
import ProductGeneralListRequestDTO from "../../interfaces/dtos/product/ProductGeneralListRequestDTO";
import ProductHasColorDTO from "../../interfaces/dtos/product/ProductHasColorRequestDTO";
import ProductRemoveColorDTO from "../../interfaces/dtos/product/ProductRemoveColorDTO";
import ProductDTO from "../../interfaces/dtos/product/singular/ProductDTO";
import ProductIdDTO from "../../interfaces/dtos/product/singular/ProductIdDTO";
import ProductRepository from "../../interfaces/repositories/ProductRepository";
import Validator from "../../interfaces/validators/Validator";
import Product from "../entities/Product";

class ProductService {
    private readonly repository: ProductRepository
    private readonly validator: Validator
    
    constructor(repository: ProductRepository, validator: Validator) {
        this.repository = repository
        this.validator = validator
    }

    async validateData<DataT>(schema: any, data: DataT): Promise<DataT> {
        return this.validator.validate<DataT>(schema, data)
    }

    async insertProduct(data: ProductCreationRequestDTO): Promise<Product> {
        const newProduct = new Product(data.userEmail, data.productName,
            data.productClass, data.productType, data.material, data.description)
        const insertedProduct = await this.repository.createProduct(newProduct)
        return Promise.resolve(insertedProduct)
    }
    
    async updateProduct(data: ProductDTO): Promise<Product> {
        const updatedProduct = await this.repository.updateProduct(data.product)
        return Promise.resolve(updatedProduct)
    }
    
    async setActiveStatus(data: ProductDTO): Promise<Product> {
        const updatedProduct = await this.repository.updateActiveStatus(data.product)
        return Promise.resolve(updatedProduct)
    }

    async removeProduct(data: ProductDTO): Promise<Product> {
        const deletedProduct = await this.repository.deleteProduct(data.product, true)
        return Promise.resolve(deletedProduct)
    }

    async fetchAll(query: ProductGeneralListRequestDTO): Promise<Product[]> {
        const products = await this.repository.readAllwSearch(query, true)
        return Promise.resolve(products)
    }

    async fetchById(data: ProductIdDTO): Promise<Product|null> {
        const product = await this.repository.readById(data.id, false)
        return Promise.resolve(product)
    }

    async fetchDetailById(data: ProductIdDTO): Promise<Product|null> {
        const product = await this.repository.readById(data.id, true)
        return Promise.resolve(product)
    }

    async hasColor(data: ProductHasColorDTO): Promise<Boolean> {
        const condition = await this.repository.hasColor(data.product, data.color)
        return Promise.resolve(condition)
    }

    async removeColor(data: ProductRemoveColorDTO): Promise<Product> {
        const product = await this.repository.removeColor(data.product, data.color)
        return Promise.resolve(product)
    }

    async addColor(data: ProductAddColorDTO): Promise<Product> {
        const product = await this.repository.addColor(data.product, data.color, data.asssigner)
        return Promise.resolve(product)
    }
}

export default ProductService