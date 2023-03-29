import { throws } from "assert";
import z, { ZodEffects, ZodPipeline, ZodString } from "zod";
import TokenVSchema from "../../../../interfaces/validators/schemas/TokenVSchema";

class TokenVSchemaZod implements TokenVSchema {
    private static instance: TokenVSchemaZod
    
    public static getInstance(): TokenVSchemaZod {
        if(!TokenVSchemaZod.instance) {
            TokenVSchemaZod.instance = new TokenVSchemaZod()
        }

        return TokenVSchemaZod.instance
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

    getAccessTokenRenewalRequestSchema() {
        return z.object({
            refreshToken: this.setNoEmptyString(
                "Refresh Token",
                z.string({
                    required_error: "Refresh Token is required",
                    invalid_type_error: "Refresh Token must be a string"
                })
            )
        })
        .required()
    }
}

export default TokenVSchemaZod