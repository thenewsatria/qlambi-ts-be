import ProductService from "../../../domain/services/ProductService";
import ProductGeneralResponseDTO from "../../../interfaces/dtos/product/ProductGeneralResponse";
import ProductIdDTO from "../../../interfaces/dtos/product/singular/ProductIdDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class RemoveProductUseCase {
    private readonly productService: ProductService

    constructor(productService: ProductService) {
        this.productService = productService
    }
    async execute(data: ProductIdDTO, requestSchema: any): Promise<ProductGeneralResponseDTO> {
        await this.productService.validateData(requestSchema, data)
        const product = await this.productService.fetchById(data)
        if(!product) {
            return Promise.reject(
                new ResourceNotFoundError("Product with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.PRODUCT)
                )
            }
        const deletedProduct = await this.productService.removeById({product: product})
        const creator = deletedProduct.getCreator()
        return Promise.resolve({
            id: deletedProduct.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
                deletedProduct.getUserEmail(),
            productClass: deletedProduct.getProductClass(),
            productName: deletedProduct.getProductName(),
            productType: deletedProduct.getProductType(),
            material: deletedProduct.getMaterial(),
            description: deletedProduct.getDescription(),
            isActive: deletedProduct.getIsActive(),
            deactivatedAt: deletedProduct.getDeactivatedAt(),
            createdAt: deletedProduct.getCreatedAt(),
            updatedAt: deletedProduct.getUpdatedAt()
        })
    }
}

export default RemoveProductUseCase