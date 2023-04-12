import ProductCreationRequestDTO from "../../interfaces/dtos/product/ProductCreationRequestDTO";
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

    async removeById(data: ProductDTO): Promise<Product> {
        const deletedProduct = await this.repository.deleteById(data.product, true)
        return Promise.resolve(deletedProduct)
    }

    async fetchById(data: ProductIdDTO): Promise<Product|null> {
        const product = await this.repository.readById(data.id, false)
        return Promise.resolve(product)
    }

    async fetchDetailById(data: ProductIdDTO): Promise<Product|null> {
        const product = await this.repository.readById(data.id, true)
        return Promise.resolve(product)
    }
}

export default ProductService