import ColorService from "../../../domain/services/ColorService";
import ItemService from "../../../domain/services/ItemService";
import ProductService from "../../../domain/services/ProductService";
import SizeService from "../../../domain/services/SizeService";
import ItemCreationRequestDTO from "../../../interfaces/dtos/item/ItemCreationRequestDTO";
import ItemGeneralResponseDTO from "../../../interfaces/dtos/item/ItemGeneralResponseDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceConflictError from "../../errors/app/ResourceConflictError";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class CreateItemUseCase {
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

    async execute(data: ItemCreationRequestDTO, requestSchema: any): Promise<ItemGeneralResponseDTO>{
        // 1. Validasi data request v
        // 2. Validasi dan check apakah productId ada dan active v
        // 3. Validasi dan check apakah colorId, active ada dan bagian dari product v
        // 4. Validasi dan check apakah sizeId, active ada dan bagian dari product v

        // Set Default image if itemImages is empty
        if(data.itemImages.length ==  0){
            data.itemImages = ["https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"]
        }

        // Change data type from string to number because it is from formData
        data.price = +data.price
        data.stock = +data.stock

        // Validate Data
        await this.itemService.validateData<ItemCreationRequestDTO>(requestSchema, data);
        
        // Check if item code is used
        const relatedItem = await this.itemService.isItemCodeExist({itemCode: data.itemCode})
        if(relatedItem){
            return Promise.reject(
                new ResourceConflictError("Item with specified code already exists", true,
                    AppOperationType.VALIDATION, ResourceType.ITEM, ["itemCode"])
            )
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

        const item = await this.itemService.insertItem(data)
        const itemCreator = item.getCreator()
        const itemProduct = item.getProduct() 
        const itemSize = item.getSize()
        const itemColor = item.getColor()
        
        return Promise.resolve({
            id: item.getId(),
            itemCode: item.getItemCode(),
            itemName: item.getItemName(),
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
                updatedAt: itemColor.getUpdatedAt(),
            }
                :
            item.getColorId(),
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
            item.getSizeId(),
            price: item.getPrice(),
            itemImages: item.getItemImages(),
            stock: item.getStock(),
            description: item.getDescription(),
            creator: itemCreator ? {
                username: itemCreator.getUsername(),
                email: itemCreator.getEmail(),
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