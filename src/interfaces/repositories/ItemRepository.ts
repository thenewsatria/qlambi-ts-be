import Item from "../../domain/entities/Item";

interface ItemRepository {
    createItem(item: Item): Promise<Item>
    readByItemCode(itemCode: string, detailed: boolean): Promise<Item|null>
}

export default ItemRepository;