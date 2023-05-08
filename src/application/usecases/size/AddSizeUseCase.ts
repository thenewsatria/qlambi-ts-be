import ProductService from "../../../domain/services/ProductService"
import SizeService from "../../../domain/services/SizeService"
import SizeCreationRequestDTO from "../../../interfaces/dtos/size/SizeCreationRequestDTO"
import SizeGeneralResponseDTO from "../../../interfaces/dtos/size/SizeGeneralResponseDTO"
import AppOperationType from "../../../interfaces/enums/AppOperationType"
import ResourceType from "../../../interfaces/enums/ResourceType"
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError"

class AddSizeUseCase {
    private readonly sizeService: SizeService
    private readonly productService: ProductService

    constructor(sizeService: SizeService, productService: ProductService) {
        this.sizeService = sizeService
        this.productService = productService
    }

    async execute(data: SizeCreationRequestDTO, requestSchema: any): Promise<SizeGeneralResponseDTO> {
        await this.sizeService.validateData<SizeCreationRequestDTO>(requestSchema, data)
        const currProduct = await this.productService.fetchById({id: data.productId})
        if(!currProduct) {
            return Promise.reject(
                new ResourceNotFoundError("Product with specified id doesn't exist", true, 
                    AppOperationType.FETCHING, ResourceType.PRODUCT)
            )
        }
        const size = await this.sizeService.insertSize(data)
        const creator = size.getCreator()
        return Promise.resolve({
            id: size.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
            size.getUserEmail(),
            sizeName: size.getSizeName(),
            sizeCategory: size.getSizeCategory(),
            length: size.getLength(),
            width: size.getWidth(),
            description: size.getDescription(),
            product: currProduct ? {
                id: currProduct.getId(),
                creator: currProduct.getUserEmail(),
                productName: currProduct.getProductName(),
                productClass: currProduct.getProductClass(),
                productType: currProduct.getProductType(),
                material: currProduct.getMaterial(),
                description: currProduct.getDescription(),
                isActive: currProduct.getIsActive(),
                deactivatedAt: currProduct.getDeactivatedAt(),
                createdAt: currProduct.getCreatedAt(),
                updatedAt: currProduct.getUpdatedAt(),
            }
            :
            size.getProductId(),
            isActive: size.getIsActive(),
            deactivatedAt: size.getDeactivatedAt(),
            createdAt: size.getCreatedAt(),
            updatedAt: size.getUpdatedAt(),
        })
    }
}

export default AddSizeUseCase