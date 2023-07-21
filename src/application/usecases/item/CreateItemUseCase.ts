import ItemService from "../../../domain/services/ItemService";
import ItemCreationRequestDTO from "../../../interfaces/dtos/item/ItemCreationRequestDTO";
import ItemGeneralResponseDTO from "../../../interfaces/dtos/item/ItemGeneralResponseDTO";

class CreateItemUseCase {
    private readonly itemService: ItemService
    
    constructor(itemService: ItemService) {
        this.itemService = itemService;
    }

    async execute(data: ItemCreationRequestDTO, requestSchema: any): Promise<ItemGeneralResponseDTO>{
        await this.itemService.validateData<ItemCreationRequestDTO>(requestSchema, data);
        const item = await this.itemService.insertItem(data)
        const creator = item.getCreator()
        const product = item.getProduct() 
        const size = item.getSize()
        const color = item.getColor()
        
        return Promise.resolve({
            id: item.getId(),
            itemCode: item.getItemCode(),
            itemName: item.getItemName(),
            product: product ? {
                id: product.getId(),
                creator: product.getUserEmail(),
                productName: product.getProductName(),
                productClass: product.getProductClass(),
                productType: product.getProductType(),
                material: product.getMaterial(),
                description: product.getDescription(),
                isActive: product.getIsActive(),
                deactivatedAt: product.getDeactivatedAt(),
                createdAt: product.getCreatedAt(),
                updatedAt: product.getUpdatedAt(),
            }
            :
            item.getProductId(),
            color: color ? {
                id: color.getId(),
                creator: color.getUserEmail(),
                colorName: color.getColorName(),
                hexValue: color.getHexValue(),
                description: color.getDescription(),
                isActive: color.getIsActive(),
                deactivatedAt: color.getDeactivatedAt(),
                createdAt: color.getCreatedAt(),
                updatedAt: color.getUpdatedAt(),
            }
                :
            item.getColorId(),
            size: size ? {
                id: size.getId(),
                sizeName: size.getSizeName(),
                sizeCategory: size.getSizeCategory(),
                length: size.getLength(),
                width: size.getWidth(),
                description: size.getDescription(),
                creator: size.getUserEmail(),
                product: size.getProductId(),
                isActive: size.getIsActive(),
                deactivatedAt: size.getDeactivatedAt(),
                createdAt: size.getCreatedAt(),
                updatedAt: size.getUpdatedAt(),
            }
                :
            item.getSizeId(),
            price: item.getPrice(),
            itemImage: item.getItemImage(),
            stock: item.getStock(),
            description: item.getDescription(),
            creator: creator ? {
                username: creator.getUsername(),
                email: creator.getEmail(),
            }
                :
            item.getUserEmail(),
            isActive: item.getIsActive(),
            deactivatedAt: item.getDeactivatedAt(),
            createdAt: item.getCreatedAt(),
            updatedAt: item.getUpdatedAt()
        })
    }
}

export default CreateItemUseCase