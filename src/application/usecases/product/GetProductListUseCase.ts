import ProductService from "../../../domain/services/ProductService"
import ProductGeneralListReponseDTO from "../../../interfaces/dtos/product/ProductGeneralListRespnoseDTO"
import ProductGeneralResponseDTO from "../../../interfaces/dtos/product/ProductGeneralResponse"

class GetProductListUseCase {
    private readonly productService: ProductService

    constructor(productService: ProductService) {
        this.productService = productService
    }
    
    async execute(): Promise<ProductGeneralListReponseDTO> {
        const productDetails: ProductGeneralResponseDTO[] = []
        const products = await this.productService.fetchAll()
        
        for (const product of products) {
            const creator = product.getCreator()
            
            productDetails.push({
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
        return Promise.resolve({
            count: products.length,
            products: productDetails
        })
    }
}

export default GetProductListUseCase