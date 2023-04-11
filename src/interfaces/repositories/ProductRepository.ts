import Product from "../../domain/entities/Product"

interface ProductRepository {
    createProduct(product: Product): Promise<Product>
    updateProduct(product: Product): Promise<Product>
    readById(productId: string, detailed: boolean): Promise<Product|null>

}

export default ProductRepository