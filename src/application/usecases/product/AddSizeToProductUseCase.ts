import Size from "../../../domain/entities/Size";
import ProductService from "../../../domain/services/ProductService";
import SizeService from "../../../domain/services/SizeService";
import ColorGeneralResponseDTO from "../../../interfaces/dtos/color/ColorGeneralResponseDTO";
import ProductGeneralResponseDTO from "../../../interfaces/dtos/product/ProductGeneralResponse";
import SizeCreationRequestDTO from "../../../interfaces/dtos/size/SizeCreationRequestDTO";
import SizeGeneralResponseDTO from "../../../interfaces/dtos/size/SizeGeneralResponseDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class AddSizeToProductUseCase {
    private readonly productService: ProductService
    
    constructor(productService: ProductService) {
        this.productService = productService
    }

    async execute(data: SizeCreationRequestDTO, requestSchema: any): Promise<ProductGeneralResponseDTO> {

        await this.productService.validateData(requestSchema, data)
        const product = await this.productService.fetchDetailById({id: data.productId})
        if(!product) {
            return Promise.reject(
                new ResourceNotFoundError("Product with specified id doesn't exist", true, 
                    AppOperationType.FETCHING, ResourceType.PRODUCT)
            )
        }
        const newSize = new Size(data.userEmail, data.productId, data.sizeName, data.sizeCategory, data.length, data.width, data.description)
        const addedProduct = await this.productService.addSize({product: product, size: newSize})
        const creator = addedProduct.getCreator()
        const colors: ColorGeneralResponseDTO[] = []
        const sizes: SizeGeneralResponseDTO[] = []
        const availableColor = addedProduct.getAvailableColors()
        const availableSizes = addedProduct.getAvailableSizes()

        if(availableColor){
            for(const currColor of availableColor) {
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
            id: addedProduct.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
                addedProduct.getUserEmail(),
            productClass: addedProduct.getProductClass(),
            productName: addedProduct.getProductName(),
            productType: addedProduct.getProductType(),
            material: addedProduct.getMaterial(),
            availableColors: colors,
            availableSizes: sizes,
            description: addedProduct.getDescription(),
            isActive: addedProduct.getIsActive(),
            deactivatedAt: addedProduct.getDeactivatedAt(),
            createdAt: addedProduct.getCreatedAt(),
            updatedAt: addedProduct.getUpdatedAt()
        })
    }
}

export default AddSizeToProductUseCase