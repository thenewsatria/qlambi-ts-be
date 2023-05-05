import z, { ZodEffects, ZodPipeline, ZodSchema, ZodString } from "zod";
import ProductAddColorRequestDTO from "../../../../interfaces/dtos/product/ProductAddColorRequestDTO";
import ProductCreationRequestDTO from "../../../../interfaces/dtos/product/ProductCreationRequestDTO";
import ProductDeletionRequestDTO from "../../../../interfaces/dtos/product/ProductDeletionRequestDTO";
import ProductRemoveColorRequestDTO from "../../../../interfaces/dtos/product/ProductRemoveColorRequestDTO";
import ProductUpdateRequestDTO from "../../../../interfaces/dtos/product/ProductUpdateRequestDTO";
import ProductIdDTO from "../../../../interfaces/dtos/product/singular/ProductIdDTO";
import ProductVSchema from "../../../../interfaces/validators/schemas/ProductVSchema";

class ProductVSchemaZod implements ProductVSchema {   
    private static instance: ProductVSchemaZod
    
    public static getInstance(): ProductVSchemaZod {
        if(!ProductVSchemaZod.instance){
            ProductVSchemaZod.instance = new ProductVSchemaZod()
        }

        return ProductVSchemaZod.instance
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

    getAddProductRequestSchema(): ZodSchema<ProductCreationRequestDTO> {
        return z.object({
            userEmail: this.setNoEmptyString(
                "User Email",
                z.string({
                    required_error: "User Email is required",
                    invalid_type_error: "User Email must be a string"
                })
                .email({
                    message: "Invalid email"
                }),
            ),
            productName: this.setNoEmptyString(
                "Product Name",
                z.string({
                    required_error: "Product Name is required",
                    invalid_type_error: "Product Name must be a string"
                })
                .max(64, {
                    message: "Product Name must be less than 64 character"
                })
            ),
            productClass: this.setNoEmptyString(
                "Product Class",
                z.string({
                    required_error: "Product Class is required",
                    invalid_type_error: "Product Class must be a string"
                })
                .max(64, {
                    message: "Product class must be less than 64 character"
                })
            ),
            productType: this.setNoEmptyString(
                "Product Type",
                z.string({
                    required_error: "Product Class is required",
                    invalid_type_error: "Product Class must be a string"
                })
                .max(64, {
                    message: "Product Type must be less than 64 character"
                })
            ),
            material: this.setNoEmptyString(
                "Material",
                z.string({
                    required_error: "Material is required",
                    invalid_type_error: "Material must be a string"
                })
                .max(64, {
                    message: "Material must be less than 64 character"
                })
            ),
            description: z.string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string"
            })
        })
    }

    getUpdateProductRequestSchema(): ZodSchema<ProductUpdateRequestDTO> {
        return z.object({
            id: this.setNoEmptyString(
                "Product ID",
                z.string({
                    required_error: "Product ID is required",
                    invalid_type_error: "Product ID must be a string"
                })
            ),
            productName: this.setNoEmptyString(
                "Product Name",
                z.string({
                    required_error: "Product Name is required",
                    invalid_type_error: "Product Name must be a string"
                })
                .max(64, {
                    message: "Product Name must be less than 64 character"
                })
            ),
            productClass: this.setNoEmptyString(
                "Product Class",
                z.string({
                    required_error: "Product Class is required",
                    invalid_type_error: "Product Class must be a string"
                })
                .max(64, {
                    message: "Product class must be less than 64 character"
                })
            ),
            productType: this.setNoEmptyString(
                "Product Type",
                z.string({
                    required_error: "Product Class is required",
                    invalid_type_error: "Product Class must be a string"
                })
                .max(64, {
                    message: "Product Type must be less than 64 character"
                })
            ),
            material: this.setNoEmptyString(
                "Material",
                z.string({
                    required_error: "Material is required",
                    invalid_type_error: "Material must be a string"
                })
                .max(64, {
                    message: "Material must be less than 64 character"
                })
            ),
            description: z.string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string"
            })
        })
    }

    getProductByIdRequestSchema():  ZodSchema<ProductIdDTO>  {
        return z.object({
            id: this.setNoEmptyString(
                "Product ID",
                z.string({
                    required_error: "Product ID is required",
                    invalid_type_error: "Product ID must be a string"
                })
            )
        })
    }

    getProductDeletionRequestSchema(): ZodSchema<ProductDeletionRequestDTO>{
        return z.object({
            id: this.setNoEmptyString(
                "Product ID",
                z.string({
                    required_error: "Product ID is required",
                    invalid_type_error: "Product ID must be a string"
                })
            ),
            productName: this.setNoEmptyString(
                "Product Name",
                z.string({
                    required_error: "Product Name is required",
                    invalid_type_error: "Product Name must be a string"
                })
            ),
        })
    }

    getAddColorToProductRequestSchema(): ZodSchema<ProductAddColorRequestDTO> {
        return z.object({
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
            userEmail: this.setNoEmptyString(
                "User Email",
                z.string({
                    required_error: "User Email is required",
                    invalid_type_error: "User Email must be a string"
                })
                .email({
                    message: "Invalid email"
                }),
            ),
        })
    }

    getRemoveColorFromProductRequestSchema(): ZodSchema<ProductRemoveColorRequestDTO> {
        return z.object({
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
            )
        })
    }

    getAddSizeToProductRequestSchema() {
        return z.object({
            sizeName: this.setNoEmptyString(
                "Size Name",
                z.string({
                    required_error: "Size Name is required",
                    invalid_type_error: "Size Name must be a string"
                })
                .max(64, {
                    message: "Size Name must be less than 64 character"
                })
            ),
            sizeCategory: this.setNoEmptyString(
                "Size Category",
                z.string({
                    required_error: "Size Category is required",
                    invalid_type_error: "Size Category must be a string"
                })
                .max(64, {
                    message: "Size Category must be less than 64 character"
                })
            ),
            length: z.number({
                required_error: "Length is required",
                invalid_type_error: "Length must be a number"
            })
            .nonnegative(),
            width:z.number({
                required_error: "Length is required",
                invalid_type_error: "Length must be a number"
            })
            .nonnegative(),
            description: z.string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string"
            }),
            userEmail: this.setNoEmptyString(
                "User Email",
                z.string({
                    required_error: "User Email is required",
                    invalid_type_error: "User Email must be a string"
                })
                .email({
                    message: "Invalid email"
                }),
            ),
            productId: this.setNoEmptyString(
                "Product ID",
                z.string({
                    required_error: "Product ID is required",
                    invalid_type_error: "Product ID must be a string"
                })
            ),
        })
    }  
}

export default ProductVSchemaZod