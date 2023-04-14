import ColorService from "../../../domain/services/ColorService";
import ColorGeneralResponse from "../../../interfaces/dtos/color/ColorGeneralResponse";
import ColorIdDTO from "../../../interfaces/dtos/color/singular/ColorIdDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class ToggleColorActiveUseCase {
    
    private readonly colorService: ColorService

    constructor(colorService: ColorService) {
        this.colorService = colorService
    }

    async execute(data: ColorIdDTO, requestSchema: any): Promise<ColorGeneralResponse> {
        await this.colorService.validateData<ColorIdDTO>(requestSchema, data)
        const color = await this.colorService.fetchById(data)
        if (!color) {
            return Promise.reject(
                new ResourceNotFoundError("Color with specified id doesn't exist", true, AppOperationType.FETCHING, ResourceType.COLOR)
            )
        }

        color.setIsActive(!color.getIsActive())
        const updatedColor = await this.colorService.setActiveStatus({color: color})
        const creator = updatedColor.getCreator()
        return Promise.resolve({
            id: updatedColor.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
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

export default ToggleColorActiveUseCase