import z, { ZodEffects, ZodPipeline, ZodString } from "zod";
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

    getAddProductRequestSchema() {
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
                required_error: "Material is required",
                invalid_type_error: "Material must be a string"
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
}

export default ProductVSchemaZod