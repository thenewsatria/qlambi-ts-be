import ItemService from "../../../domain/services/ItemService";
import ItemGeneralListRequestDTO from "../../../interfaces/dtos/item/ItemGeneralListRequestDTO";
import ItemGeneralListResponseDTO from "../../../interfaces/dtos/item/ItemGeneralListResponseDTO";
import ItemGeneralResponseDTO from "../../../interfaces/dtos/item/ItemGeneralResponseDTO";

class GetItemListUseCase {
    private readonly itemService: ItemService

    constructor(itemService: ItemService) {
        this.itemService = itemService
    }

    async execute(query: ItemGeneralListRequestDTO): Promise<ItemGeneralListResponseDTO> {
        const itemDetails: ItemGeneralResponseDTO[] = []
        const items = await this.itemService.fetchAll(query)
        
        for (const item of items) {
            const itemCreator = item.getCreator()
            const itemProduct = item.getProduct()
            const itemColor = item.getColor()
            const itemSize = item.getSize()

            itemDetails.push({
                id: item.getId(),
                itemCode: item.getItemCode(),
                itemName: item.getItemName(),
                creator: itemCreator ? {
                    email: itemCreator.getEmail(),
                    username: itemCreator.getUsername(),
                }   
                :
                item.getUserEmail(),
                product: itemProduct ? {
                    id: itemProduct.getId(),
                    creator: itemProduct.getUserEmail(),
                    productClass: itemProduct.getProductClass(),
                    productName: itemProduct.getProductName(),
                    productType: itemProduct.getProductType(),
                    material: itemProduct.getMaterial(),
                    description: itemProduct.getDescription(),
                    isActive: itemProduct.getIsActive(),
                    deactivatedAt: itemProduct.getDeactivatedAt(),
                    createdAt: itemProduct.getCreatedAt(),
                    updatedAt: itemProduct.getUpdatedAt()
                }
                :
                item.getProductId(),
                color: itemColor ? {
                    id: itemColor.getId(),
                    creator: itemColor.getUserEmail(),
                    colorName: itemColor.getColorName(),
                    hexValue: itemColor.getHexValue(),
                    description: itemColor.getDescription(),
                    isActive: itemColor.getIsActive(),
                    deactivatedAt: itemColor.getDeactivatedAt(),
                    createdAt: itemColor.getCreatedAt(),
                    updatedAt: itemColor.getUpdatedAt()
                }
                :
                item.getColorId(),
                size: itemSize ? {
                    id: itemSize.getId(),
                    creator: itemSize.getUserEmail(),
                    sizeName: itemSize.getSizeName(),
                    sizeCategory: itemSize.getSizeCategory(),
                    length: itemSize.getLength(),
                    width: itemSize.getWidth(),
                    description: itemSize.getDescription(),
                    isActive: itemSize.getIsActive(),
                    deactivatedAt: itemSize.getDeactivatedAt(),
                    createdAt: itemSize.getCreatedAt(),
                    updatedAt: itemSize.getUpdatedAt(),
                }
                :
                item.getSizeId(),
                itemImages: item.getItemImages(),
                price: item.getPrice(),
                stock: item.getStock(),
                description: item.getDescription(),
                isActive: item.getIsActive(),
                deactivatedAt: item.getDeactivatedAt(),
                createdAt: item.getCreatedAt(),
                updatedAt: item.getUpdatedAt()
            })
        }

        return Promise.resolve({
            count: items.length,
            items: itemDetails
        })
    }
}

export default GetItemListUseCase