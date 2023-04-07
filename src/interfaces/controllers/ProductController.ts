import AddProductUseCase from "../../application/usecases/product/AddProductUseCase";

interface ProductController {
    addProduct(useCase: AddProductUseCase): (...args: any[]) => any
}

export default ProductController