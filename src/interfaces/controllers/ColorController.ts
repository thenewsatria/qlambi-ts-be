import AddColorUseCase from "../../application/usecases/color/AddColorUseCase";
import GetColorDetailUseCase from "../../application/usecases/color/GetColorDetailUseCase";
import GetColorListUseCase from "../../application/usecases/color/GetColorListUseCase";
import RemoveColorUseCase from "../../application/usecases/color/RemoveColorUseCase";
import ToggleColorActiveUseCase from "../../application/usecases/color/ToggleColorActiveUseCase";
import UpdateColorUseCase from "../../application/usecases/color/UpdateColorUseCase";

interface ColorController {
    getColorList(useCase: GetColorListUseCase): (...args: any[]) => any
    getColorDetail(useCase: GetColorDetailUseCase): (...args: any[]) => any
    addColor(useCase: AddColorUseCase): (...args: any[]) => any
    updateColor(useCase: UpdateColorUseCase): (...args: any[]) => any
    toggleColorActive(useCase: ToggleColorActiveUseCase): (...args: any[]) => any
    deleteColor(useCase: RemoveColorUseCase): (...args: any[]) => any
}


export default ColorController