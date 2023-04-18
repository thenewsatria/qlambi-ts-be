import ProductService from "../../../domain/services/ProductService"
import ColorGeneralResponseDTO from "../../../interfaces/dtos/color/ColorGeneralResponseDTO"
import ProductGeneralResponseDTO from "../../../interfaces/dtos/product/ProductGeneralResponse"
import ProductIdDTO from "../../../interfaces/dtos/product/singular/ProductIdDTO"
import AppOperationType from "../../../interfaces/enums/AppOperationType"
import ResourceType from "../../../interfaces/enums/ResourceType"
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError"

class ClearColorFromProductUseCase {
    private readonly productService: ProductService

    constructor(productService: ProductService) {
        this.productService = productService
    }

    async execute(data: ProductIdDTO, requestSchema: any): Promise<ProductGeneralResponseDTO> {
        await this.productService.validateData<ProductIdDTO>(requestSchema, data)
        const product = await this.productService.fetchDetailById(data)
        if(!product) {
            return Promise.reject(
                new ResourceNotFoundError("Product with specified id doesn't exist", true, 
                    AppOperationType.FETCHING, ResourceType.PRODUCT)
            )
        }
        
        const clearedColorProduct = await this.productService.clearColors({product: product})
        const creator = clearedColorProduct.getCreator()
        const colors: ColorGeneralResponseDTO[] = []
        const availableColors = clearedColorProduct.getAvailableColors()
        if(availableColors) {
            for (const currColor of availableColors) {
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
        }
        return Promise.resolve({
            id: clearedColorProduct.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
                clearedColorProduct.getUserEmail(),
            productClass: clearedColorProduct.getProductClass(),
            productName: clearedColorProduct.getProductName(),
            productType: clearedColorProduct.getProductType(),
            material: clearedColorProduct.getMaterial(),
            availableColors: colors,
            description: clearedColorProduct.getDescription(),
            isActive: clearedColorProduct.getIsActive(),
            deactivatedAt: clearedColorProduct.getDeactivatedAt(),
            createdAt: clearedColorProduct.getCreatedAt(),
            updatedAt: clearedColorProduct.getUpdatedAt()
        })
    }
}

export default ClearColorFromProductUseCase