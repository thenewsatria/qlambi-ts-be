import {z, ZodSchema} from "zod";
import RegisterRequestDTO from "../../../../interfaces/dtos/auth/RegisterRequestDTO";
import AuthVSchema from "../../../../interfaces/validators/schemas/AuthVSchema";

class AuthVSchemasZod implements AuthVSchema {
    private static instance: AuthVSchemasZod
    
    public static getInstance(): AuthVSchemasZod {
        if(!AuthVSchemasZod.instance){
            AuthVSchemasZod.instance = new AuthVSchemasZod()
        }

        return AuthVSchemasZod.instance
    }
    
    getRegisterRequestSchema(): ZodSchema<RegisterRequestDTO> {
        return z.object({
            username: z.string()
                .min(5)
                .max(25)
                .regex(/^[a-z0-9_.]+$/, {
                    message: "Username can only contain lowercase characters, period, and underscores"
                }),
            email: z.string()
                .email(),
            password: z.string()
                .min(8),
            confirmPassword: z.string()
                .min(8)
        })
        .required()
        .refine(({password, confirmPassword}) => password === confirmPassword, {
            message: "Password don't match",
            path: ["confirmPassword"]
        })
    }

    getLoginRequestSchema() {
        throw new Error("Method not implemented.");
    }
}

export default AuthVSchemasZod