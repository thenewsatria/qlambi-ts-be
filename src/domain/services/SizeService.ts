import SizeCreationRequestDTO from "../../interfaces/dtos/size/SizeCreationRequestDTO"
import SizeRepository from "../../interfaces/repositories/SizeRepository"
import Validator from "../../interfaces/validators/Validator"
import Size from "../entities/Size"

class SizeService {
    private readonly repository: SizeRepository
    private readonly validator: Validator
    
    constructor(repository: SizeRepository, validator: Validator) {
        this.repository = repository
        this.validator = validator
    }

    async validateData<DataT>(schema: any, data: DataT): Promise<DataT> {
        return this.validator.validate<DataT>(schema, data)
    }

    async insertSize(data: SizeCreationRequestDTO): Promise<Size> {
        const newSize = new Size(data.userEmail, data.productId, data.sizeName, 
            data.sizeCategory, data.length, data.width, data.description)
        const insertedSize = await this.repository.createSize(newSize)
        return Promise.resolve(insertedSize)
    }
}

export default SizeService