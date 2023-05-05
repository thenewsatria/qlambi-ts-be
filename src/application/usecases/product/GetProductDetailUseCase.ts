import ProductService from "../../../domain/services/ProductService";
import ColorGeneralResponseDTO from "../../../interfaces/dtos/color/ColorGeneralResponseDTO";
import ProductGeneralResponseDTO from "../../../interfaces/dtos/product/ProductGeneralResponse";
import ProductIdDTO from "../../../interfaces/dtos/product/singular/ProductIdDTO";
import SizeGeneralResponseDTO from "../../../interfaces/dtos/size/SizeGeneralResponseDTO";
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
        const colors: ColorGeneralResponseDTO[] = []
        const sizes: SizeGeneralResponseDTO[] = []
        const availableColors = productDetail.getAvailableColors()
        const availableSizes = productDetail.getAvailableSizes()

        if(availableColors){
            for (const currColor of availableColors) {
                colors.push({
                    id: currColor.getId(),
                    creator: currColor.getUserEmail(),
                    colorName: currColor.getColorName(),
                    hexValue: currColor.getHexValue(),
                    description: currColor.getDescription(),
                    isActive: currColor.getIsActive(),
                    deactivatedAt: currColor.getDeactivatedAt(),
                    createdAt: currColor.getCreatedAt(),
                    updatedAt: currColor.getUpdatedAt()
                })
            }
        }
        if(availableSizes){
            for (const currSize of availableSizes) {
                sizes.push({
                    id: currSize.getId(),
                    creator: currSize.getUserEmail(),
                    sizeName: currSize.getSizeName(),
                    sizeCategory: currSize.getSizeCategory(),
                    length: currSize.getLength(),
                    width: currSize.getWidth(),
                    description: currSize.getDescription(),
                    isActive: currSize.getIsActive(),
                    deactivatedAt: currSize.getDeactivatedAt(),
                    createdAt: currSize.getCreatedAt(),
                    updatedAt: currSize.getUpdatedAt()
                })
            }
        }
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
            availableColors: colors,
            availableSizes: sizes,
            isActive: productDetail.getIsActive(),
            deactivatedAt: productDetail.getDeactivatedAt(),
            createdAt: productDetail.getCreatedAt(),
            updatedAt: productDetail.getUpdatedAt()
        })
    }
}
export default GetProductDetailUseCase