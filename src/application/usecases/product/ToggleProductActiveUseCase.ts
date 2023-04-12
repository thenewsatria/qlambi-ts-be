import ProductService from "../../../domain/services/ProductService";
import ProductGeneralResponseDTO from "../../../interfaces/dtos/product/ProductGeneralResponse";
import ProductIdDTO from "../../../interfaces/dtos/product/singular/ProductIdDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class ToggleProductActiveUseCase {
    private readonly productService: ProductService

    constructor(productService: ProductService) {
        this.productService = productService
    }
    async execute(data: ProductIdDTO, requestSchema: any): Promise<ProductGeneralResponseDTO> {
        await this.productService.validateData(requestSchema, data)
        const product = await this.productService.fetchById(data)
        if (!product) {
            return Promise.reject(
                new ResourceNotFoundError("Product with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.PRODUCT)
            )
        }
        product.setIsActive(!product.getIsActive())
        const updatedProduct = await this.productService.setActiveStatus({product: product})
        const creator = updatedProduct.getCreator()
        return Promise.resolve({
            id: product.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
            product.getUserEmail(),
            productClass: product.getProductClass(),
            productName: product.getProductName(),
            productType: product.getProductType(),
            material: product.getMaterial(),
            description: product.getDescription(),
            isActive: product.getIsActive(),
            deactivatedAt: product.getDeactivatedAt(),
            createdAt: product.getCreatedAt(),
            updatedAt: product.getUpdatedAt()
        })
    }
}

export default ToggleProductActiveUseCase