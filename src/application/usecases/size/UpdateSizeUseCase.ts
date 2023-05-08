import SizeService from "../../../domain/services/SizeService"
import SizeGeneralResponseDTO from "../../../interfaces/dtos/size/SizeGeneralResponseDTO"
import SizeUpdateRequestDTO from "../../../interfaces/dtos/size/SizeUpdateRequestDTO"
import AppOperationType from "../../../interfaces/enums/AppOperationType"
import ResourceType from "../../../interfaces/enums/ResourceType"
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError"

class UpdateSizeUseCase {
    private readonly sizeService: SizeService

    constructor(sizeService: SizeService) {
        this.sizeService = sizeService
    }
    
    async execute(data: SizeUpdateRequestDTO, requestSchema: any): Promise<SizeGeneralResponseDTO> {
        await this.sizeService.validateData<SizeUpdateRequestDTO>(requestSchema, data)
        const currentSize = await this.sizeService.fetchById({id: data.id})
        if(!currentSize) {
            return Promise.reject(
                new ResourceNotFoundError("Size with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.SIZE)
            )
        }

        currentSize.setSizeName(data.sizeName)
        currentSize.setSizeCategory(data.sizeCategory)
        currentSize.setLength(data.length)
        currentSize.setWidth(data.width)
        currentSize.setDescription(data.description)
        
        const updatedSize = await this.sizeService.updateSize({size: currentSize})
        const creator = updatedSize.getCreator()
        const relatedProduct = updatedSize.getProduct()

        return Promise.resolve({
            id: updatedSize.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
                updatedSize.getUserEmail(),
            sizeName: updatedSize.getSizeName(),
            sizeCategory: updatedSize.getSizeCategory(),
            length: updatedSize.getLength(),
            width: updatedSize.getWidth(),
            description: updatedSize.getDescription(),
            product: relatedProduct ? {
                id: relatedProduct.getId(),
                creator: relatedProduct.getUserEmail(),
                productName: relatedProduct.getProductName(),
                productClass: relatedProduct.getProductClass(),
                productType: relatedProduct.getProductType(),
                material: relatedProduct.getMaterial(),
                description: relatedProduct.getDescription(),
                isActive: relatedProduct.getIsActive(),
                deactivatedAt: relatedProduct.getDeactivatedAt(),
                createdAt: relatedProduct.getCreatedAt(),
                updatedAt: relatedProduct.getUpdatedAt(),
            }
            :
            updatedSize.getProductId(),
            isActive: updatedSize.getIsActive(),
            deactivatedAt: updatedSize.getDeactivatedAt(),
            createdAt: updatedSize.getCreatedAt(),
            updatedAt: updatedSize.getUpdatedAt(),
        })


    }
}

export default UpdateSizeUseCase