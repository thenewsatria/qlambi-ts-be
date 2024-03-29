import ItemService from "../../../domain/services/ItemService";
import ItemGeneralResponseDTO from "../../../interfaces/dtos/item/ItemGeneralResponseDTO";
import ItemIdDTO from "../../../interfaces/dtos/item/singular/ItemIdDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class ToggleItemActiveUseCase {
    private readonly itemService: ItemService

    constructor(itemService: ItemService) {
        this.itemService = itemService
    }

    async execute(data: ItemIdDTO, requestSchema: any): Promise<ItemGeneralResponseDTO> {
        await this.itemService.validateData(requestSchema, data)
        const item = await this.itemService.fetchById(data)
        if(!item){
            return Promise.reject(
                new ResourceNotFoundError("Item with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.ITEM)
            )
        }
        item.setIsActive(!item.getIsActive())
        const updatedItem = await this.itemService.setActiveStatus({item: item})
        const itemCreator = item.getCreator()
        const itemProduct = item.getProduct() 
        const itemSize = item.getSize()
        const itemColor = item.getColor()

        return Promise.resolve({
            id: updatedItem.getId(),
            itemCode: updatedItem.getItemCode(),
            itemName: updatedItem.getItemName(),
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
            :
            updatedItem.getProductId(),
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
            updatedItem.getColorId(),
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
            updatedItem.getSizeId(),
            price: updatedItem.getPrice(),
            itemImages: updatedItem.getItemImages(),
            stock: updatedItem.getStock(),
            description: updatedItem.getDescription(),
            creator: itemCreator ? {
                username: itemCreator.getUsername(),
                email: itemCreator.getEmail(),
            }
            :
            updatedItem.getUserEmail(),
            isActive: updatedItem.getIsActive(),
            deactivatedAt: updatedItem.getDeactivatedAt(),
            createdAt: updatedItem.getCreatedAt(),
            updatedAt: updatedItem.getUpdatedAt()
        })
    }
}

export default ToggleItemActiveUseCase