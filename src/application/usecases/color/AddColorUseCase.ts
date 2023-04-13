import ColorService from "../../../domain/services/ColorService"
import ColorCreationRequestDTO from "../../../interfaces/dtos/color/ColorCreationRequestDTO"
import ColorGeneralResponse from "../../../interfaces/dtos/color/ColorGeneralResponse"

class AddColorUseCase {

    private readonly colorService: ColorService

    constructor(colorService: ColorService) {
        this.colorService = colorService
    }

    async execute(data: ColorCreationRequestDTO, requestSchema: any): Promise<ColorGeneralResponse> {
        await this.colorService.validateData<ColorCreationRequestDTO>(requestSchema, data)
        const color = await this.colorService.insertColor(data)
        const creator = color.getCreator()
        return Promise.resolve({
            id: color.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }   
                :
            color.getUserEmail(),
            colorName: color.getColorName(),
            hexValue: color.getHexValue(),
            description: color.getDescription(),
            isActive: color.getIsActive(),
            deactivatedAt: color.getDeactivatedAt(),
            createdAt: color.getCreatedAt(),
            updatedAt: color.getUpdatedAt()
        })
    }

}

export default AddColorUseCase
