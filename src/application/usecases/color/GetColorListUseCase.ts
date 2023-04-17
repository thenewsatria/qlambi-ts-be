import ColorService from "../../../domain/services/ColorService";
import ColorRepositoryPrisma from "../../../infrastructure/repositories/prisma/ColorRepositoryPrisma";
import ColorGeneralListRequestDTO from "../../../interfaces/dtos/color/ColorGeneralListRequestDTO";
import ColorGeneralListResponseDTO from "../../../interfaces/dtos/color/ColorGeneralListResponseDTO";
import ColorGeneralResponseDTO from "../../../interfaces/dtos/color/ColorGeneralResponseDTO";

class GetColorListUseCase {
    private readonly colorService: ColorService

    constructor(colorService: ColorService) {
        this.colorService = colorService
    }

    async execute(query: ColorGeneralListRequestDTO): Promise<ColorGeneralListResponseDTO> {
        const colorDetails: ColorGeneralResponseDTO[] = []
        const colors = await this.colorService.fetchAll(query)
        
        for (const color of colors) {
            const creator = color.getCreator()

            colorDetails.push({
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
        return Promise.resolve({
            count: colors.length,
            colors: colorDetails
        })
    }
}

export default GetColorListUseCase