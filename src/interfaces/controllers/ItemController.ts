import CreateItemUseCase from "../../application/usecases/item/CreateItemUseCase"
import GetItemDetailUseCase from "../../application/usecases/item/GetItemDetailUseCase"

interface ItemController {
    createItem(useCase: CreateItemUseCase): (...args: any[]) => any
    getItemDetail(useCase: GetItemDetailUseCase): (...args: any[]) => any
}

export default ItemController