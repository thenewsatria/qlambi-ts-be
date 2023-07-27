import Color from "../../../domain/entities/Color";
import Item from "../../../domain/entities/Item";
import Product from "../../../domain/entities/Product";
import Size from "../../../domain/entities/Size";
import User from "../../../domain/entities/User";
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
                itemImages: item.getItemImages(),
                description: item.getDescription(),
                userEmail: item.getUserEmail(),
            },
        })
        item.setId(newItem.id+"")
        item.setCreatedAt(newItem.createdAt)
        item.setUpdatedAt(newItem.updatedAt)
        return Promise.resolve(item)
    }

    async readByItemCode(itemCode: string, detailed: boolean): Promise<Item | null> {
        let item: Item | null = null
        const itemResult = await this._client.item.findFirst({
            where: {
                itemCode: itemCode
            },
            include: {
                creator: detailed,
                color: detailed,
                product: detailed,
                size: detailed
            }
        })
        if(itemResult){
            item = new Item(itemResult.userEmail || "deleted_user", itemResult.productId+"" || "deleted_product",
                    itemResult.colorId+"" || "deteled_color", itemResult.sizeId+"" || "deleted_size",
                    itemResult.itemCode, itemResult.itemName, itemResult.price, itemResult.stock,
                    itemResult.itemImages as string[], itemResult.description)
            item.setId(itemResult.id+"")
            item.setIsActive(itemResult.isActive)
            itemResult.deactivatedAt ? item.setDeactivatedAt(itemResult.deactivatedAt) : null
            itemResult.creator ? 
                item.setCreator(new User(itemResult.creator.email, itemResult.creator.username, ""))
                : null
            itemResult.product ?
                item.setProduct(new Product(itemResult.product.userEmail || "deleted_user", 
                    itemResult.product.productName, itemResult.product.productClass, itemResult.product.productType,
                    itemResult.product.material, itemResult.product.description))
                : null
            itemResult.color ?
                item.setColor(new Color(itemResult.color.userEmail || "deleted_user", itemResult.color.colorName, 
                    itemResult.color.hexValue, itemResult.color.description))
                : null
            itemResult.size ?
                item.setSize(new Size(itemResult.size.userEmail || "deleted_user", itemResult.size.productId+"", itemResult.size.sizeName,
                    itemResult.size.sizeCategory, itemResult.size.length, itemResult.size.width, itemResult.size.description))
                : null
            item.setCreatedAt(itemResult.createdAt)
            item.setUpdatedAt(itemResult.updatedAt)
        }
        return Promise.resolve(item)
    }

    async readById(id: string, detailed: boolean): Promise<Item | null> {
        let item: Item | null = null
        const itemResult = await this._client.item.findFirst({
            where: {
                id: +id
            },
            include: {
                creator: detailed,
                color: detailed,
                product: detailed,
                size: detailed
            }
        })
        if(itemResult){
            item = new Item(itemResult.userEmail || "deleted_user", itemResult.productId+"" || "deleted_product",
                    itemResult.colorId+"" || "deteled_color", itemResult.sizeId+"" || "deleted_size",
                    itemResult.itemCode, itemResult.itemName, itemResult.price, itemResult.stock,
                    itemResult.itemImages as string[], itemResult.description)
            item.setId(itemResult.id+"")
            item.setIsActive(itemResult.isActive)
            itemResult.deactivatedAt ? item.setDeactivatedAt(itemResult.deactivatedAt) : null
            itemResult.creator ? 
                item.setCreator(new User(itemResult.creator.email, itemResult.creator.username, ""))
                : null
            itemResult.product ?
                item.setProduct(new Product(itemResult.product.userEmail || "deleted_user", 
                    itemResult.product.productName, itemResult.product.productClass, itemResult.product.productType,
                    itemResult.product.material, itemResult.product.description))
                : null
            itemResult.color ?
                item.setColor(new Color(itemResult.color.userEmail || "deleted_user", itemResult.color.colorName, 
                    itemResult.color.hexValue, itemResult.color.description))
                : null
            itemResult.size ?
                item.setSize(new Size(itemResult.size.userEmail || "deleted_user", itemResult.size.productId+"", itemResult.size.sizeName,
                    itemResult.size.sizeCategory, itemResult.size.length, itemResult.size.width, itemResult.size.description))
                : null
            item.setCreatedAt(itemResult.createdAt)
            item.setUpdatedAt(itemResult.updatedAt)
        }
        return Promise.resolve(item)
    }

    async updateActiveStatus(item: Item): Promise<Item> {
        const now = new Date();
        const updatedItem = await this._client.item.update({
            where: {
                id: +item.getId()!
            },
            data: {
                isActive: item.getIsActive(),
                
                // update only when deactivated and not reactivated
                deactivatedAt: !item.getIsActive() ? now : item.getDeactivatedAt()
            }
        })
        item.setDeactivatedAt(updatedItem.deactivatedAt!)
        item.setUpdatedAt(updatedItem.updatedAt)
        return Promise.resolve(item)
    }

    async deleteItem(item: Item, detailed: boolean): Promise<Item> {
        const deletedItem = await this._client.item.delete({
            where: {
                id: +item.getId()!
            },
            include: {
                color: detailed,
                creator: detailed,
                product: detailed,
                size: detailed
            }
        })

        if(deletedItem) {
            item = new Item(deletedItem.userEmail || "deleted_user", deletedItem.productId+"" || "deleted_product",
                deletedItem.colorId+"" || "deteled_color", deletedItem.sizeId+"" || "deleted_size",
                deletedItem.itemCode, deletedItem.itemName, deletedItem.price, deletedItem.stock,
                deletedItem.itemImages as string[], deletedItem.description)
            item.setId(deletedItem.id+"")
            item.setIsActive(deletedItem.isActive)
            deletedItem.deactivatedAt ? item.setDeactivatedAt(deletedItem.deactivatedAt) : null
            deletedItem.creator ? 
                item.setCreator(new User(deletedItem.creator.email, deletedItem.creator.username, ""))
                : null
                deletedItem.product ?
                item.setProduct(new Product(deletedItem.product.userEmail || "deleted_user", 
                    deletedItem.product.productName, deletedItem.product.productClass, deletedItem.product.productType,
                    deletedItem.product.material, deletedItem.product.description))
                : null
            deletedItem.color ?
                item.setColor(new Color(deletedItem.color.userEmail || "deleted_user", deletedItem.color.colorName, 
                    deletedItem.color.hexValue, deletedItem.color.description))
                : null
            deletedItem.size ?
                item.setSize(new Size(deletedItem.size.userEmail || "deleted_user", deletedItem.size.productId+"", deletedItem.size.sizeName,
                    deletedItem.size.sizeCategory, deletedItem.size.length, deletedItem.size.width, deletedItem.size.description))
                : null
            item.setCreatedAt(deletedItem.createdAt)
            item.setUpdatedAt(deletedItem.updatedAt)
        }
        return Promise.resolve(item)
    }
}

export default ItemRepositoryPrisma