import ItemCreationRequestDTO from "../../interfaces/dtos/item/ItemCreationRequestDTO";
import ItemIdDTO from "../../interfaces/dtos/item/singular/ItemIdDTO";
import ItemItemCodeDTO from "../../interfaces/dtos/item/singular/ItemItemCodeDTO";
import ItemRepository from "../../interfaces/repositories/ItemRepository";
import Validator from "../../interfaces/validators/Validator";
import Item from "../entities/Item";

class ItemService {
    private readonly repository: ItemRepository
    private readonly validator: Validator

    constructor(repository: ItemRepository, validator: Validator) {
        this.repository = repository
        this.validator = validator
    }

    async validateData<DataT>(schema: any, data: DataT): Promise<DataT> {
        return this.validator.validate<DataT>(schema, data)
    }

    async insertItem(data: ItemCreationRequestDTO): Promise<Item> {
        const newItem = new Item(data.userEmail, data.productId, data.colorId, data.sizeId, 
            data.itemCode, data.itemName, data.price, data.stock, data.itemImages, data.description)
        const insertedItem = await this.repository.createItem(newItem)
        return Promise.resolve(insertedItem)
    }

    async isItemCodeExist(data: ItemItemCodeDTO): Promise<boolean> {
        const condition = await this.repository.readByItemCode(data.itemCode, false) != null
        return Promise.resolve(condition)
    }
    
    async fetchDetailById(data: ItemIdDTO): Promise<Item|null> {
        const item = await this.repository.readById(data.id, true)
        return Promise.resolve(item)
    }
}

export default ItemService