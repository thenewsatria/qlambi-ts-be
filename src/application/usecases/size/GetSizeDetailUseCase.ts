import SizeService from "../../../domain/services/SizeService";
import SizeIdDTO from "../../../interfaces/dtos/size/singular/SizeIdDTO";
import SizeGeneralResponseDTO from "../../../interfaces/dtos/size/SizeGeneralResponseDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class GetSizeDetailUseCase {
    private readonly sizeService: SizeService

    constructor(sizeService: SizeService) {
        this.sizeService = sizeService
    }

    async execute(data: SizeIdDTO, requestSchema: any): Promise<SizeGeneralResponseDTO> {
        await this.sizeService.validateData(requestSchema, data)
        const sizeDetail = await this.sizeService.fetchDetailById(data)
        if(!sizeDetail) {
            return Promise.reject(
                new ResourceNotFoundError("Size with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.SIZE)
            )
        }

        const creator = sizeDetail.getCreator()
        const relatedProduct = sizeDetail.getProduct()
        return Promise.resolve({
            id: sizeDetail.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
                sizeDetail.getUserEmail(),
            sizeName: sizeDetail.getSizeName(),
            sizeCategory: sizeDetail.getSizeCategory(),
            length: sizeDetail.getLength(),
            width: sizeDetail.getWidth(),
            description: sizeDetail.getDescription(),
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
            sizeDetail.getProductId(),
            isActive: sizeDetail.getIsActive(),
            deactivatedAt: sizeDetail.getDeactivatedAt(),
            createdAt: sizeDetail.getCreatedAt(),
            updatedAt: sizeDetail.getUpdatedAt(),
        })
    }
}

export default GetSizeDetailUseCase