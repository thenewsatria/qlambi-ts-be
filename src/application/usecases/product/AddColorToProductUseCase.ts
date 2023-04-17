import ColorService from "../../../domain/services/ColorService"
import ProductService from "../../../domain/services/ProductService"
import ColorGeneralResponseDTO from "../../../interfaces/dtos/color/ColorGeneralResponseDTO"
import ProductAddColorRequestDTO from "../../../interfaces/dtos/product/ProductAddColorRequestDTO"
import ProductGeneralResponseDTO from "../../../interfaces/dtos/product/ProductGeneralResponse"
import AppOperationType from "../../../interfaces/enums/AppOperationType"
import ResourceType from "../../../interfaces/enums/ResourceType"
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError"

class AddColorToProductUseCase {
    private readonly productService: ProductService
    private readonly colorService: ColorService

    constructor(productService: ProductService, colorService: ColorService) {
        this.productService = productService
        this.colorService = colorService
    }

    async execute(data: ProductAddColorRequestDTO, requestSchema: any): Promise<ProductGeneralResponseDTO> {
        // Step:
        // 1. Cek apakah id dari product ada v
        // 2. Cek apakah id dari color ada v
        // 3. Cek apakah relasi sudah ada v
        // 4. Tambahkan color pada relasi colorOnProduct v
        // 5. Buat populasi color v
        // 6. Masukan populasi color pada available color pada product v

        await this.productService.validateData(requestSchema, data)
        const product = await this.productService.fetchById({id: data.productId})
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
        if(condition) {
            return Promise.reject(
                new ResourceNotFoundError("Product already have the the same color", true, 
                    AppOperationType.FETCHING, ResourceType.PRODUCT)
            )
        }
        const addedColorProduct = await this.productService.addColor({product: product, color: color, asssigner: data.userEmail})
        const creator = addedColorProduct.getCreator()
        const colors: ColorGeneralResponseDTO[] = []
        for (const currColor of addedColorProduct.getAvailableColors()!) {
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
            id: addedColorProduct.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
                addedColorProduct.getUserEmail(),
            productClass: addedColorProduct.getProductClass(),
            productName: addedColorProduct.getProductName(),
            productType: addedColorProduct.getProductType(),
            material: addedColorProduct.getMaterial(),
            availableColors: colors,
            description: addedColorProduct.getDescription(),
            isActive: addedColorProduct.getIsActive(),
            deactivatedAt: addedColorProduct.getDeactivatedAt(),
            createdAt: addedColorProduct.getCreatedAt(),
            updatedAt: addedColorProduct.getUpdatedAt()
        })
    }
}

export default AddColorToProductUseCase