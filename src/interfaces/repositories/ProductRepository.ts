import Product from "../../domain/entities/Product"

interface ProductRepository {
    createProduct(product: Product): Promise<Product>
    updateActiveStatus(product: Product): Promise<Product>
    updateProduct(product: Product): Promise<Product>
    readById(productId: string, detailed: boolean): Promise<Product|null>
    deleteById(product: Product, detailed: boolean): Promise<Product>
    readAll(detailed: boolean): Promise<Product[]>
}

export default ProductRepository