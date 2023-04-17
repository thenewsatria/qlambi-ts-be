import ColorService from "../../../domain/services/ColorService"
import ColorDeletionRequestDTO from "../../../interfaces/dtos/color/ColorDeletionRequestDTO"
import ColorGeneralResponse from "../../../interfaces/dtos/color/ColorGeneralResponseDTO"
import AppOperationType from "../../../interfaces/enums/AppOperationType"
import ResourceType from "../../../interfaces/enums/ResourceType"
import ResourceConflictError from "../../errors/app/ResourceConflictError"
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError"

class RemoveColorUseCase {
    
    private readonly colorService: ColorService

    constructor(colorService: ColorService) {
        this.colorService = colorService
    }

    async execute(data: ColorDeletionRequestDTO, requestSchema: any): Promise<ColorGeneralResponse> {
        await this.colorService.validateData(requestSchema, data)
        const color = await this.colorService.fetchById({id: data.id})
        if(!color) {
            return Promise.reject(
                new ResourceNotFoundError("Color with specified id doesn't exist", true, 
                    AppOperationType.FETCHING, ResourceType.COLOR)
                )
            }
        // delete confirmation and verification like github when delete repo
        if (data.colorName !== color.getColorName()) {
            return Promise.reject(
                new ResourceConflictError("Color name is incorrect", true,
                    AppOperationType.FETCHING, ResourceType.COLOR, ["colorName"])
            )
        }
        const deletedColor = await this.colorService.removeColor({color: color})
        const creator = deletedColor.getCreator()
        return Promise.resolve({
            id: deletedColor.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
                deletedColor.getUserEmail(),
            colorName: deletedColor.getColorName(),
            hexValue: deletedColor.getHexValue(),
            description: deletedColor.getDescription(),
            isActive: deletedColor.getIsActive(),
            deactivatedAt: deletedColor.getDeactivatedAt(),
            createdAt: deletedColor.getCreatedAt(),
            updatedAt: deletedColor.getUpdatedAt()
        })
    }
}

export default RemoveColorUseCase