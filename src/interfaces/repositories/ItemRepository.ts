import Item from "../../domain/entities/Item";

interface ItemRepository {
    createItem(item: Item): Promise<Item>
    readByItemCode(itemCode: string, detailed: boolean): Promise<Item|null>
    readAllwSearch(query: any, detailed: boolean): Promise<Item[]>
    readById(id: string, detailed: boolean): Promise<Item|null>
    updateItem(item: Item): Promise<Item>
    updateActiveStatus(item: Item): Promise<Item>
    deleteItem(item: Item, detailed: boolean): Promise<Item>
}

export default ItemRepository;