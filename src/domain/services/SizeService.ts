import SizeDTO from "../../interfaces/dtos/size/singular/SizeDTO"
import SizeIdDTO from "../../interfaces/dtos/size/singular/SizeIdDTO"
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

    async updateSize(data: SizeDTO): Promise<Size> {
        const updatedSize = await this.repository.updateSize(data.size)
        return Promise.resolve(updatedSize)
    }

    async setActiveStatus(data: SizeDTO): Promise<Size> {
        const updatedSize = await this.repository.updateActiveStatus(data.size)
        return Promise.resolve(updatedSize)
    }

    async fetchById(data: SizeIdDTO): Promise<Size|null> {
        const size = await  this.repository.readById(data.id, false)
        return Promise.resolve(size)
    }
}

export default SizeService