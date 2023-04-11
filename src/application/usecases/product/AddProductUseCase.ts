import ProductService from "../../../domain/services/ProductService";
import ProductCreationRequestDTO from "../../../interfaces/dtos/product/ProductCreationRequestDTO";
import ProductGeneralResponseDTO from "../../../interfaces/dtos/product/ProductGeneralResponse";

class AddProductUseCase {
    private readonly productService: ProductService

    constructor(productService: ProductService) {
        this.productService = productService
    }

    async execute(data: ProductCreationRequestDTO, requestSchema: any): Promise<ProductGeneralResponseDTO> {
        await this.productService.validateData<ProductCreationRequestDTO>(requestSchema, data)
        const product = await this.productService.insertProduct(data)
        const creator = product.getCreator()
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

export default AddProductUseCase