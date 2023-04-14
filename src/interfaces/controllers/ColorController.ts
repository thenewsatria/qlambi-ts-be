import AddColorUseCase from "../../application/usecases/color/AddColorUseCase";
import RemoveColorUseCase from "../../application/usecases/color/DeleteColorUseCase";
import ToggleColorActiveUseCase from "../../application/usecases/color/ToggleColorActiveUseCase";
import UpdateColorUseCase from "../../application/usecases/color/UpdateColorUseCase";

interface ColorController {
    addColor(useCase: AddColorUseCase): (...args: any[]) => any
    updateColor(useCase: UpdateColorUseCase): (...args: any[]) => any
    toggleColorActive(useCase: ToggleColorActiveUseCase): (...args: any[]) => any
    deleteColor(useCase: RemoveColorUseCase): (...args: any[]) => any
}


export default ColorController