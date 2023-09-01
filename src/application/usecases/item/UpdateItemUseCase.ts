import ColorService from "../../../domain/services/ColorService"
import ItemService from "../../../domain/services/ItemService"
import ProductService from "../../../domain/services/ProductService"
import SizeService from "../../../domain/services/SizeService"
import ItemGeneralResponseDTO from "../../../interfaces/dtos/item/ItemGeneralResponseDTO"
import ItemUpdateRequestDTO from "../../../interfaces/dtos/item/ItemUpdateRequestDTO"
import AppOperationType from "../../../interfaces/enums/AppOperationType"
import ResourceType from "../../../interfaces/enums/ResourceType"
import ResourceConflictError from "../../errors/app/ResourceConflictError"
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError"

class UpdateItemUseCase {
    private readonly itemService: ItemService
    private readonly productService: ProductService
    private readonly colorService: ColorService
    private readonly sizeService: SizeService

    constructor(itemService: ItemService, productService: ProductService, colorService: ColorService, sizeService: SizeService) {
        this.itemService = itemService;
        this.productService = productService
        this.colorService = colorService
        this.sizeService = sizeService
    }

    async execute(data: ItemUpdateRequestDTO, requestSchema: any): Promise<ItemGeneralResponseDTO> {
        // 1. Validasi data request v
        // 2. Validasi apakah item ada
        // 3. Vaildasi apakah itemCode diubah? jika iya maka check apakah itemCode digunakan v
        // 4. Validasi dan check apakah productId ada dan active v
        // 5. Validasi dan check apakah colorId, active ada dan bagian dari product v
        // 6. Validasi dan check apakah sizeId, active ada dan bagian dari product v
        // 7. Update item

        await this.itemService.validateData<ItemUpdateRequestDTO>(requestSchema, data)
        const item = await this.itemService.fetchById({id: data.id})
        if (!item) {
            return Promise.reject(
                new ResourceNotFoundError("Item with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.ITEM)
            )
        }

        // if itemCode is updated then check if the update for itemCode is already used or not.
        // if not updated then ignore the check
        if (item.getItemCode() != data.itemCode) {
            // Check if item code is used
            const relatedItem = await this.itemService.isItemCodeExist({itemCode: data.itemCode})
            if(relatedItem){
                return Promise.reject(
                    new ResourceConflictError("Item with specified code already exists", true,
                        AppOperationType.VALIDATION, ResourceType.ITEM, ["itemCode"])
                )
            }   
        }

        const product = await this.productService.fetchDetailById({id: data.productId})
        if (!product || !product.getIsActive()) {
            return Promise.reject(
                new ResourceNotFoundError("Product with specified id doesn't exist", true, 
                    AppOperationType.VALIDATION, ResourceType.PRODUCT)
            )
        }

        const currentProductColors = product.getAvailableColors()
        const currentProductSizes = product.getAvailableSizes()

        const color = await this.colorService.fetchById({id: data.colorId})
        if (!color || !color.getIsActive()) {
            return Promise.reject(
                new ResourceNotFoundError("Color with specified id doesn't exist", true,
                    AppOperationType.VALIDATION, ResourceType.COLOR)
            )
        }
        
        if (currentProductColors){
            const color = currentProductColors.filter(item => item.getId() === data.colorId)
            if (color.length == 0) {
                return Promise.reject(
                    new ResourceNotFoundError("Colors isn't available on the current product", true,
                        AppOperationType.VALIDATION, ResourceType.COLOR)
                )
            }
        }else{ //if undefined
            return Promise.reject(
                new ResourceNotFoundError("Colors isn't available on the current product", true,
                    AppOperationType.VALIDATION, ResourceType.COLOR)
            )
        }

        const size = await this.sizeService.fetchById({id: data.sizeId})
        if (!size || !size.getIsActive()) {
            return Promise.reject(
                new ResourceNotFoundError("Size with specified id doesn't exist", true,
                    AppOperationType.VALIDATION, ResourceType.SIZE)
            )
        }

        if(currentProductSizes) {
            const size = currentProductSizes.filter(item => item.getId() === data.sizeId)
            if (size.length == 0) {
                return Promise.reject(
                    new ResourceNotFoundError("Sizes isn't available on the current product", true,
                        AppOperationType.VALIDATION, ResourceType.COLOR)
                )
            }
        }else{
            return Promise.reject(
                new ResourceNotFoundError("Sizes isn't available on the current product", true,
                    AppOperationType.VALIDATION, ResourceType.COLOR)
            )
        }

        item.setItemName(data.itemName)
        item.setItemCode(data.itemCode)
        item.setProductId(data.productId)
        item.setColorId(data.colorId)
        item.setSizeId(data.sizeId)
        item.setPrice(data.price)
        item.setStock(data.stock)
        item.setDescription(data.description)

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

export default UpdateItemUseCase