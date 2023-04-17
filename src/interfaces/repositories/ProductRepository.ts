import Color from "../../domain/entities/Color"
import Product from "../../domain/entities/Product"

interface ProductRepository {
    createProduct(product: Product): Promise<Product>
    updateActiveStatus(product: Product): Promise<Product>
    updateProduct(product: Product): Promise<Product>
    readById(productId: string, detailed: boolean): Promise<Product|null>
    deleteProduct(product: Product, detailed: boolean): Promise<Product>
    readAll(detailed: boolean): Promise<Product[]>
    readAllwSearch(query: any, detailed: boolean): Promise<Product[]>
    hasColor(product: Product, color: Color): Promise<Boolean>
    addColor(product: Product, color: Color, assigner: string): Promise<Product>
}

export default ProductRepository