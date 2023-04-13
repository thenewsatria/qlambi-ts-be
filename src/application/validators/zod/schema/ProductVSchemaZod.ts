import z, { ZodEffects, ZodPipeline, ZodSchema, ZodString } from "zod";
import ProductCreationRequestDTO from "../../../../interfaces/dtos/product/ProductCreationRequestDTO";
import ProductDeletionRequestDTO from "../../../../interfaces/dtos/product/ProductDeletionRequestDTO";
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
                .min(1, {
                    message: "Product Name must be at least 1 character"
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
                .min(1, {
                    message: "Product Class must be at least 1 character",
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
                .min(1, {
                    message: "Product Type must be at least 1 character"
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
                .min(1, {
                    message: "Material must be at least 1 character"
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
        .required({
            userEmail: true,
            productType: true,
            productName: true,
            productClass: true,
            material: true
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
                .min(1, {
                    message: "Product Name must be at least 1 character"
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
                .min(1, {
                    message: "Product Class must be at least 1 character",
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
                .min(1, {
                    message: "Product Type must be at least 1 character"
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
                .min(1, {
                    message: "Material must be at least 1 character"
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
        .required()
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
        .required()
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
                .min(1, {
                    message: "Product Name must be at least 1 character"
                })
            ),
        })
        .required()
    }
}

export default ProductVSchemaZod