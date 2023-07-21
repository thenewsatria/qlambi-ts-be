import Item from "../../domain/entities/Item";

interface ItemRepository {
    createItem(item: Item): Promise<Item>
}

export default ItemRepository;