import z, { ZodEffects, ZodPipeline, ZodSchema, ZodString } from "zod";
import ColorCreationRequestDTO from "../../../../interfaces/dtos/color/ColorCreationRequestDTO";
import ColorUpdateRequestDTO from "../../../../interfaces/dtos/color/ColorUpdateRequestDTO";
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
            userEmail: z.string({
                required_error: "User Email is required",
                invalid_type_error: "User Email must be a string"
                })
                .email({
                    message: "Invalid email"
                }),
            colorName: this.setNoEmptyString(
                "Color Name",
                z.string({
                    required_error: "Color Name is required",
                    invalid_type_error: "Color Name must be a string"
                })
                .max(64, {
                    message: "Color Name must be less than 64 character"
                })
            ),
            // Hex value is allowed to empty string, but if it isn't then must be valid hex value
            hexValue: z.union([ 
                z.string().regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
                    message: "Must be valid Hex Value"
                }),
                z.literal("")
            ]),
            description: z.string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string"
            })
        })
    }
    
    getUpdateColorRequestSchema(): ZodSchema<ColorUpdateRequestDTO> {
        return z.object({
            id: this.setNoEmptyString(
                "Color ID",
                z.string({
                    required_error: "Color ID is required",
                    invalid_type_error: "Color ID must be a string"
                })
            ),
            colorName: this.setNoEmptyString(
                "Color Name",
                z.string({
                    required_error: "Color Name is required",
                    invalid_type_error: "Color Name must be a string"
                })
                .max(64, {
                    message: "Color Name must be less than 64 character"
                })
            ),
            // Hex value is allowed to empty string, but if it isn't then must be valid hex value
            hexValue: z.union([ 
                z.string().regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
                    message: "Must be valid Hex Value"
                }),
                z.literal("")
            ]),
            description: z.string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string"
            })
        })
    }
}

export default ColorVSchemaZod