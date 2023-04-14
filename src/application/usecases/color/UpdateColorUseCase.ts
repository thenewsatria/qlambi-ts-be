import ColorService from "../../../domain/services/ColorService";
import ColorGeneralResponse from "../../../interfaces/dtos/color/ColorGeneralResponse";
import ColorUpdateRequestDTO from "../../../interfaces/dtos/color/ColorUpdateRequestDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class UpdateColorUseCase {

    private readonly colorService: ColorService

    constructor(colorService: ColorService) {
        this.colorService = colorService
    }
    
    async execute(data: ColorUpdateRequestDTO, requestSchema: any): Promise<ColorGeneralResponse> {
        await this.colorService.validateData<ColorUpdateRequestDTO>(requestSchema, data)
        const color = await this.colorService.fetchById({id: data.id})
        if (!color) {
            return Promise.reject(
                new ResourceNotFoundError("Color with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.COLOR)
            )
        }

        color.setColorName(data.colorName)
        color.setHexValue(data.hexValue)
        color.setDescription(data.description)
        
        const updatedColor = await this.colorService.updateColor({color: color})
        const colorCreator = updatedColor.getCreator()
        return Promise.resolve({
            id: updatedColor.getId(),
            creator: colorCreator ? {
                email: colorCreator.getEmail(),
                username: colorCreator.getUsername(),
            }   
                :
                updatedColor.getUserEmail(),
            colorName: updatedColor.getColorName(),
            hexValue: updatedColor.getHexValue(),
            description: updatedColor.getDescription(),
            isActive: updatedColor.getIsActive(),
            deactivatedAt: updatedColor.getDeactivatedAt(),
            createdAt: updatedColor.getCreatedAt(),
            updatedAt: updatedColor.getUpdatedAt()
        })
    }
}

export default UpdateColorUseCase