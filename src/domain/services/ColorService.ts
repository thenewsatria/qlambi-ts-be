import ColorCreationRequestDTO from "../../interfaces/dtos/color/ColorCreationRequestDTO"
import ColorRepository from "../../interfaces/repositories/ColorRepository"
import Validator from "../../interfaces/validators/Validator"
import Color from "../entities/Color"

class ColorService {
    private readonly repository: ColorRepository

    private readonly validator: Validator
    
    constructor(repository: ColorRepository, validator: Validator) {
        this.repository = repository
        this.validator = validator
    }

    async validateData<DataT>(schema: any, data: DataT): Promise<DataT> {
        return this.validator.validate<DataT>(schema, data)
    }

    async insertColor(data: ColorCreationRequestDTO): Promise<Color> {
        const newProduct = new Color(data.userEmail, data.colorName, data.hexValue, data.description)
        const insertedProduct = await this.repository.createColor(newProduct)
        return Promise.resolve(insertedProduct)
    }
}

export default ColorService