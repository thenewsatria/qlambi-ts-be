import AddSizeToProductUseCase from "../../application/usecases/product/AddSizeToProductUseCase"

interface SizeController {
    addSizeToProduct(useCase: AddSizeToProductUseCase): (...args: any[]) => any
}

export default SizeController
