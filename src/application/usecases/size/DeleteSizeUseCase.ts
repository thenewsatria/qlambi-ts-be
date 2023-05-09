import SizeService from "../../../domain/services/SizeService"
import SizeDeletionRequestDTO from "../../../interfaces/dtos/size/SizeDeletionRequestDTO"
import SizeGeneralResponseDTO from "../../../interfaces/dtos/size/SizeGeneralResponseDTO"
import AppOperationType from "../../../interfaces/enums/AppOperationType"
import ResourceType from "../../../interfaces/enums/ResourceType"
import ResourceConflictError from "../../errors/app/ResourceConflictError"
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError"

class DeleteSizeUseCase {
    private readonly sizeService: SizeService

    constructor(sizeService: SizeService) {
        this.sizeService = sizeService
    }
    
    async execute(data: SizeDeletionRequestDTO, requestSchema: any): Promise<SizeGeneralResponseDTO> {
        await this.sizeService.validateData(requestSchema, data)
        const currentSize = await this.sizeService.fetchById({id: data.id})
        if(!currentSize) {
            return Promise.reject(
                new ResourceNotFoundError("Size with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.SIZE)
            )
        }
        // delete confirmation and verification like github when delete repo
        if (data.sizeName !== currentSize.getSizeName()) {
            return Promise.reject(
                new ResourceConflictError("Size name is incorrect", true,
                    AppOperationType.FETCHING, ResourceType.PRODUCT, ["sizeName"])
            )
        }

        const deletedSize = await this.sizeService.removeSize({size: currentSize})
        const creator = deletedSize.getCreator()
        const relatedProduct = deletedSize.getProduct()
        return Promise.resolve({
            id: deletedSize.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
                deletedSize.getUserEmail(),
            sizeName: deletedSize.getSizeName(),
            sizeCategory: deletedSize.getSizeCategory(),
            length: deletedSize.getLength(),
            width: deletedSize.getWidth(),
            description: deletedSize.getDescription(),
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
            deletedSize.getProductId(),
            isActive: deletedSize.getIsActive(),
            deactivatedAt: deletedSize.getDeactivatedAt(),
            createdAt: deletedSize.getCreatedAt(),
            updatedAt: deletedSize.getUpdatedAt(),
        })
    }
}

export default DeleteSizeUseCase