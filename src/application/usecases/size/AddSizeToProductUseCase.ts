import Product from "../../../domain/entities/Product"
import ProductService from "../../../domain/services/ProductService"
import SizeService from "../../../domain/services/SizeService"
import SizeCreationRequestDTO from "../../../interfaces/dtos/size/SizeCreationRequestDTO"
import SizeGeneralResponseDTO from "../../../interfaces/dtos/size/SizeGeneralResponseDTO"
import AppOperationType from "../../../interfaces/enums/AppOperationType"
import ResourceType from "../../../interfaces/enums/ResourceType"
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError"

class AddSizeToProductUseCase {
    private readonly sizeService: SizeService
    private readonly productService: ProductService

    constructor(sizeService: SizeService, productService: ProductService) {
        this.sizeService = sizeService
        this.productService = productService
    }

    async execute(data: SizeCreationRequestDTO, requestSchema: any): Promise<SizeGeneralResponseDTO> {
        await this.sizeService.validateData<SizeCreationRequestDTO>(requestSchema, data)
        const product = await this.productService.fetchById({id: data.productId})
        if(!product) {
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
            product: product ? {
                id: product.getId(),
                creator: product.getUserEmail(),
                productName: product.getProductName(),
                productClass: product.getProductClass(),
                productType: product.getProductType(),
                material: product.getMaterial(),
                description: product.getDescription(),
                isActive: product.getIsActive(),
                deactivatedAt: product.getDeactivatedAt(),
                createdAt: product.getCreatedAt(),
                updatedAt: product.getUpdatedAt(),
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

export default AddSizeToProductUseCase