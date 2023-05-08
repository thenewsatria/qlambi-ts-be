import AddSizeUseCase from "../../application/usecases/size/AddSizeUseCase"

interface SizeController {
    addSizeToProduct(useCase: AddSizeUseCase): (...args: any[]) => any
}

export default SizeController
