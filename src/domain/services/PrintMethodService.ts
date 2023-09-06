import PrintMethodCreationRequestDTO from "../../interfaces/dtos/printMethod/PrintMethodCreationRequestDTO"
import PrintMethodIdDTO from "../../interfaces/dtos/printMethod/singular/PrintMethodIdDTO"
import PrintMethodRepository from "../../interfaces/repositories/PrintMethodRepository"
import Validator from "../../interfaces/validators/Validator"
import PrintMethod from "../entities/PrintMethod"

class PrintMethodService {
    private readonly repository: PrintMethodRepository
    private readonly validator: Validator

    constructor(repository: PrintMethodRepository, validator: Validator) {
        this.repository = repository
        this.validator = validator
    }

    async validateData<DataT>(schema: any, data: DataT): Promise<DataT> {
        return this.validator.validate<DataT>(schema, data)
    }

    async insertPrintMethod(data: PrintMethodCreationRequestDTO): Promise<PrintMethod> {
        const newPrintMethod = new PrintMethod(data.userEmail, data.printMethodName, data.description)
        const insertedPrintMethod = await this.repository.createPrintMethod(newPrintMethod)
        return Promise.resolve(insertedPrintMethod)
    }

    async fetchDetailById(data: PrintMethodIdDTO): Promise<PrintMethod|null> {
        const printMethod = await this.repository.readById(data.id, true)
        return Promise.resolve(printMethod)
    }
}

export default PrintMethodService