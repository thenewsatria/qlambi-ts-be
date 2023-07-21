import CreateItemUseCase from "../../application/usecases/item/CreateItemUseCase"

interface ItemController {
    createItem(useCase: CreateItemUseCase): (...args: any[]) => any
}

export default ItemController