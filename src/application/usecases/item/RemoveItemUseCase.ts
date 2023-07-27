import ItemService from "../../../domain/services/ItemService";
import ItemDeletionRequestDTO from "../../../interfaces/dtos/item/ItemDeletionRequestDTO";
import ItemGeneralResponseDTO from "../../../interfaces/dtos/item/ItemGeneralResponseDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceConflictError from "../../errors/app/ResourceConflictError";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class RemoveItemUseCase {
    private readonly itemService: ItemService

    constructor(itemService: ItemService) {
        this.itemService = itemService
    }

    async execute(data: ItemDeletionRequestDTO, requestSchema: any): Promise<ItemGeneralResponseDTO> {
        await this.itemService.validateData(requestSchema, data)
        const item = await this.itemService.fetchById({id: data.id})
        if (!item) {
            return Promise.reject(
                new ResourceNotFoundError("Item with specific id  doesn't exist", true,
                    AppOperationType.FETCHING, ResourceType.ITEM)
            )
        }

        if (data.itemName !== item.getItemName()) {
            return Promise.reject(
                new ResourceConflictError("Item name is incorrect", true,
                    AppOperationType.VALIDATION, ResourceType.ITEM, ["itemName"])
            )
        }

        const deletedItem = await this.itemService.removeItem({item: item})
        const itemCreator = deletedItem.getCreator()
        const itemProduct = deletedItem.getProduct()
        const itemColor = deletedItem.getColor()
        const itemSize = deletedItem.getSize()

        return Promise.resolve({
            id: deletedItem.getId(),
            itemCode: deletedItem.getItemCode(),
            itemName: deletedItem.getItemName(),
            product: itemProduct ? {
                id: itemProduct.getId(),
                creator: itemProduct.getUserEmail(),
                productName: itemProduct.getProductName(),
                productClass: itemProduct.getProductClass(),
                productType: itemProduct.getProductType(),
                material: itemProduct.getMaterial(),
                description: itemProduct.getDescription(),
                isActive: itemProduct.getIsActive(),
                deactivatedAt: itemProduct.getDeactivatedAt(),
                createdAt: itemProduct.getCreatedAt(),
                updatedAt: itemProduct.getUpdatedAt(),
            }
            : deletedItem.getProductId(),
            color: itemColor ? {
                id: itemColor.getId(),
                creator: itemColor.getUserEmail(),
                colorName: itemColor.getColorName(),
                hexValue: itemColor.getHexValue(),
                description: itemColor.getDescription(),
                isActive: itemColor.getIsActive(),
                deactivatedAt: itemColor.getDeactivatedAt(),
                createdAt: itemColor.getCreatedAt(),
                updatedAt: itemColor.getUpdatedAt(),
            }
                :
                deletedItem.getColorId(),
            size: itemSize ? {
                id: itemSize.getId(),
                sizeName: itemSize.getSizeName(),
                sizeCategory: itemSize.getSizeCategory(),
                length: itemSize.getLength(),
                width: itemSize.getWidth(),
                description: itemSize.getDescription(),
                creator: itemSize.getUserEmail(),
                product: itemSize.getProductId(),
                isActive: itemSize.getIsActive(),
                deactivatedAt: itemSize.getDeactivatedAt(),
                createdAt: itemSize.getCreatedAt(),
                updatedAt: itemSize.getUpdatedAt(),
            }
                :
                deletedItem.getSizeId(),
            price: deletedItem.getPrice(),
            itemImages: deletedItem.getItemImages(),
            stock: deletedItem.getStock(),
            description: deletedItem.getDescription(),
            creator: itemCreator ? {
                username: itemCreator.getUsername(),
                email: itemCreator.getEmail(),
            }
                :
                deletedItem.getUserEmail(),
            isActive: deletedItem.getIsActive(),
            deactivatedAt: deletedItem.getDeactivatedAt(),
            createdAt: deletedItem.getCreatedAt(),
            updatedAt: deletedItem.getUpdatedAt()
        })
    }
}

export default RemoveItemUseCase