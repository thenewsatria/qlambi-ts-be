import ColorService from "../../../domain/services/ColorService"
import ProductService from "../../../domain/services/ProductService"
import ColorGeneralResponseDTO from "../../../interfaces/dtos/color/ColorGeneralResponseDTO"
import ProductGeneralResponseDTO from "../../../interfaces/dtos/product/ProductGeneralResponse"
import ProductRemoveColorRequestDTO from "../../../interfaces/dtos/product/ProductRemoveColorRequestDTO"
import AppOperationType from "../../../interfaces/enums/AppOperationType"
import ResourceType from "../../../interfaces/enums/ResourceType"
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError"

class RemoveColorFromProductUseCase {
    private readonly productService: ProductService
    private readonly colorService: ColorService
    
    constructor(productService: ProductService, colorService: ColorService) {
        this.productService = productService
        this.colorService = colorService
    }

    async execute(data: ProductRemoveColorRequestDTO, requestSchema: any): Promise<ProductGeneralResponseDTO> {
        // Step:
        // 1. Cek apakah id dari product ada v
        // 2. Cek apakah id dari color ada v
        // 3. Cek apakah relasi masih ada v
        // 4. Hapus color pada relasi colorOnProduct v
        // 5. Buat populasi color v
        // 6. Masukan populasi color pada available color pada product v

        await this.productService.validateData(requestSchema, data)
        const product = await this.productService.fetchDetailById({id: data.productId})
        if(!product) {
            return Promise.reject(
                new ResourceNotFoundError("Product with specified id doesn't exist", true, 
                    AppOperationType.FETCHING, ResourceType.PRODUCT)
            )
        }
        const color = await this.colorService.fetchById({id: data.colorId})
        if(!color) {
            return Promise.reject(
                new ResourceNotFoundError("Color with specified id doesn't exist", true, 
                    AppOperationType.FETCHING, ResourceType.COLOR)
            )
        }
        
        const condition = await this.productService.hasColor({product: product, color: color})
        if(!condition) {
            return Promise.reject(
                new ResourceNotFoundError("Color doesn't available on the current product", true, 
                    AppOperationType.FETCHING, ResourceType.PRODUCT)
            )
        }
        const deletedColorProduct = await this.productService.removeColor({product: product, color: color})
        const creator = deletedColorProduct.getCreator()
        const colors: ColorGeneralResponseDTO[] = []
        for (const currColor of deletedColorProduct.getAvailableColors()!) {
            colors.push({
                id: currColor.getId(),
                creator: currColor.getUserEmail(),
                colorName: currColor.getColorName(),
                hexValue: currColor.getHexValue(),
                description: currColor.getDescription(),
                isActive: currColor.getIsActive(),
                deactivatedAt: currColor.getDeactivatedAt(),
                createdAt: currColor.getCreatedAt(),
                updatedAt: currColor.getUpdatedAt()
            })
        }
        return Promise.resolve({
            id: deletedColorProduct.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
                deletedColorProduct.getUserEmail(),
            productClass: deletedColorProduct.getProductClass(),
            productName: deletedColorProduct.getProductName(),
            productType: deletedColorProduct.getProductType(),
            material: deletedColorProduct.getMaterial(),
            availableColors: colors,
            description: deletedColorProduct.getDescription(),
            isActive: deletedColorProduct.getIsActive(),
            deactivatedAt: deletedColorProduct.getDeactivatedAt(),
            createdAt: deletedColorProduct.getCreatedAt(),
            updatedAt: deletedColorProduct.getUpdatedAt()
        })
    }
}

export default RemoveColorFromProductUseCase