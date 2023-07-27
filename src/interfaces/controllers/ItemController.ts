import CreateItemUseCase from "../../application/usecases/item/CreateItemUseCase"
import GetItemDetailUseCase from "../../application/usecases/item/GetItemDetailUseCase"
import RemoveItemUseCase from "../../application/usecases/item/RemoveItemUseCase"
import ToggleItemActiveUseCase from "../../application/usecases/item/ToggleItemActiveUseCase"

interface ItemController {
    createItem(useCase: CreateItemUseCase): (...args: any[]) => any
    getItemDetail(useCase: GetItemDetailUseCase): (...args: any[]) => any
    toggleItemActive(useCase: ToggleItemActiveUseCase): (...args: any[]) => any
    removeItem(useCase: RemoveItemUseCase): (...args: any[]) => any
}

export default ItemController