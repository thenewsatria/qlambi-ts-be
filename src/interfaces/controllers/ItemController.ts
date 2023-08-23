import CreateItemUseCase from "../../application/usecases/item/CreateItemUseCase"
import GetItemDetailUseCase from "../../application/usecases/item/GetItemDetailUseCase"
import GetItemListUseCase from "../../application/usecases/item/GetItemListUseCase"
import RemoveItemImageUseCase from "../../application/usecases/item/RemoveItemImageUseCase"
import RemoveItemUseCase from "../../application/usecases/item/RemoveItemUseCase"
import ToggleItemActiveUseCase from "../../application/usecases/item/ToggleItemActiveUseCase"
import UpdateItemUseCase from "../../application/usecases/item/UpdateItemUseCase"
import UploadItemImageUseCase from "../../application/usecases/item/UploadItemImageUseCase"

interface ItemController {
    createItem(useCase: CreateItemUseCase): (...args: any[]) => any
    getItemDetail(useCase: GetItemDetailUseCase): (...args: any[]) => any
    getItemList(useCase: GetItemListUseCase): (...args: any[]) => any
    updateItem(useCase: UpdateItemUseCase): (...args: any[]) => any
    toggleItemActive(useCase: ToggleItemActiveUseCase): (...args: any[]) => any
    removeItem(useCase: RemoveItemUseCase): (...args: any[]) => any
    uploadItemImage(useCase: UploadItemImageUseCase): (...args: any[]) => any
    removeItemImage(useCase: RemoveItemImageUseCase): (...args: any[]) => any
}

export default ItemController