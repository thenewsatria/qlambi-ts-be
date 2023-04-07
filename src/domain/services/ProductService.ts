import ProductCreationRequestDTO from "../../interfaces/dtos/product/ProductCreationRequestDTO";
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

    async insertProduct(product: ProductCreationRequestDTO): Promise<Product> {
        const newProduct = new Product(product.userEmail, product.productName,
            product.productClass, product.productType, product.material, product.description)
        const insertedProduct = await this.repository.createProduct(newProduct)
        return Promise.resolve(insertedProduct)
    }
}

export default ProductService