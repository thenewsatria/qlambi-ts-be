import Product from "../../domain/entities/Product"

interface ProductRepository {
    createProduct(product: Product): Promise<Product>
}

export default ProductRepository