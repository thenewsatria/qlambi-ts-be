import AddSizeToProductUseCase from "../../application/usecases/size/AddSizeToProductUseCase"

interface SizeController {
    addSizeToProduct(useCase: AddSizeToProductUseCase): (...args: any[]) => any
}

export default SizeController
