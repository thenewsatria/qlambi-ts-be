import ColorService from "../../../domain/services/ColorService"
import ColorGeneralResponseDTO from "../../../interfaces/dtos/color/ColorGeneralResponseDTO"
import ColorIdDTO from "../../../interfaces/dtos/color/singular/ColorIdDTO"
import AppOperationType from "../../../interfaces/enums/AppOperationType"
import ResourceType from "../../../interfaces/enums/ResourceType"
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError"

class GetColorDetailUseCase {
    private readonly colorService: ColorService

    constructor(colorService: ColorService) {
        this.colorService = colorService
    }
    
    async execute(data: ColorIdDTO, requestSchema: any): Promise<ColorGeneralResponseDTO> {
        await this.colorService.validateData<ColorIdDTO>(requestSchema, data)
        const colorDetail = await this.colorService.fetchDetailById(data)
        if(!colorDetail){
            return Promise.reject(
                new ResourceNotFoundError("Product with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.COLOR)
            )
        }
        const creator = colorDetail.getCreator()
        return Promise.resolve({
            id: colorDetail.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
                colorDetail.getUserEmail(),
            colorName: colorDetail.getColorName(),
            hexValue: colorDetail.getHexValue(),
            description: colorDetail.getDescription(),
            isActive: colorDetail.getIsActive(),
            deactivatedAt: colorDetail.getDeactivatedAt(),
            createdAt: colorDetail.getCreatedAt(),
            updatedAt: colorDetail.getUpdatedAt()
        })
    }
}

export default GetColorDetailUseCase