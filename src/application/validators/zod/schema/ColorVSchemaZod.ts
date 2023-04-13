import z, { ZodEffects, ZodPipeline, ZodSchema, ZodString } from "zod";
import ColorCreationRequestDTO from "../../../../interfaces/dtos/color/ColorCreationRequestDTO";
import ColorVSchema from "../../../../interfaces/validators/schemas/ColorVSchema";

class ColorVSchemaZod implements ColorVSchema {
    private static instance: ColorVSchemaZod
    
    public static getInstance(): ColorVSchemaZod {
        if(!ColorVSchemaZod.instance){
            ColorVSchemaZod.instance = new ColorVSchemaZod()
        }

        return ColorVSchemaZod.instance
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

    getAddColorRequestSchema(): ZodSchema<ColorCreationRequestDTO> {
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
            colorName: this.setNoEmptyString(
                "Color Name",
                z.string({
                    required_error: "Color Name is required",
                    invalid_type_error: "Color Name must be a string"
                })
                .min(1, {
                    message: "Color Name must be at least 1 character"
                })
                .max(64, {
                    message: "Color Name must be less than 64 character"
                })
            ),
            hexValue: this.setNoEmptyString(
                "Hex Value",
                z.string({
                    required_error: "Hex Value is required",
                    invalid_type_error: "Hex Value must be a string"
                })
                .min(1, {
                    message: "Hex Value must be at least 1 character",
                })
                .max(64, {
                    message: "Hex Value must be less than 64 character"
                })
            ),
            description: z.string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string"
            })
        })
        .required({
            userEmail: true,
            colorName: true,
            hexValue: true,
        })
    }
}

export default ColorVSchemaZod