import ItemService from "../../../domain/services/ItemService";
import ItemGeneralResponseDTO from "../../../interfaces/dtos/item/ItemGeneralResponseDTO";
import ItemIdDTO from "../../../interfaces/dtos/item/singular/ItemIdDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class GetItemDetailUseCase {
    private readonly itemService: ItemService

    constructor(itemService: ItemService) {
        this.itemService = itemService
    }
    
    async execute(data: ItemIdDTO, requestSchema: any): Promise<ItemGeneralResponseDTO> {
        await this.itemService.validateData(requestSchema, data)
        const itemDetail = await this.itemService.fetchDetailById(data)
        if(!itemDetail){
            return Promise.reject(
                new ResourceNotFoundError("item with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.ITEM)
            )
        }

        const itemCreator = itemDetail.getCreator()
        const itemProduct = itemDetail.getProduct()
        const itemColor = itemDetail.getColor()
        const itemSize = itemDetail.getSize()

        return Promise.resolve({
            id: itemDetail.getId(),
            itemCode: itemDetail.getItemCode(),
            itemName: itemDetail.getItemName(),
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
            : itemDetail.getProductId(),
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
            itemDetail.getColorId(),
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
            itemDetail.getSizeId(),
            price: itemDetail.getPrice(),
            itemImages: itemDetail.getItemImages(),
            stock: itemDetail.getStock(),
            description: itemDetail.getDescription(),
            creator: itemCreator ? {
                username: itemCreator.getUsername(),
                email: itemCreator.getEmail(),
            }
                :
            itemDetail.getUserEmail(),
            isActive: itemDetail.getIsActive(),
            deactivatedAt: itemDetail.getDeactivatedAt(),
            createdAt: itemDetail.getCreatedAt(),
            updatedAt: itemDetail.getUpdatedAt()
        })
    }

}

export default GetItemDetailUseCase