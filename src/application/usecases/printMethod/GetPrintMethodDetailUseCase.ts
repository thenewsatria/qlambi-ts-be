import PrintMethodService from "../../../domain/services/PrintMethodService";
import PrintMethodGeneralResponseDTO from "../../../interfaces/dtos/printMethod/PrintMethodGeneralResponseDTO";
import PrintMethodIdDTO from "../../../interfaces/dtos/printMethod/singular/PrintMethodIdDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class GetPrintMethodDetailUseCase {
    private readonly service: PrintMethodService

    constructor(service: PrintMethodService) {
        this.service = service
    }
    
    async execute(data: PrintMethodIdDTO, requestSchema: any): Promise<PrintMethodGeneralResponseDTO> {
        await this.service.validateData(requestSchema, data)
        const printMDetail = await this.service.fetchDetailById({id: data.id})
        if(!printMDetail) {
            return Promise.reject(
                new ResourceNotFoundError("Print method with specified id doesn't exist", 
                    true, AppOperationType.FETCHING, ResourceType.PRINT_METHOD)
            )
        }

        const printMCreator= printMDetail.getCreator()

        return Promise.resolve({
            id: printMDetail.getId(),
            printMethodName: printMDetail.getPrintMethodName(),
            description: printMDetail.getDescription(),
            creator: printMCreator ? {
                email: printMCreator.getEmail(),
                username: printMCreator.getUsername()
            } 
                : 
            printMDetail.getUserEmail(),
            isActive: printMDetail.getIsActive(),
            deactivatedAt: printMDetail.getDeactivatedAt(),
            createdAt: printMDetail.getCreatedAt(),
            updatedAt: printMDetail.getUpdatedAt()
        })
    }
}

export default GetPrintMethodDetailUseCase