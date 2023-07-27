import ItemCreationRequestDTO from "../../interfaces/dtos/item/ItemCreationRequestDTO";
import ItemDTO from "../../interfaces/dtos/item/singular/ItemDTO";
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

    async fetchById(data: ItemIdDTO): Promise<Item|null> {
        const item = await this.repository.readById(data.id, false)
        return Promise.resolve(item)
    }

    async setActiveStatus(data: ItemDTO): Promise<Item> {
        const updatedItem = await this.repository.updateActiveStatus(data.item)
        return Promise.resolve(updatedItem)
    }

    async removeItem(data: ItemDTO): Promise<Item> {
        const deletedItem = await this.repository.deleteItem(data.item, true)
        return Promise.resolve(deletedItem)
    }
}

export default ItemService