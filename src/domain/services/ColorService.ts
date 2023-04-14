import ColorCreationRequestDTO from "../../interfaces/dtos/color/ColorCreationRequestDTO"
import ColorDTO from "../../interfaces/dtos/color/singular/ColorDTO"
import ColorIdDTO from "../../interfaces/dtos/color/singular/ColorIdDTO"
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
    
    async fetchById(data: ColorIdDTO): Promise<Color|null> {
        const color = this.repository.readById(data.id, false)
        return Promise.resolve(color)
    }

    async updateColor(data: ColorDTO): Promise<Color> {
        const updatedColor = await this.repository.updateColor(data.color)
        return Promise.resolve(updatedColor)
    }

    async setActiveStatus(data: ColorDTO): Promise<Color> {
        const updatedColor = await this.repository.updateActiveStatus(data.color)
        return Promise.resolve(updatedColor)
    }
    
    async removeColor(data: ColorDTO): Promise<Color> {
        const deletedProduct = await this.repository.deleteColor(data.color, true)
        return Promise.resolve(deletedProduct)
    }
}

export default ColorService