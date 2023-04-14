import AddColorUseCase from "../../application/usecases/color/AddColorUseCase";

interface ColorController {
    addColor(useCase: AddColorUseCase): (...args: any[]) => any
}

export default ColorController