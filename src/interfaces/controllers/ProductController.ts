import AddProductUseCase from "../../application/usecases/product/AddProductUseCase";
import GetProductDetailUseCase from "../../application/usecases/product/GetProductDetailUseCase";
import RemoveProductUseCase from "../../application/usecases/product/RemoveProductUseCase";
import ToggleProductActiveUseCase from "../../application/usecases/product/ToggleProductActiveUseCase";
import UpdateProductUseCase from "../../application/usecases/product/UpdateProductUseCase";

interface ProductController {
    addProduct(useCase: AddProductUseCase): (...args: any[]) => any
    updateProduct(useCase: UpdateProductUseCase): (...args: any[]) => any
    getProductDetail(useCase: GetProductDetailUseCase): (...args: any[]) => any
    toggleProductActive(useCase: ToggleProductActiveUseCase): (...args: any[]) => any
    removeProduct(useCase: RemoveProductUseCase): (...args: any[]) => any
}

export default ProductController

