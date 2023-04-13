import AddColorUseCase from "../../application/usecases/color/AddColorUseCase";

interface ColorController {
    addProduct(useCase: AddColorUseCase): (...args: any[]) => any
}

export default ColorController