import Default from "../../../domain/enums/Default";
import ItemService from "../../../domain/services/ItemService";
import ItemGeneralResponseDTO from "../../../interfaces/dtos/item/ItemGeneralResponseDTO";
import ItemImageUpdateRequestDTO from "../../../interfaces/dtos/item/ItemImageUpdateRequestDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceConflictError from "../../errors/app/ResourceConflictError";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class UploadItemImageUseCase {
    private readonly itemService: ItemService
    
    constructor(itemService: ItemService) {
        this.itemService = itemService
    }

    async execute(data: ItemImageUpdateRequestDTO, requestSchema: any): Promise<ItemGeneralResponseDTO> {
        await this.itemService.validateData<ItemImageUpdateRequestDTO>(requestSchema, data);
        const item = await this.itemService.fetchById({id: data.id})
        if (!item) {
            return Promise.reject(
                new ResourceNotFoundError("Item with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.ITEM)
            )
        }

        const currentItemImages = item.getItemImages()

        // Check images of the item if its already have 5 images
        // if yes then abort and delete this current uploaded image. (delete mechanism is in controller
        if(currentItemImages.length >= 5){
            return Promise.reject(
                new ResourceConflictError("Item with specified id already has 5 images", true, AppOperationType.VALIDATION,
                    ResourceType.ITEM, ["itemImages"])
            )
        }

        // if current item images only have 1 default image then set the new item image as the only image
        if(currentItemImages.length == 1 && currentItemImages[0] == Default.ITEM_IMAGE_URL){
            item.setItemImages([data.itemImage])
        }else{
            item.setItemImages([...currentItemImages, data.itemImage])
        }

        const updatedItem = await this.itemService.updateItem({item: item})
        const itemCreator = updatedItem.getCreator()
        const itemProduct = updatedItem.getProduct() 
        const itemSize = updatedItem.getSize()
        const itemColor = updatedItem.getColor()

        return Promise.resolve({
            id: updatedItem.getId(),
            itemCode: updatedItem.getItemCode(),
            itemName: updatedItem.getItemName(),
            creator: itemCreator ? {
                username: itemCreator.getUsername(),
                email: itemCreator.getEmail(),
            }
            :
            updatedItem.getUserEmail(),
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
            isActive: updatedItem.getIsActive()
        })
    }
}

export default UploadItemImageUseCase