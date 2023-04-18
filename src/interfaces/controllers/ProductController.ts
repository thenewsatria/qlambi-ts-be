import AddColorToProductUseCase from "../../application/usecases/product/AddColorToProductUseCase";
import AddProductUseCase from "../../application/usecases/product/AddProductUseCase";
import ClearColorFromProductUseCase from "../../application/usecases/product/ClearColorFromProductUseCase";
import GetProductDetailUseCase from "../../application/usecases/product/GetProductDetailUseCase";
import GetProductListUseCase from "../../application/usecases/product/GetProductListUseCase";
import RemoveColorFromProductUseCase from "../../application/usecases/product/RemoveColorFromProductUseCase";
import RemoveProductUseCase from "../../application/usecases/product/RemoveProductUseCase";
import ToggleProductActiveUseCase from "../../application/usecases/product/ToggleProductActiveUseCase";
import UpdateProductUseCase from "../../application/usecases/product/UpdateProductUseCase";

interface ProductController {
    addProduct(useCase: AddProductUseCase): (...args: any[]) => any
    updateProduct(useCase: UpdateProductUseCase): (...args: any[]) => any
    getProductDetail(useCase: GetProductDetailUseCase): (...args: any[]) => any
    toggleProductActive(useCase: ToggleProductActiveUseCase): (...args: any[]) => any
    removeProduct(useCase: RemoveProductUseCase): (...args: any[]) => any
    getProductList(useCase: GetProductListUseCase): (...args: any[]) => any
    addColorToProduct(useCase: AddColorToProductUseCase): (...args: any[]) => any
    removeColorFromProduct(useCase: RemoveColorFromProductUseCase): (...args: any[]) => any
    clearColorFromProduct(useCase: ClearColorFromProductUseCase): (...args: any[]) => any
}

export default ProductController

