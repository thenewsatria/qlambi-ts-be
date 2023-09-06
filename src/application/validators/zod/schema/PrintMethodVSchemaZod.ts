import { ZodEffects, ZodPipeline, ZodSchema, ZodString, z } from "zod";
import PrintMethodVSchema from "../../../../interfaces/validators/schemas/PrintMethodVSchema";
import PrintMethodCreationRequestDTO from "../../../../interfaces/dtos/printMethod/PrintMethodCreationRequestDTO";
import PrintMethodIdDTO from "../../../../interfaces/dtos/printMethod/singular/PrintMethodIdDTO";

class PrintMethodVSchemaZod implements PrintMethodVSchema {
    private static instance: PrintMethodVSchemaZod

    public static getInstance(): PrintMethodVSchemaZod {
        if(!PrintMethodVSchemaZod.instance) {
            PrintMethodVSchemaZod.instance = new PrintMethodVSchemaZod()
        }

        return PrintMethodVSchemaZod.instance
    }

    private setNoEmptyString(attributeName: string,
        handler: ZodString): ZodPipeline<ZodEffects<ZodString, string | undefined, string>, ZodString> {
        return z.string({
                required_error: `${attributeName} is required`,
                invalid_type_error: `${attributeName} must be a string`
            })
            .transform((str: string) => str === "" ? undefined : str)
            .pipe(
                handler
            )
    }

    getCreatePrintMethodRequestSchema(): ZodSchema<PrintMethodCreationRequestDTO> {
        return z.object({
            printMethodName: this.setNoEmptyString(
                "Print Method Name",
                z.string({
                    required_error: "Print Method Name is required",
                    invalid_type_error: "Print Method Name must be a string"
                })
                .min(2, {
                    message: "Print Method Name must be at least 2 character"
                })
            ),
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
            })
        })
    }

    getPrintMethodByIdRequestSchema(): ZodSchema<PrintMethodIdDTO> {
        return z.object({
            id: this.setNoEmptyString(
                "Print Method ID",
                z.string({
                    required_error: "Print Method ID is required",
                    invalid_type_error: "Print Method ID must be a string"
                })
            )
        })
    }
}

export default PrintMethodVSchemaZod