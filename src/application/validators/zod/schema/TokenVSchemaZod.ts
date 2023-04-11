import z, { ZodEffects, ZodPipeline, ZodSchema, ZodString } from "zod";
import TokenVSchema from "../../../../interfaces/validators/schemas/TokenVSchema";
import RenewAccessTokenRequestDTO from "../../../../interfaces/dtos/token/RenewAccessTokenRequestDTO";
import StringTokenDTO from "../../../../interfaces/dtos/token/singular/StringTokenDTO";

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

    getAccessTokenRenewalRequestSchema(): ZodSchema<RenewAccessTokenRequestDTO>{
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

    getStringTokenSchema(): ZodSchema<StringTokenDTO> {
        return z.object({
            token: this.setNoEmptyString(
                "Token",
                z.string({
                    required_error: "Token is required",
                    invalid_type_error: "Token must be a string"
                })
            )
        })
        .required()
    }
}

export default TokenVSchemaZod