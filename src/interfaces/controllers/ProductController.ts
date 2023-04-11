import AddProductUseCase from "../../application/usecases/product/AddProductUseCase";
import UpdateProductUseCase from "../../application/usecases/product/UpdateProductUseCase";

interface ProductController {
    addProduct(useCase: AddProductUseCase): (...args: any[]) => any
    updateProduct(useCase: UpdateProductUseCase): (...args: any[]) => any
}

export default ProductController