import AddSizeUseCase from "../../application/usecases/size/AddSizeUseCase"
import ToggleSizeActiveUseCase from "../../application/usecases/size/ToggleSizeActiveUseCase"
import UpdateSizeUseCase from "../../application/usecases/size/UpdateSizeUseCase"

interface SizeController {
    addSizeToProduct(useCase: AddSizeUseCase): (...args: any[]) => any
    updateSize(useCase: UpdateSizeUseCase): (...args: any[]) => any
    toggleSizeActive(useCase: ToggleSizeActiveUseCase): (...args: any[]) => any
}

export default SizeController
