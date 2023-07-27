import Item from "../../domain/entities/Item";

interface ItemRepository {
    createItem(item: Item): Promise<Item>
    readByItemCode(itemCode: string, detailed: boolean): Promise<Item|null>
    readById(id: string, detailed: boolean): Promise<Item|null>
    updateActiveStatus(item: Item): Promise<Item>
}

export default ItemRepository;