import { ZodEffects, ZodPipeline, ZodSchema, ZodString, z } from "zod";
import ItemCreationRequestDTO from "../../../../interfaces/dtos/item/ItemCreationRequestDTO";

class ItemVSchemaZod implements ItemVSchema {
    private static instance: ItemVSchemaZod

    public static getInstance(): ItemVSchemaZod {
        if(!ItemVSchemaZod.instance){
            ItemVSchemaZod.instance = new ItemVSchemaZod()
        }

        return ItemVSchemaZod.instance
    }

    private setNoEmptyString(attributeName: string,
        handler: ZodString): ZodPipeline<ZodEffects<ZodString, string | undefined, string>, ZodString> {
        return z.string({
                required_error: `${attributeName} is required`,
                invalid_type_error: `${attributeName} must be a string`
            })
            .transform((str) => str === "" ? undefined : str)
            .pipe(
                handler
            )
    }

    getCreateItemRequestSchema(): ZodSchema<ItemCreationRequestDTO> {
        return z.object({
            itemCode: this.setNoEmptyString(
                "Item Code",
                z.string({
                    required_error: "Item Code is required",
                    invalid_type_error: "Item Code must be a string"
                })
                .min(5, {
                    message: "item code must be at least 5 character"
                })
            ),
            itemName: this.setNoEmptyString(
                "Item Name",
                z.string({
                    required_error: "Item Name is required",
                    invalid_type_error: "Item Name must be a string"
                })
                .min(5, {
                    message: "item name must be at least 5 character"
                })
            ),
            productId: this.setNoEmptyString(
                "Product ID",
                z.string({
                    required_error: "Product ID is required",
                    invalid_type_error: "Product ID must be a string"
                })
            ),
            colorId: this.setNoEmptyString(
                "Color ID",
                z.string({
                    required_error: "Color ID is required",
                    invalid_type_error: "Color ID must be a string"
                })
            ),
            sizeId: this.setNoEmptyString(
                "Size ID",
                z.string({
                    required_error: "Size ID is required",
                    invalid_type_error: "Size ID must be a string"
                })
            ),
            price: z.number({
                required_error: "Price is required",
                invalid_type_error: "Price must be a number"
            })
            .nonnegative(),
            // itemImages: z.union([
            //     z.string({
            //         required_error: "Item Name is required",
            //         invalid_type_error: "Item Name must be a string"
            //     })
            //     .url(),
            //     z.literal("")
            // ]),
            itemImages: z.union([
                z.string({
                    required_error: "Item Name is required",
                    invalid_type_error: "Item Name must be a string"
                })
                .url(),
                z.literal("")
            ]).array(),
            stock: z.number({
                required_error: "Price is required",
                invalid_type_error: "Price must be a number"
            }).nonnegative(),
            description: z.string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string"
            }),
            userEmail: z.string({
                required_error: "User Email is required",
                invalid_type_error: "User Email must be a string"
                })
                .email({
                    message: "Invalid email"
                }),
        })
    }
}

export default ItemVSchemaZod