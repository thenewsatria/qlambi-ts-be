import ProductService from "../../../domain/services/ProductService";
import ProductGeneralResponseDTO from "../../../interfaces/dtos/product/ProductGeneralResponse";
import ProductIdDTO from "../../../interfaces/dtos/product/singular/ProductIdDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class GetProductDetailUseCase {
    private readonly productService: ProductService
    
    constructor(productService: ProductService) {
        this.productService = productService
    }
    async execute(data: ProductIdDTO, requestSchema: any): Promise<ProductGeneralResponseDTO> {
        await this.productService.validateData<ProductIdDTO>(requestSchema, data)
        const productDetail = await this.productService.fetchDetailById(data)
        if(!productDetail){
            return Promise.reject(
                new ResourceNotFoundError("Product with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.PRODUCT)
            )
        }
        const creator = productDetail.getCreator()
        return Promise.resolve({
            id: productDetail.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
                productDetail.getUserEmail(),
            productClass: productDetail.getProductClass(),
            productName: productDetail.getProductName(),
            productType: productDetail.getProductType(),
            material: productDetail.getMaterial(),
            description: productDetail.getDescription(),
            isActive: productDetail.getIsActive(),
            deactivatedAt: productDetail.getDeactivatedAt(),
            createdAt: productDetail.getCreatedAt(),
            updatedAt: productDetail.getUpdatedAt()
        })
    }
}
export default GetProductDetailUseCase