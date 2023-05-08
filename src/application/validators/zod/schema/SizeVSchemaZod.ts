import { z, ZodEffects, ZodPipeline, ZodSchema, ZodString } from "zod";
import SizeIdDTO from "../../../../interfaces/dtos/size/singular/SizeIdDTO";
import SizeCreationRequestDTO from "../../../../interfaces/dtos/size/SizeCreationRequestDTO";
import SizeUpdateRequestDTO from "../../../../interfaces/dtos/size/SizeUpdateRequestDTO";
import SizeVSchema from "../../../../interfaces/validators/schemas/SizeVSchema";

class SizeVSchemaZod implements SizeVSchema {
    private static instance: SizeVSchemaZod
    
    public static getInstance(): SizeVSchemaZod {
        if(!SizeVSchemaZod.instance){
            SizeVSchemaZod.instance = new SizeVSchemaZod()
        }

        return SizeVSchemaZod.instance
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
    
    getAddSizeRequestVSchema(): ZodSchema<SizeCreationRequestDTO>{
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

    getUpdateSizeRequestVSchema(): ZodSchema<SizeUpdateRequestDTO> {
        return z.object({
            id: this.setNoEmptyString(
                "Size ID",
                z.string({
                    required_error: "Size ID is required",
                    invalid_type_error: "Size ID must be a string"
                })
            ),
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
        })
    }

    getSizeByIdRequestVSchema(): ZodSchema<SizeIdDTO> {
        return z.object({
            id: this.setNoEmptyString(
                "Size ID",
                z.string({
                    required_error: "Size ID is required",
                    invalid_type_error: "Size ID must be a string"
                })
            ),
        })
    }
}

export default SizeVSchemaZod