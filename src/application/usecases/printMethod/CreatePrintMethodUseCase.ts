import PrintMethodService from "../../../domain/services/PrintMethodService";
import PrintMethodCreationRequestDTO from "../../../interfaces/dtos/printMethod/PrintMethodCreationRequestDTO";
import PrintMethodGeneralResponseDTO from "../../../interfaces/dtos/printMethod/PrintMethodGeneralResponseDTO";

class CreatePrintMethodUseCase {
    private readonly service: PrintMethodService

    constructor(service: PrintMethodService) {
        this.service = service
    }

    async execute(data: PrintMethodCreationRequestDTO, requestSchema: any): Promise<PrintMethodGeneralResponseDTO> {
        await this.service.validateData<PrintMethodCreationRequestDTO>(requestSchema, data)
        const printMethod = await this.service.insertPrintMethod(data)
        const creator = printMethod.getCreator()
        return Promise.resolve({
            id: printMethod.getId(),
            creator: creator ? {
                email: creator.getEmail(),
                username: creator.getUsername(),
            }
                : 
            printMethod.getUserEmail(),
            printMethodName: printMethod.getPrintMethodName(),
            description: printMethod.getDescription(),
            isActive: printMethod.getIsActive(),
            deactivatedAt: printMethod.getDeactivatedAt(),
            createdAt: printMethod.getCreatedAt(),
            updatedAt: printMethod.getUpdatedAt()
        })
    }
}

export default CreatePrintMethodUseCase