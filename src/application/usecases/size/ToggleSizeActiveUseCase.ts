import SizeService from "../../../domain/services/SizeService";
import SizeIdDTO from "../../../interfaces/dtos/size/singular/SizeIdDTO";
import SizeGeneralResponseDTO from "../../../interfaces/dtos/size/SizeGeneralResponseDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class ToggleSizeActiveUseCase {
    private readonly sizeService: SizeService
    
    constructor(sizeService: SizeService) {
        this.sizeService = sizeService
    }

    async execute(data: SizeIdDTO, requestSchema: any): Promise<SizeGeneralResponseDTO> {
        await this.sizeService.validateData(requestSchema, data)
        const size = await this.sizeService.fetchById(data)
        if(!size) {
            return Promise.reject(
                new ResourceNotFoundError("Size with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.SIZE)
            )
        }
        

        // console.log(size.getIsActive())
        size.setIsActive(!size.getIsActive())
        // console.log(size.getIsActive())
        const updatedSize = await this.sizeService.setActiveStatus({size: size})
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

export default ToggleSizeActiveUseCase