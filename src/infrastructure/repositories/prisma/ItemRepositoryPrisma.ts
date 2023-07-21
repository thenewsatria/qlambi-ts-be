import { never } from "zod";
import Item from "../../../domain/entities/Item";
import ItemRepository from "../../../interfaces/repositories/ItemRepository";
import prismaClient from "../../databases/prisma/client";

class ItemRepositoryPrisma implements ItemRepository {

    private readonly _client = prismaClient
    private static instance: ItemRepositoryPrisma
    
    public static getInstance() {
        if(!ItemRepositoryPrisma.instance) {
            ItemRepositoryPrisma.instance = new ItemRepositoryPrisma()
        }
        
        return ItemRepositoryPrisma.instance
    }

    async createItem(item: Item): Promise<Item> {
        const newItem = await this._client.item.create({
            data: {
                itemCode: item.getItemCode(),
                itemName: item.getItemName(),
                productId: +item.getProductId(),
                colorId: +item.getColorId(),
                sizeId: +item.getSizeId(),
                price: item.getPrice(),
                stock: item.getStock(),
                itemImage: item.getItemImage() ? item.getItemImage() : "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png", //insert default static image here later
                description: item.getDescription(),
                userEmail: item.getUserEmail(),
            },
        })
        item.setId(newItem.id+"")
        item.setCreatedAt(newItem.createdAt)
        item.setUpdatedAt(newItem.updatedAt)
        return Promise.resolve(item)
    }
}

export default ItemRepositoryPrisma